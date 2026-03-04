import React from 'react';
import PropTypes from 'prop-types';
import { badge } from '../theme';

/**
 * Blue pill badge showing the short outcome name.
 * Used to label examples/lessons in combined views.
 */
function OutcomeBadge({ label, style }) {
  if (!label) return null;
  return (
    <span style={{ ...badge.outcome, ...style }}>{label}</span>
  );
}

OutcomeBadge.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default OutcomeBadge;
