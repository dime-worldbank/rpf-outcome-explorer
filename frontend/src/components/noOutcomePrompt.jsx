import React from 'react';
import { useContext } from 'react';
import OutcomeContext from '../OutcomeContext';

function NoOutcomePrompt({ setSelectedItem }) {
  const { setOutcome } = useContext(OutcomeContext);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: '36px',
        marginBottom: '16px',
        opacity: 0.4,
      }}>
        ←
      </div>
      <p style={{ fontSize: '15px', fontWeight: '600', color: '#0d2d4a', marginBottom: '8px' }}>
        No policy area selected yet
      </p>
      <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.6, maxWidth: '340px', marginBottom: '20px' }}>
        Please go back to step 1.1 and select a policy area before continuing.
      </p>
      <button
        onClick={() => setSelectedItem('outcome')}
        style={{
          backgroundColor: '#2d7aaa',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 20px',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
        }}
      >
        Go to Step 1.1
      </button>
    </div>
  );
}

export default NoOutcomePrompt;
