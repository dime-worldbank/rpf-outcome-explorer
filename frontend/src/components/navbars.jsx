import React, { useState, useContext, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import OutcomeContext from '../OutcomeContext';
import Content from './content';
import CircleVisual from './circleVisual';
import verticalNavImg from '../assets/framework2.svg';



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
    const [topDivHeight, setTopDivHeight] = useState(65);
    const { outcome } = useContext(OutcomeContext);
    const contentRef = useRef();

    useEffect(() => {
        if (selectedItem){
            if (contentRef.current) {
                contentRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [selectedItem]);

    const handleVizClick = (event, defaultGroup='') => {
        setTopDivHeight(40); // Shrink when CircleVisual is clicked
        if (!event){
          setSelectedItem(defaultGroup);
        }else{
          const target = event.target.closest('g');
          if (!target) return;
          setSelectedItem(target.id);
        }
    };

    const handleZoneClick = (zone) => {
        setSelectedItem(zone);
        if (zone === 'outcome' || zone === 'results' || zone === 'policy'){
            setTopDivHeight(65); // Expand for top three zones
        } else {
            setTopDivHeight(40); // Shrink for role and bottleneck zones
        }
    };

    return (
        <Container fluid style={{ height: 'calc(100vh - 60px)', padding: 0 }}>
            <Row className="h-100">
                {/* Sidebar Column */}
                <Col xs={12} md={4} lg={4}
                    className="bg-paper d-flex flex-column h-100"
                    style={{ padding: '10px 0' }}>
                        
                            <img
                                src={verticalNavImg}
                                alt='Vertical Navigation'
                                style={{
                                    minWidth: '33vw',
                                    height: topDivHeight +  'vh',
                                    transition: 'all 0.3s ease-in-out',
                                    paddingBottom: '20px',
                                    position: 'absolute',
                                }}
                            />

                    <div style={{
                        width: '100%',
                        height: `${topDivHeight}vh`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        transition: 'height 0.3s ease-in-out' // Add smooth transition
                    }}>
                        {/* Image Reveal with Hover Zones */}
                        <div className="reveal-image" style={{ width: '80%', height: '100%' }}>
                            {/* Hover zones */}
                            {HOVER_ZONES.map((zone) => (
                              <div
                                key={zone.id}
                                id={zone.id}
                                className={`hover-zone ${zone.className} ${selectedItem === zone.id ? 'selected' : ''}`}
                                onClick={() => handleZoneClick(zone.id)}
                              ></div>
                            ))}
                            <div className = 'hover-buttons'>
                               <div
                                key={'left-button'}
                                id={'left-button'}
                                className={`left-button ${selectedItem === 'left-button' ? 'selected' : ''}`}
                                onClick={() => handleZoneClick('role_A')}
                              ></div>
                                                             <div
                                key={'right-button'}
                                id={'right-button'}
                                className={`right-button ${selectedItem === 'right-button' ? 'selected' : ''}`}
                                onClick={() => handleZoneClick('role_B')}
                              ></div>
                            </div>

                            {/* Masks */}
                            <div className="mask middle-mask"></div>
                            <div className="mask bottom-mask"></div>

                        </div>
                    </div>
                    <div className='d-flex justify-content-center' style={{width: '33vw', paddingTop: '30px'}}  >
                    <div className='d-flex justify-content-between' style={{ width: '80%' }}>
                    </div>
                    </div>
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
