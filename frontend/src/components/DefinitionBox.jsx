import React from 'react';
import PropTypes from 'prop-types';
import { card, typography } from '../theme';

/**
 * Tinted definition box used throughout the dashboard.
 * Shows an uppercase "DEFINITION" label followed by the description text.
 */
function DefinitionBox({ definition, style }) {
  if (!definition) return null;
  return (
    <div style={{ ...card.definition, ...style }}>
      <p style={{ ...typography.label, margin: '0 0 4px 0' }}>Definition</p>
      <p style={{ fontSize: 'var(--fs-sm)', color: '#1a3a52', lineHeight: 1.6, margin: 0 }}>{definition}</p>
    </div>
  );
}

DefinitionBox.propTypes = {
  definition: PropTypes.string,
  style:      PropTypes.object,
};

export default DefinitionBox;
