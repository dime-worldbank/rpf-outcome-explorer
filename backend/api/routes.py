import re
from flask import jsonify, Blueprint
import os
import pandas as pd
import numpy as np
# Blueprint setup
api_bp = Blueprint('api', __name__)
EXCEL_FILE_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'PFM_data.xlsx')

# --- Utility Functions ---
def read_excel(sheet_name):
    """Read a sheet from the Excel file and return a DataFrame or error response."""
    try:
        return pd.read_excel(EXCEL_FILE_PATH, sheet_name=sheet_name)
    except FileNotFoundError:
        return {"error": "Data file not found"}, 404
    except Exception as e:
        return {"error": str(e)}, 500

def safe_jsonify(data):
    """Return a Flask response, handling error tuples from utility functions."""
    if isinstance(data, tuple) and isinstance(data[0], dict):
        return jsonify(data[0]), data[1]
    return jsonify(data)

def extract_role_letter(text):
    match = re.match(r"([A-Z])", text)
    return match.group(1) if match else None

def create_role_taxonomy(sheet_name):
    """Create a flat data structure from the specified sheet in the Excel file."""
    df = read_excel(sheet_name)
    data_dict={}
    for _, row in df.iterrows():
        role_name = row["Role of Public Finance"]
        if pd.isna(role_name): continue
        role_key = f"role_{extract_role_letter(role_name)}" if extract_role_letter(role_name) else role_name
        data_dict[role_key] = {col: row[col] for col in df.columns if col in ["Role Description: Public Finance"]}
    return data_dict


def create_outcome_results():
    """Create a flat data structure for outcome results from the Excel file."""
    df = read_excel('Outcomes & Results')
    if isinstance(df, tuple):
        return df
    data_dict = {}
    parent_title = 'Outcome'
    children = ["Public Sector Results", "Feasible Policy", "Delivery Capability", "Source", "Outcome Description"]
    for _, row in df.iterrows():
        parent = row[parent_title]
        if pd.isna(parent): continue
        data = {child: row[child] for child in children}
        data_dict[parent] = data
    return data_dict

def create_public_sector_challenges():
    """Create a dictionary for public sector challenges from the Excel file."""
    df = read_excel('Public Sector Challenges')
    if isinstance(df, tuple):
        return df
    data_dict = {}
    parent_title = 'Outcome'
    children = ["Public Sector Challenge", "Description", "Source"]
    for _, row in df.iterrows():
        if pd.isna(row[parent_title]): continue
        data = {child: row[child] for child in children}
        data_dict.setdefault(row[parent_title], []).append(data)
    return data_dict

def create_taxonomy_general():
    """Read the taxonomy-general sheet and return a list of {Term, Description} objects."""
    df = read_excel('taxonomy-general')
    if isinstance(df, tuple):
        return df
    result = []
    for _, row in df.iterrows():
        term = row.get('Term')
        description = row.get('Description')
        if pd.isna(term): continue
        result.append({
            'Term': str(term).strip(),
            'Description': str(description).strip() if not pd.isna(description) else ''
        })
    return result


# --- API Route ---
@api_bp.route('/framework', methods=['GET'])
def get_all_data():
    """API endpoint to retrieve all data from the Excel file."""
    data = {
        'outcome-results': create_outcome_results(),
        'Public Sector Challenges': create_public_sector_challenges(),
        'taxonomy-roles': create_role_taxonomy('taxonomy-roles'),
        'taxonomy-general': create_taxonomy_general(),
    }
    return safe_jsonify(data)

from flask import request

