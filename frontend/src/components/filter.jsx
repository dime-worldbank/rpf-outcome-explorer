import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';
function CustomFilter(props) {
    const { filterType, filterOptions, onFilterChange } = props;

    return (
        <Dropdown style={{ 'width': '100%'}}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{'width': '100%', marginBottom: '10px'}}>
                {filterType} 
            </Dropdown.Toggle>

            <Dropdown.Menu style={{'padding': '10px'}}>
                {filterOptions.map((option, index) => (
                    <Dropdown.Item 
                        key={index} 
                        onClick={() => onFilterChange(option)}
                    >
                        {option}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

CustomFilter.propTypes = {
    filterType: PropTypes.string.isRequired,
    filterOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    onFilterChange: PropTypes.func.isRequired
};

export default CustomFilter;