import re
import os
import pandas as pd
from flask import jsonify, Blueprint, request
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

def extract_bottleneck_number(text):
    match = re.match(r"(\d+(?:\.\d+)*)", text)
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
    children = ["Public Sector Results", "Feasible Policy", "Delivery Capability", "Source", "Outcome Description", "Development Outcome"]
    for _, row in df.iterrows():
        parent = row[parent_title]
        if pd.isna(parent): continue
        data = {child: row[child] for child in children if child in df.columns}
        data_dict[parent] = data
    return data_dict

def clean_label(value):
    """Strip trailing whitespace and commas from a string value."""
    if pd.isna(value):
        return value
    return str(value).strip().rstrip(',').strip()

def create_public_sector_challenges():
    """Create a dictionary for public sector challenges from the Excel file."""
    df = read_excel('Public Sector Challenges')
    if isinstance(df, tuple):
        return df
    data_dict = {}
    parent_title = 'Outcome'
    children = ["Public Sector Challenge", "Challenge Type", "Description", "Source"]
    for _, row in df.iterrows():
        if pd.isna(row[parent_title]): continue
        data = {child: row[child] for child in children}
        data['Challenge Type'] = clean_label(data.get('Challenge Type'))
        data_dict.setdefault(row[parent_title], []).append(data)
    return data_dict

def create_taxonomy_bottlenecks():
    """Read taxonomy-botlenecks sheet and return a dict keyed by bottleneck_N."""
    df = read_excel('taxonomy-botlenecks')
    if isinstance(df, tuple):
        return df
    result = {}
    for _, row in df.iterrows():
        name = row.get('PFM Bottleneck')
        description = row.get('Bottlenecks Description')
        if pd.isna(name): continue
        name = str(name).strip()
        match = re.match(r"(\d+(?:\.\d+)*)", name)
        key = f"bottleneck_{match.group(1)}" if match else name
        result[key] = {
            'name': name,
            'description': str(description).strip() if not pd.isna(description) else ''
        }
    return result

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

def create_taxonomy_challenges():
    """Read the taxonomy-challenges sheet and return a list of {Term, Description} objects."""
    df = read_excel('taxonomy-challenges')
    if isinstance(df, tuple):
        return df
    # Normalize column names (strip whitespace)
    df.columns = [c.strip() for c in df.columns]
    result = []
    for _, row in df.iterrows():
        # Sheet uses 'Challenge Type' as the term column
        term = row.get('Challenge Type') or row.get('Term')
        description = row.get('Description')
        if pd.isna(term): continue
        result.append({
            'Term': clean_label(term),
            'Description': str(description).strip() if not pd.isna(description) else ''
        })
    return result


# --- Core processing helpers ---

def build_bottlenecks_for_outcome(filter_value, bottleneck_examples, bottleneck_lessons, use_generic=False):
    """Build bottleneck data dict for a single outcome filter value."""
    filtered = bottleneck_examples[bottleneck_examples['Policy Area'] == filter_value].dropna(subset=["PFM Bottleneck", "Sub-Bottleneck"])
    data_dict = {}
    for _, row in filtered.iterrows():
        parent_name = str(row["PFM Bottleneck"]).strip()
        if pd.isna(parent_name): continue
        child_name = str(row["Sub-Bottleneck"]).strip()
        grandchild_name = str(row["Outcome-Specific Sub-Bottleneck"]).strip()
        parent_num = extract_bottleneck_number(parent_name)
        child_num = extract_bottleneck_number(child_name)
        parent_key = f"bottleneck_{parent_num}" if parent_num else parent_name
        child_key = f"bottleneck_{child_num.replace('.', '_')}" if child_num else child_name
        nested = {c: str(row[c]) for c in bottleneck_examples.columns if c not in ["Public Finance Bottleneck Group", "Public Finance Bottleneck"]}
        if parent_key not in data_dict:
            data_dict[parent_key] = {"name": parent_name, "lessons": []}
        if child_key not in data_dict[parent_key]:
            # Use generic Sub-Bottleneck for combined view, outcome-specific for single outcome view
            if use_generic:
                display_name = child_name
            else:
                display_name = re.sub(r'^[\d.]+\s+', '', grandchild_name)
            data_dict[parent_key][child_key] = {"name": display_name}
        if grandchild_name not in data_dict[parent_key][child_key]:
            data_dict[parent_key][child_key][grandchild_name] = []
        data_dict[parent_key][child_key][grandchild_name].append({**nested})

    if not isinstance(bottleneck_lessons, tuple):
        BN_LESSONS_COL = "Lessons from Outcome-Based Research"
        filtered_lessons = bottleneck_lessons[bottleneck_lessons['Development Outcome'] == filter_value]
        for _, row in filtered_lessons.iterrows():
            bn_name = row.get("PFM Bottleneck", "")
            if pd.isna(bn_name): continue
            bn_name = str(bn_name).strip()
            lesson_val = row.get(BN_LESSONS_COL, "")
            lesson_val = str(lesson_val).strip() if not pd.isna(lesson_val) else ""
            bn_num = extract_bottleneck_number(bn_name)
            parent_key = f"bottleneck_{bn_num}" if bn_num else bn_name
            if parent_key in data_dict and lesson_val and lesson_val.lower() != "nan":
                if lesson_val not in data_dict[parent_key]["lessons"]:
                    data_dict[parent_key]["lessons"].append(lesson_val)
    return data_dict


