import React, { useState, useContext, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import OutcomeContext from '../OutcomeContext';
import Content from './content';
import CircleVisual from './circleVisual';
import ProgressIndicator from './progressIndicator';
import {ReactComponent as VerticalNavImg} from '../assets/vertical-version1.svg';



const HOVER_ZONES = [
  {
    id: 'outcome',
    className: 'top-zone',
  },
  {
    id: 'results',
    className: 'middle-zone',
  },
  {
    id: 'policy',
    className: 'bottom-zone',
  },
];

function VerticalNavbarPermanent() {
    const [selectedItem, setSelectedItem] = useState('outcome');
    const [topDivHeight, setTopDivHeight] = useState(55);
    const [isHovered, setIsHovered] = useState(false);
    const { outcome } = useContext(OutcomeContext);
    const contentRef = useRef();


    const handleVizClick = (event, defaultGroup='') => {
        setTopDivHeight(45); // Shrink when CircleVisual is clicked
        if (event){
          const target = event.target.closest('g');
          if (!target) return;
          if (target.id === 'group0'){
            return;
          }
          setSelectedItem(target.id);
          contentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

  useEffect(() => {
      const outcomeReact = document.getElementsByClassName('clickable outcome');
      if (!outcomeReact) return;
      for (let elem of outcomeReact){
          elem.classList.add('selected');
      }
  }, []);

  // Step → SVG component IDs to highlight
  const STEP_HIGHLIGHTS = {
    outcome:    ['development-outcomes'],
    results:    ['public-sector-results', 'challenges'],
    policy:     ['public-policy', 'fiscal-policy-pfm', 'institutions'],
    role:       ['left-question', 'public-policy', 'fiscal-policy-pfm', 'institutions'],
    bottleneck: ['right-question', 'fiscal-policy-pfm'],
  };

  const ALL_COMPONENTS = [
    'development-outcomes', 'public-sector-results', 'challenges',
    'public-policy', 'fiscal-policy-pfm', 'institutions',
    'left-question', 'right-question',
  ];

  // Keep SVG highlighting and sidebar height in sync with selectedItem
  useEffect(() => {
    // Update sidebar height
    if (selectedItem === 'outcome' || selectedItem === 'results' || selectedItem === 'policy') {
      setTopDivHeight(55);
    } else if (selectedItem.startsWith('bottleneck') || selectedItem.startsWith('role')) {
      setTopDivHeight(45);
    }

    // Resolve step key
    const key = selectedItem.startsWith('role') ? 'role'
              : selectedItem.startsWith('bottleneck') ? 'bottleneck'
              : selectedItem;

    const toHighlight = STEP_HIGHLIGHTS[key] || [];

    // Apply highlighted / dimmed classes to each component
    ALL_COMPONENTS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (toHighlight.includes(id)) {
        el.classList.add('highlighted');
        el.classList.remove('dimmed');
      } else {
        el.classList.add('dimmed');
        el.classList.remove('highlighted');
      }
    });
  }, [selectedItem]);

  const handleZoneClick = (event) => {
    const clickedId = event.target.id;
    if (!clickedId) return;
    setSelectedItem(clickedId); // useEffect handles SVG sync and height
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

    return (
        <Container fluid style={{ height: '92vh', padding: 0 }} className="d-flex flex-column">
            <ProgressIndicator selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            <Row className="flex-grow-1" style={{ minHeight: 0 }}>
                {/* Sidebar Column */}
                <Col xs={12} md={4} lg={4}
                    className="bg-paper d-flex flex-column"
                    style={{ height: '100%' }}
                    >
                    <VerticalNavImg
                                 style={{
                                     height: topDivHeight + 'vh',
                                     transition: 'height 0.3s ease-in-out',
                                     width: '100%',
                                 }}
                    />

                  
                    <CircleVisual onClick={handleVizClick} selectedItem={selectedItem} />
                </Col>
                <Col xs={12} md={8} lg={8} style={{ height: '100%', overflowY: 'auto' }}>
                  <Content contentRef={contentRef} outcome={outcome} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                </Col>
            </Row>
        </Container>
    );
}

export default VerticalNavbarPermanent;
