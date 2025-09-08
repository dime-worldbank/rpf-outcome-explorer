import React from "react";
import PropTypes from 'prop-types';


const COUNTRIES = ["Rwanda"]
const anonymizeCountry = (text) => {
    COUNTRIES.forEach(country => {
        const regex = new RegExp(`\\b${country}\\b`, 'gi');
        text = text.replace(regex, "[REDACTED]");
    });
    return text;
}

const createText = (example, exampleRef, source) => {
    return (

            
           <div style={{ fontSize: '16px', color: '#333' }}>
                {example && (
                    <p  style={{ fontSize: '16px', marginLeft:'20px'}}>
                       {anonymizeCountry(example)}
                        {exampleRef && <span style={{ fontStyle: 'italic',fontSize: '12px' }}><br/> Reference:  {anonymizeCountry(exampleRef)}, Source: {anonymizeCountry(source)}</span>}
                   </p>
                )}
            </div>

    )
}
function ContentText({example, exampleRef, source}) {

    const text = createText(example, exampleRef, source)

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
};
export default ContentText;