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

const isBlank = (val) => !val || val.trim() === '' || val.trim().toLowerCase() === 'nan';

// Splits text into parts, wrapping any URLs in <a> tags
const URL_REGEX = /(https?:\/\/[^\s,;)]+)/g;
function linkify(text) {
    if (!text) return null;
    const parts = text.split(URL_REGEX);
    return parts.map((part, i) => {
        const isUrl = /^https?:\/\//.test(part);
        return isUrl
            ? <a key={i} href={part} target="_blank" rel="noopener noreferrer"
                style={{ color: '#2d7aaa', wordBreak: 'break-all' }}>{part}</a>
            : part;
    });
}

function ContentText({example, exampleRef, source, bottleneckName, lessons}) {
    let number = null;
    if (bottleneckName) {
        number = bottleneckName.match(/^\d+(\.\d+)*/)?.[0];
    }

    return (
        <div className="content-text" style={{ marginBottom: '12px' }}>
            {!isBlank(example) && (
                <p style={{ fontSize: 'var(--fs-base)', lineHeight: 1.8, marginBottom: '4px', color: '#1a3a52' }}>
                    {anonymizeCountry(example)}
                    {!isBlank(exampleRef) && (
                        <span style={{ fontStyle: 'italic', fontSize: 'var(--fs-sm)', color: '#666', overflowWrap: 'anywhere' }}>
                            <br/>Reference: {linkify(anonymizeCountry(exampleRef))}
                            {!isBlank(source) && <><br/>Source: {linkify(anonymizeCountry(source))}</>}
                        </span>
                    )}
                    {number && (
                        <span style={{ fontStyle: 'italic', fontSize: 'var(--fs-sm)', color: '#666', overflowWrap: 'anywhere' }}>
                            <br/>Bottleneck Reference: {number}
                        </span>
                    )}
                </p>
            )}
            {!isBlank(lessons) && (
                <div style={{
                    background: 'rgba(45,122,170,0.06)',
                    borderLeft: '3px solid #2d7aaa',
                    borderRadius: '0 6px 6px 0',
                    padding: 'clamp(6px, 0.5vw, 12px) clamp(8px, 0.7vw, 16px)',
                    marginTop: '6px',
                }}>
                    <p style={{ fontSize: 'var(--fs-sm)', fontWeight: '700', color: '#2d7aaa', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 4px 0' }}>
                        Lessons from Outcome-Based Research
                    </p>
                    <p style={{ fontSize: 'var(--fs-sm)', color: '#1a3a52', lineHeight: 1.7, margin: 0 }}>
                        {lessons}
                    </p>
                </div>
            )}
        </div>
    );
}
ContentText.propTypes = {
    example: PropTypes.string.isRequired,
    exampleRef: PropTypes.string,
    source: PropTypes.string,
    bottleneckName: PropTypes.string,
    lessons: PropTypes.string,
};
export default ContentText;