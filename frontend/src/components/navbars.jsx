import React, { useState, useContext, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import OutcomeContext from '../OutcomeContext';
import Content from './content';
import CircleVisual from './circleVisual';
import {ReactComponent as VerticalNavImg} from '../assets/framework2.svg';



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
          setSelectedItem(target.id);
          contentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

  const handleZoneClick = (event) => {
    const clickedId = event.target.id;
    if (!clickedId) return;
    
    setSelectedItem(clickedId);
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    // Add 'selected' class to the clicked zone, remove from others
    const svg = event.target.ownerSVGElement || event.target.closest('rect');
    if (svg) {
      ['outcome', 'results', 'policy', 'role_A', 'bottleneck_1'].forEach(zoneId => {
        const el = svg.getElementById(zoneId);
        if (el) {
          if (zoneId === clickedId) {
            el.classList.add('selected');
          } else {
            el.classList.remove('selected');
          }
        }
      });
    }
    if (clickedId === 'outcome' || clickedId === 'results' || clickedId === 'policy'){
      setTopDivHeight(55); // Expand for top three zones
    } else if(clickedId.startsWith('bottleneck') || clickedId.startsWith("role")) {
      setTopDivHeight(45); // Shrink for role and bottleneck zones
    }
  };

    return (
        <Container fluid style={{ height: 'calc(100vh - 60px)', padding: 0 }}>
            <Row className="h-100">
                {/* Sidebar Column */}
                <Col xs={12} md={4} lg={4}
                    className="bg-paper d-flex flex-column h-100"
                    >
                    <VerticalNavImg className={isHovered ? 'hovered' : ''} onClick={(event) => handleZoneClick(event)} onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}
                                 style={{
                                    minWidth: '33vw',
                                     height: topDivHeight +  'vh',
                                     transition: 'all 0.3s ease-in-out',
                                    minWidth: window.innerWidth >= 768 ? '33vw' : '100%'
                                 }}
                    />  

                  
                    <CircleVisual onClick={handleVizClick} selectedItem={selectedItem} />
                </Col>
                <Col xs={12} md={8} lg={8} className="h-100" style={{ overflowY: 'auto' }}>
                  <Content contentRef={contentRef} outcome={outcome} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                </Col>
            </Row>
        </Container>
    );
}

export default VerticalNavbarPermanent;
