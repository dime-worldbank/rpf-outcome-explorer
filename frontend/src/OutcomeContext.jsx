import React, { createContext, useState } from 'react';

const OutcomeContext = createContext();

export const OutcomeProvider = ({ children }) => {
  const [outcome, setOutcome] = useState('');
  const [showExplorer, setShowExplorer] = useState(false);

  return (
    <OutcomeContext.Provider value={{ outcome, setOutcome, showExplorer, setShowExplorer }}>
      {children}
    </OutcomeContext.Provider>
  );
};

export default OutcomeContext;