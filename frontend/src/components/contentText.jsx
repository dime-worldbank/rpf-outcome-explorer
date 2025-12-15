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