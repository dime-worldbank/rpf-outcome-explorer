import React from "react";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import PropTypes from "prop-types";

const bottleneckOrder = Array.from({ length: 8 }, (_, i) => 'bottleneck_' + (i + 1));
const roleOrder = Array.from({ length: 4 }, (_, i) => 'role_' + String.fromCharCode(65 + i));

const navigationMap = {
  "outcome": "Development Outcome",
  "results": "Public Sector Results",
  "policy": "Delivery Capability & Feasible Policy",
};
for (let i = 1; i <= 8; i++) navigationMap['bottleneck_' + i] = 'Bottleneck Group ' + i;
for (let i = 0; i < 4; i++) navigationMap['role_' + String.fromCharCode(65 + i)] = 'Role ' + String.fromCharCode(65 + i);

const btnStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#4d9fd2',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 10px',
  borderRadius: '6px',
  fontSize: '0.9rem',
  fontWeight: '500',
  transition: 'background 0.15s',
};

function ArrowNav({ selectedItem, setSelectedItem }) {
  const isRole = selectedItem.startsWith('role');
  const isBottleneck = selectedItem.startsWith('bottleneck');
  if (!isRole && !isBottleneck) return null;

  const group = isRole ? roleOrder : bottleneckOrder;
  const idx = group.indexOf(selectedItem);
  const prevItem = idx > 0 ? group[idx - 1] : null;
  const nextItem = idx < group.length - 1 ? group[idx + 1] : null;

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      {prevItem ? (
        <button style={btnStyle} onClick={() => setSelectedItem(prevItem)}>
          <BiSolidLeftArrow size={14} />
          {navigationMap[prevItem]}
        </button>
      ) : <div />}

      {nextItem && (
        <button style={btnStyle} onClick={() => setSelectedItem(nextItem)}>
          {navigationMap[nextItem]}
          <BiSolidRightArrow size={14} />
        </button>
      )}
    </div>
  );
}

ArrowNav.propTypes = {
  selectedItem: PropTypes.string.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default ArrowNav;
