import React from "react";
import PropTypes from 'prop-types';


// const COUNTRIES = ["Rwanda", "Tanzania", "Uganda", "Kenya", "Ethiopia", "Ghana", "Nigeria", "South Africa", "India", "Bangladesh", "Pakistan", "Nepal", "Myanmar", "Vietnam", "Viet Nam", "Philippines", "Indonesia", "Colombia", "Peru", "Mexico", "Brazil", "Argentina", "Liberia", "Sierra Leone", "Mozambique", "Malawi", "Cambodia", "Laos", "Thailand", "Sri Lanka", "Egypt", "Morocco", "Tunisia", "Algeria", "Jordan", "Lebanon", "Iraq", "Afghanistan", "Yemen", "Honduras", "Guatemala", "El Salvador", "Nicaragua", "Côte d'Ivoire", "Senegal", "Mali", "Burkina Faso", "Chad", "Niger", "Sudan", "South Sudan", "Albania", "North Macedonia", "Serbia", "Bosnia and Herzegovina", "Montenegro", "Kosovo", "Ukraine", "Moldova", "Georgia", "Armenia", "Azerbaijan", "Belarus", "Russia", "China", "Turkey", "Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Oman", "Bahrain", "Iceland", "Norway", "Sweden", "Finland", "Denmark", "Netherlands", "Belgium", "Luxembourg", "Germany", "France", "Switzerland", "Austria", "Italy", "Spain", "Portugal", "Greece", "Czech Republic", "Slovakia", "Hungary", "Poland", "Lithuania", "Latvia", "Estonia", "Kenya" , "Canada", "United States", "United Kingdom", "Ireland", "Australia", "New Zealand", 'Angola', 'Botswana', 'Cameroon', 'Congo', 'Democratic Republic of the Congo', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', "DRC", 'Tajikistan', 'Turkmenistan', 'Uzbekistan', 'Zambia', 'Zimbabwe', 'Trinidad and Tobago'];
const COUNTRIES = []
const anonymizeCountry = (text) => {
    COUNTRIES.forEach(country => {
        const regex = new RegExp(`\\b${country}\\b`, 'gi');
        text = text.replace(regex, "[REDACTED]");
    });
    return text;
}

const createText = (example, exampleRef, source, bottleneckName) => {
    let number = null;
    if (bottleneckName){
        number = bottleneckName.match(/^\d+(\.\d+)*/)?.[0];
    } 

    return (

            
           <div style={{ fontSize: '16px', color: '#333' }}>
                {example && (
                    <p  style={{ fontSize: '16px', marginLeft:'20px'}}>
                       {anonymizeCountry(example)}
                        {exampleRef && <span style={{ fontStyle: 'italic',fontSize: '12px', overflowWrap: 'anywhere' }}><br/> Reference:  {anonymizeCountry(exampleRef)} <br/>Source: {anonymizeCountry(source)}</span> }
                        {number && <span style={{ fontStyle: 'italic',fontSize: '12px', overflowWrap: 'anywhere' }}><br/> Bottleneck Reference: {number}</span> }
                   </p>
                )}
            </div>

    )
}
function ContentText({example, exampleRef, source, bottleneckName}) {

    const text = createText(example, exampleRef, source, bottleneckName)

    return (
        <div className="content-text">
            {text}
        </div>
    );
}
ContentText.propTypes = {
    example: PropTypes.string.isRequired,
    exampleRef: PropTypes.string,
    source: PropTypes.string,
    bottleneckName: PropTypes.string,
};
export default ContentText;