import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import { useContext } from 'react';
import { OutcomeProvider } from './OutcomeContext';
import OutcomeContext from './OutcomeContext';
import HomePage from './components/homePage';
import VerticalNavbarPermanent from './components/navbars';
import Header from './components/header';

export default function App() {
  const { outcome, showExplorer } = useContext(OutcomeContext);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Header />
      {!showExplorer && <HomePage />}
      {showExplorer && <VerticalNavbarPermanent />}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <OutcomeProvider>
    <App />
  </OutcomeProvider>
);
