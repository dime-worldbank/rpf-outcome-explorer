import React from 'react';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';

const STEPPER_ORDER = ['outcome', 'results', 'policy', 'challenges', 'role', 'bottleneck', 'closure'];
const STEPPER_FIRST_ITEM = { role: 'role_A', bottleneck: 'bottleneck_1' };

const GROUP1_STEPS = [
  { id: 'outcome',    num: '1.1', label: 'Select policy areas' },
  { id: 'results',    num: '1.2', label: 'Identify outcomes and public sector results' },
  { id: 'policy',     num: '1.3', label: 'Understand the context' },
  { id: 'challenges', num: '1.4', label: 'Identify key challenges' },
];

const GROUP2_STEPS = [
  { id: 'role',       num: '2.1', label: 'Assess roles of public finance' },
  { id: 'bottleneck', num: '2.2', label: 'Identify PFM bottlenecks' },
  { id: 'closure',    num: '2.3', label: 'Agree on reform teams' },
];

// Reddish palette for phase headers
const PHASE_RED       = '#a93226';
const PHASE_RED_BG    = '#fdf0ef';
const PHASE_RED_BORDER = '#e8b4b0';

// Bluish palette for sub-steps
const STEP_BLUE_ACTIVE   = '#1a6fa8';
const STEP_BLUE_INACTIVE = '#4d9fd2';
const STEP_ACTIVE_BG     = '#e6f2fa';

function isStepActive(stepId, selectedItem) {
  if (stepId === 'role')       return selectedItem.startsWith('role');
  if (stepId === 'bottleneck') return selectedItem.startsWith('bottleneck');
  return selectedItem === stepId;
}

function handleNavigate(stepId, setSelectedItem) {
  if (stepId === 'role')       return setSelectedItem('role_A');
  if (stepId === 'bottleneck') return setSelectedItem('bottleneck_1');
  setSelectedItem(stepId);
}

function StepItem({ step, active, setSelectedItem }) {
  return (
    <div
      onClick={() => handleNavigate(step.id, setSelectedItem)}
      style={{
        flex: 1,
        cursor: 'pointer',
        borderRadius: '6px',
        backgroundColor: active ? STEP_ACTIVE_BG : 'transparent',
        padding: '5px 6px',
        transition: 'background 0.15s',
      }}
    >
      {/* Step number pill */}
      <div style={{
        display: 'inline-block',
        backgroundColor: active ? STEP_BLUE_ACTIVE : 'transparent',
        color: active ? 'white' : STEP_BLUE_INACTIVE,
        border: `1.5px solid ${active ? STEP_BLUE_ACTIVE : STEP_BLUE_INACTIVE}`,
        borderRadius: '4px',
        padding: '1px 7px',
        fontSize: '0.73rem',
        fontWeight: '700',
        marginBottom: '4px',
        letterSpacing: '0.02em',
      }}>
        {step.num}
      </div>
      {/* Step label */}
      <div style={{
        fontSize: '0.68rem',
        color: active ? STEP_BLUE_ACTIVE : '#777',
        lineHeight: 1.3,
        fontWeight: active ? '600' : '400',
      }}>
        {step.label}
      </div>
    </div>
  );
}

function StepGroup({ phaseNum, phaseLabel, steps, selectedItem, setSelectedItem }) {
  return (
    <div style={{
      flex: 1,
      borderRadius: '8px',
      overflow: 'hidden',
      border: `1px solid ${PHASE_RED_BORDER}`,
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      backgroundColor: 'white',
    }}>
      {/* Reddish phase header */}
      <div style={{
        backgroundColor: PHASE_RED_BG,
        borderBottom: `1px solid ${PHASE_RED_BORDER}`,
        padding: '5px 10px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '7px',
      }}>
        <span style={{
          backgroundColor: PHASE_RED,
          color: 'white',
          borderRadius: '50%',
          width: '18px',
          height: '18px',
          flexShrink: 0,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.68rem',
          fontWeight: '700',
          marginTop: '1px',
        }}>
          {phaseNum}
        </span>
        <span style={{
          color: PHASE_RED,
          fontSize: '0.7rem',
          fontWeight: '600',
          lineHeight: 1.3,
        }}>
          {phaseLabel}
        </span>
      </div>

      {/* Bluish sub-steps */}
      <div style={{
        backgroundColor: 'white',
        padding: '6px 6px',
        display: 'flex',
        gap: '2px',
      }}>
        {steps.map(step => (
          <StepItem
            key={step.id}
            step={step}
            active={isStepActive(step.id, selectedItem)}
            setSelectedItem={setSelectedItem}
          />
        ))}
      </div>
    </div>
  );
}

function ProgressIndicator({ selectedItem, setSelectedItem }) {
  const currentKey = selectedItem.startsWith('role') ? 'role'
                   : selectedItem.startsWith('bottleneck') ? 'bottleneck'
                   : selectedItem;

  const idx = STEPPER_ORDER.indexOf(currentKey);
  const prevKey = idx > 0 ? STEPPER_ORDER[idx - 1] : null;
  const nextKey = idx >= 0 && idx < STEPPER_ORDER.length - 1 ? STEPPER_ORDER[idx + 1] : null;

  const navigateTo = (key) => setSelectedItem(STEPPER_FIRST_ITEM[key] ?? key);

  const arrowBtn = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#2d7aaa',
    padding: '0 4px',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  };

  return (
    <div
      className="d-flex align-items-stretch px-3 py-2"
      style={{
        gap: '8px',
        backgroundColor: '#e4f2fb',
        borderTop: '3px solid #4d9fd2',
        borderBottom: '2px solid #b8d9ee',
        boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
      }}
    >

      <button style={arrowBtn} disabled={!prevKey} onClick={() => prevKey && navigateTo(prevKey)}>
        <BiSolidLeftArrow size={16} style={{ opacity: prevKey ? 1 : 0.25 }} />
      </button>

      <StepGroup
        phaseNum="1"
        phaseLabel="Select Outcomes and the public sector results to focus on and identify public sector challenges"
        steps={GROUP1_STEPS}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      <StepGroup
        phaseNum="2"
        phaseLabel="Identify the role of public finance and PFM bottlenecks and prioritize them"
        steps={GROUP2_STEPS}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      <button style={arrowBtn} disabled={!nextKey} onClick={() => nextKey && navigateTo(nextKey)}>
        <BiSolidRightArrow size={16} style={{ opacity: nextKey ? 1 : 0.25 }} />
      </button>

    </div>
  );
}

export default ProgressIndicator;
