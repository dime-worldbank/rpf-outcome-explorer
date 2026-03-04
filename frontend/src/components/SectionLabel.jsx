import React from 'react';
import PropTypes from 'prop-types';
import { typography } from '../theme';

/**
 * Uppercase blue section label (e.g. "DEFINITION", "EXAMPLE", "EXAMPLES").
 * Matches the policyCapability pattern used throughout the dashboard.
 */
function SectionLabel({ text, style }) {
  return (
    <p style={{ ...typography.label, margin: '0 0 6px 0', ...style }}>{text}</p>
  );
}

SectionLabel.propTypes = {
  text:  PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default SectionLabel;