@api_bp.route('/data', methods=['GET'])
def get_example_data():
    """API endpoint to retrieve filtered data from the Excel file."""
    filter_value = request.args.get('filter')
    if not filter_value:
        return jsonify({"error": "Missing 'filter' query parameter"}), 400

    bottleneck_examples = read_excel('Sub Bottlenecks - Examples')
    if isinstance(bottleneck_examples, tuple):
        return bottleneck_examples
    filtered_bottleneck_data = bottleneck_examples[bottleneck_examples['Policy Area'] == filter_value].dropna(subset=["PFM Bottleneck", "Sub-Bottleneck"])
    import re
    data_dict = {}
    def extract_bottleneck_number(text):
        match = re.match(r"(\d+(?:\.\d+)*)", text)
        return match.group(1) if match else None

    for _, row in filtered_bottleneck_data.iterrows():
        parent_name = str(row["PFM Bottleneck"]).strip()
        if pd.isna(parent_name): continue
        child_name = str(row["Sub-Bottleneck"]).strip()
        grandchild_name = str(row["Outcome-Specific Sub-Bottleneck"]).strip()
        parent_num = extract_bottleneck_number(parent_name)
        child_num = extract_bottleneck_number(child_name)
        parent_key = f"bottleneck_{parent_num}" if parent_num else parent_name
        child_key = f"bottleneck_{child_num.replace('.', '_')}" if child_num else child_name
        # Exclude parent and child columns from the nested dict
        nested = {c: str(row[c]) for c in bottleneck_examples.columns if c not in ["Public Finance Bottleneck Group", "Public Finance Bottleneck"]}
        # Parent
        if parent_key not in data_dict:
            data_dict[parent_key] = {"name": parent_name}
        # Group all examples for the same child_key under an object with 'name' and 'child' list
        if child_key not in data_dict[parent_key]:
            outcome_bottleneck = re.sub(r'^[\d.]+\s+', '', grandchild_name)
            data_dict[parent_key][child_key] = {"name": outcome_bottleneck}
        if grandchild_name not in data_dict[parent_key][child_key]:
            data_dict[parent_key][child_key][grandchild_name] = []
        data_dict[parent_key][child_key][grandchild_name].append({**nested})

    roles_examples = read_excel('Roles - Examples')
    if isinstance(roles_examples, tuple):
        return roles_examples
    filtered_roles_data = roles_examples[roles_examples['Policy Area'] == filter_value].dropna(subset="Role of Public Finance")
    dict_data_role = {}
    EXAMPLE_EXCLUDE = ["Role of Public Finance", "Outcome Role"]
    for _, row in filtered_roles_data.iterrows():
        parent_name = str(row["Role of Public Finance"]).strip()
        if pd.isna(parent_name): continue
        child_name = str(row["Outcome Role"]).strip()
        parent_num = extract_role_letter(parent_name)
        parent_key = f"role_{parent_num}" if parent_num else parent_name
        child_key = child_name
        # Example columns: everything except the structural nesting keys
        example_row = {c: str(row[c]) for c in filtered_roles_data.columns if c not in EXAMPLE_EXCLUDE}
        # Parent
        if parent_key not in dict_data_role:
            dict_data_role[parent_key] = {"name": parent_name, "lessons": []}
        # Child
        if child_key not in dict_data_role[parent_key]:
            dict_data_role[parent_key][child_key] = {"name": child_name, "examples": []}
        # Append example row
        dict_data_role[parent_key][child_key]["examples"].append({**example_row})

    # Read lessons from the dedicated "Roles - Lessons" sheet and join at the role level
    roles_lessons = read_excel('Roles - Lessons')
    if not isinstance(roles_lessons, tuple):
        LESSONS_COL = "Lessons from Outcome-Based Research"
        filtered_lessons = roles_lessons[roles_lessons['Outcome'] == filter_value]
        for _, row in filtered_lessons.iterrows():
            role_name = row.get("Role of Public Finance", "")
            if pd.isna(role_name): continue
            role_name = str(role_name).strip()
            lesson_val = row.get(LESSONS_COL, "")
            lesson_val = str(lesson_val).strip() if not pd.isna(lesson_val) else ""
            parent_num = extract_role_letter(role_name)
            parent_key = f"role_{parent_num}" if parent_num else role_name
            if parent_key in dict_data_role and lesson_val and lesson_val.lower() != "nan":
                if lesson_val not in dict_data_role[parent_key]["lessons"]:
                    dict_data_role[parent_key]["lessons"].append(lesson_val)
    
    
    return safe_jsonify({
        'Bottlenecks': data_dict,
        'Roles': dict_data_role
    })
