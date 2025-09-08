import React, { createContext, useState } from 'react';

const OutcomeContext = createContext();

export const OutcomeProvider = ({ children }) => {
  const [outcome, setOutcome] = useState('');

  return (
    <OutcomeContext.Provider value={{ outcome, setOutcome }}>
      {children}
    </OutcomeContext.Provider>
  );
};

export default OutcomeContext;