import React from "react";
import PropTypes from "prop-types";

// Full linear step order across all pages
const STEP_ORDER = [
  'outcome',
  'results',
  'policy',
  'challenges',
  'role_A', 'role_B', 'role_C', 'role_D',
  'bottleneck_1', 'bottleneck_2', 'bottleneck_3', 'bottleneck_4',
  'bottleneck_5', 'bottleneck_6', 'bottleneck_7', 'bottleneck_8',
  'closure',
];

const STEP_LABELS = {
  'outcome':       '1.1 Select Policy Areas',
  'results':       '1.2 Public Sector Results',
  'policy':        '1.3 Feasible Policy',
  'challenges':    '1.4 Public Sector Challenges',
  'role_A':        '2.1 Role A',
  'role_B':        '2.1 Role B',
  'role_C':        '2.1 Role C',
  'role_D':        '2.1 Role D',
  'bottleneck_1':  '2.2 Bottleneck Group 1',
  'bottleneck_2':  '2.2 Bottleneck Group 2',
  'bottleneck_3':  '2.2 Bottleneck Group 3',
  'bottleneck_4':  '2.2 Bottleneck Group 4',
  'bottleneck_5':  '2.2 Bottleneck Group 5',
  'bottleneck_6':  '2.2 Bottleneck Group 6',
  'bottleneck_7':  '2.2 Bottleneck Group 7',
  'bottleneck_8':  '2.2 Bottleneck Group 8',
  'closure':       'Summary',
};

function ArrowNav({ selectedItem, setSelectedItem }) {
  const idx = STEP_ORDER.indexOf(selectedItem);
  if (idx === -1) return null;

  const prevItem = idx > 0 ? STEP_ORDER[idx - 1] : null;
  const nextItem = idx < STEP_ORDER.length - 1 ? STEP_ORDER[idx + 1] : null;

  const btnBase = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    border: '1px solid #b8d9ee',
    transition: 'background 0.15s, border-color 0.15s',
  };

  const backStyle = {
    ...btnBase,
    background: '#fff',
    color: '#2d7aaa',
  };

  const nextStyle = {
    ...btnBase,
    background: '#2d7aaa',
    color: '#fff',
    border: '1px solid #2d7aaa',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '32px',
        paddingTop: '16px',
        borderTop: '1px solid #dce8f2',
      }}
    >
      {prevItem ? (
        <button
          style={backStyle}
          onClick={() => setSelectedItem(prevItem)}
          onMouseEnter={e => { e.currentTarget.style.background = '#f0f7fc'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
        >
          ← {STEP_LABELS[prevItem]}
        </button>
      ) : <div />}

      {nextItem && (
        <button
          style={nextStyle}
          onClick={() => setSelectedItem(nextItem)}
          onMouseEnter={e => { e.currentTarget.style.background = '#1f5e85'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#2d7aaa'; }}
        >
          {STEP_LABELS[nextItem]} →
        </button>
      )}
    </div>
  );
}

ArrowNav.propTypes = {
  selectedItem:    PropTypes.string.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default ArrowNav;
