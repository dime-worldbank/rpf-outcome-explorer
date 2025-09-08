import React, { useState, useContext, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import OutcomeContext from '../OutcomeContext';
import Content from './content';
import CircleVisual from './circleVisual';
import verticalNavImg from '../assets/framework.svg';
import roleButton from '../assets/role-button.png';
import bottleneckButton from '../assets/bottleneck-button.png';
import redArrow from '../assets/red-arrow.png';
import blueArrow from '../assets/blue-arrow.png';

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
  {
    id: 'role-A',
    className: 'role-A-zone',
  },
  {
    id: 'bottleneck-1',
    className: 'bottleneck-1-zone',
  }
];

function VerticalNavbarPermanent() {
    const [selectedItem, setSelectedItem] = useState('outcome');
    const [topDivHeight, setTopDivHeight] = useState(55);
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
        setTopDivHeight(45); // Shrink when CircleVisual is clicked
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
            setTopDivHeight(55); // Expand for top three zones
        } else {
            setTopDivHeight(45); // Shrink for role and bottleneck zones
        }
    };

    return (
        <Container fluid style={{ height: 'calc(100vh - 60px)', padding: 0 }}>
            <Row className="h-100">
                {/* Sidebar Column */}
                <Col xs={12} md={4} lg={4}
                    className="bg-paper d-flex flex-column h-100"
                    style={{ padding: '10px 0' }}>
                                                  {/* Image */}
                            <img
                                src={verticalNavImg}
                                alt='Vertical Navigation'
                                style={{
                                    width: '33vw',
                                    height:  `${topDivHeight+10}vh`,
                                    transition: 'all 0.3s ease-in-out',
                                    position: 'absolute',
                                }}
                            />
                            <img src={redArrow} alt="Red Arrow" className="red-arrow" style={{ position: 'absolute', top: '10%', left: '3.5%', width: '35px', height: `${topDivHeight}vh` }} />
                            <img src={blueArrow} alt="Blue Arrow" className="blue-arrow" style={{ position: 'absolute', top: '35%', left: '25%', width: '35px', height: `${topDivHeight-25}vh` }} />

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

                            {/* Masks */}
                            <div className="mask middle-mask"></div>
                            <div className="mask bottom-mask"></div>

                        </div>
                    </div>
                    <div className='d-flex justify-content-center' style={{width: '33vw', paddingTop: '30px'}}  >
                    <div className='d-flex justify-content-between' style={{ width: '80%' }}>
                    <button className="evidence-button role" onClick={() => handleZoneClick('role_A')}>
                        <img src={roleButton} alt="Evidence" />
                    </button>
                      <button className="evidence-button bottleneck" onClick={() => handleZoneClick('bottleneck_1')}>
                        <img src={bottleneckButton} alt="Evidence" />
                    </button>
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
