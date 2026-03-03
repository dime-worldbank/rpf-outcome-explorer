import React from 'react';
import { useContext } from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import OutcomeContext from '../OutcomeContext';
import { FEEDBACK_URL } from '../constants';

import frameworkImg from '../assets/vertical.svg';
import fivestepImg from '../assets/framwork.png';

function HomePage() {
  const { setShowExplorer } = useContext(OutcomeContext);

  return (
    <Container
      fluid
      className="home-page d-flex flex-column"
      style={{ flex: 1, minHeight: 0, overflowY: 'auto', background: 'rgb(240, 240, 240)', padding: '24px 32px' }}
    >
      <Row className="flex-grow-1 g-4 align-items-stretch" style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>

        {/* Left: framework diagram */}
        <Col xs={12} md={4} className="d-none d-md-flex justify-content-center align-items-center">
          <Image
            src={frameworkImg}
            alt="Outcome-led PFM framework"
            fluid
            style={{ maxHeight: '80vh', objectFit: 'contain' }}
          />
        </Col>

        {/* Right: intro content */}
        <Col xs={12} md={8} className="d-flex flex-column gap-3">

          {/* Title block */}
          <div style={{
            borderLeft: '4px solid #2d7aaa',
            background: 'rgba(45,122,170,0.06)',
            borderRadius: '0 8px 8px 0',
            padding: '18px 22px',
          }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '700', color: '#0d2d4a', lineHeight: 1.3 }}>
              Welcome to the Outcome Explorer
            </p>
            <p style={{ margin: 0, fontSize: '13px', color: '#2d7aaa', fontWeight: '600', lineHeight: 1.5 }}>
              Outcome-Led PFM Reform — A five-step diagnostic framework
            </p>
          </div>

          {/* Main description card */}
          <div style={{
            background: '#fff',
            border: '1px solid #b8d9ee',
            borderRadius: '8px',
            padding: '20px 22px',
          }}>
            <p style={{ fontSize: '11px', fontWeight: '700', color: '#2d7aaa', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 10px 0' }}>
              About this tool
            </p>
            <p style={{ fontSize: '14px', color: '#1a3a52', lineHeight: 1.7, margin: '0 0 16px 0' }}>
              The five-step process for outcome-led PFM reform is designed to support PFM reforms
              that more effectively advance development outcomes and public policy objectives. The aim
              is to provide a practical method for governments and other reform stakeholders to
              identify, prioritize, and address key PFM bottlenecks, and thereby enable public
              finance to play its roles in support of service delivery and development outcomes more
              effectively.
            </p>

            <div className="d-flex justify-content-center" style={{ margin: '4px 0 16px 0' }}>
              <Image
                src={fivestepImg}
                alt="Five-step process diagram"
                style={{ maxWidth: '100%', maxHeight: '26vh', objectFit: 'contain' }}
              />
            </div>

            <p style={{ fontSize: '14px', color: '#1a3a52', lineHeight: 1.7, margin: 0 }}>
              This Outcome-Led PFM Reform Explorer takes you through the first two of the five
              steps — the process of reform diagnosis by identifying reform priorities based on an
              Outcome-Led Analytical approach. It allows you to explore the taxonomy of roles of
              public finance and PFM bottlenecks for different development outcomes, drawing on a
              body of examples compiled from research.
              The aim is to help you understand the logic of the approach and where to look when
              applying the outcome-led approach to PFM reform.
            </p>
          </div>

          {/* Get started + disclaimer row */}
          <div className="d-flex align-items-center justify-content-between" style={{ marginTop: '4px' }}>
            <p style={{ fontSize: '12px', color: '#888', margin: 0, lineHeight: 1.5 }}>
              Disclaimer: The information presented here is preliminary and illustrative.
              Feedback welcome —{' '}
              <a href={FEEDBACK_URL} style={{ color: '#2d7aaa' }}>share it here</a>.
            </p>
            <button
              onClick={() => setShowExplorer(true)}
              style={{
                backgroundColor: '#2d7aaa',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 28px',
                fontSize: '14px',
                fontWeight: '600',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                flexShrink: 0,
                marginLeft: '16px',
                boxShadow: '0 2px 8px rgba(45,122,170,0.35)',
                transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#1f5e85';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(45,122,170,0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#2d7aaa';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(45,122,170,0.35)';
              }}
            >
              Get Started →
            </button>
          </div>

        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
