import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss'
import { OutcomeProvider } from './OutcomeContext'; // Import the provider
import { AnimatePresence, motion } from 'framer-motion';
import OutcomeContext from './OutcomeContext';
import { useContext } from 'react';

import './App.css';
import HomePage from './components/homePage';
import VerticalNavbarPermanent from './components/navbars';
import Header from './components/header'; // Import the Header component
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';


export default function App() {
  const { outcome } = useContext(OutcomeContext);


  

  const pageVariants = {
  "initial": { // State 1: When the component is first rendered (before 'animate')
    opacity: 0,
    x: "-100vw" // Start off-screen to the left
  },
  "in": {      // State 2: The component's active/final state after entering
    opacity: 1,
    x: 0      // Move to its final position (on-screen)
  },
  "out": {     // State 3: When the component is about to be removed from the DOM
    opacity: 0,
    x: "100vw" // Exit off-screen to the right
  }
};

const pageTransition = {
  type: "tween",   // Defines the animation type (tween, spring, inertia). Tween is time-based.
  ease: "anticipate", // Defines the easing function for the animation (how it accelerates/decelerates).
  duration: 0.5    // Defines the duration of the animation in seconds.
};
  return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}> {/* Ensure full viewport height and no scrolling */}
          <Header /> {/* Include the Header component */}
         {!outcome && <HomePage />}
         {outcome && <VerticalNavbarPermanent />}
        </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <OutcomeProvider>
    <App />
  </OutcomeProvider>
);