def build_roles_for_outcome(filter_value, roles_examples, roles_lessons):
    """Build roles data dict for a single outcome filter value."""
    filtered = roles_examples[roles_examples['Policy Area'] == filter_value].dropna(subset="Role of Public Finance")
    dict_data_role = {}
    EXAMPLE_EXCLUDE = ["Role of Public Finance", "Outcome Role"]
    for _, row in filtered.iterrows():
        parent_name = str(row["Role of Public Finance"]).strip()
        if pd.isna(parent_name): continue
        child_name = str(row["Outcome Role"]).strip()
        parent_num = extract_role_letter(parent_name)
        parent_key = f"role_{parent_num}" if parent_num else parent_name
        child_key = child_name
        example_row = {c: str(row[c]) for c in roles_examples.columns if c not in EXAMPLE_EXCLUDE}
        if parent_key not in dict_data_role:
            dict_data_role[parent_key] = {"name": parent_name, "lessons": []}
        if child_key not in dict_data_role[parent_key]:
            dict_data_role[parent_key][child_key] = {"name": child_name, "examples": []}
        dict_data_role[parent_key][child_key]["examples"].append({**example_row})

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
    return dict_data_role


# --- API Routes ---
@api_bp.route('/framework', methods=['GET'])
def get_all_data():
    """API endpoint to retrieve all data from the Excel file."""
    data = {
        'outcome-results': create_outcome_results(),
        'Public Sector Challenges': create_public_sector_challenges(),
        'taxonomy-roles': create_role_taxonomy('taxonomy-roles'),
        'taxonomy-general': create_taxonomy_general(),
        'taxonomy-bottlenecks': create_taxonomy_bottlenecks(),
        'taxonomy-challenges': create_taxonomy_challenges(),
    }
    return safe_jsonify(data)


@api_bp.route('/data', methods=['GET'])
def get_example_data():
    """API endpoint to retrieve filtered data from the Excel file."""
    filter_value = request.args.get('filter')
    if not filter_value:
        return jsonify({"error": "Missing 'filter' query parameter"}), 400

    # Load all sheets once
    bottleneck_examples = read_excel('Sub Bottlenecks - Examples')
    if isinstance(bottleneck_examples, tuple):
        return bottleneck_examples
    bottleneck_lessons = read_excel('Bottlenecks - Lessons')
    roles_examples = read_excel('Roles - Examples')
    if isinstance(roles_examples, tuple):
        return roles_examples
    roles_lessons = read_excel('Roles - Lessons')

    # Combined mode: return data for every outcome, grouped by outcome name
    if filter_value == '__all__':
        outcomes = bottleneck_examples['Policy Area'].dropna().unique().tolist()
        combined_bottlenecks = {}
        combined_roles = {}
        for outcome in outcomes:
            combined_bottlenecks[outcome] = build_bottlenecks_for_outcome(outcome, bottleneck_examples, bottleneck_lessons, use_generic=True)
            combined_roles[outcome] = build_roles_for_outcome(outcome, roles_examples, roles_lessons)
        return safe_jsonify({
            'Bottlenecks': combined_bottlenecks,
            'Roles': combined_roles,
        })

    # Single outcome mode
    data_dict = build_bottlenecks_for_outcome(filter_value, bottleneck_examples, bottleneck_lessons)
    dict_data_role = build_roles_for_outcome(filter_value, roles_examples, roles_lessons)

    return safe_jsonify({
        'Bottlenecks': data_dict,
        'Roles': dict_data_role
    })
