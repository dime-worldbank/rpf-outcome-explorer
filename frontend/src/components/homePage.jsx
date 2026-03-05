import React from 'react';
import { useContext } from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import OutcomeContext from '../OutcomeContext';
import { FEEDBACK_URL } from '../constants';

import frameworkImg from '../assets/diagram-ver.png';
import fivestepImg from '../assets/framwork.png';

function HomePage() {
  const { setShowExplorer } = useContext(OutcomeContext);

  return (
    <Container
      fluid
      className="home-page d-flex flex-column"
      style={{ flex: 1, minHeight: 0, overflow: 'hidden', background: 'rgb(240, 240, 240)', padding: '14px 24px' }}
    >
      <Row
        className="g-3 align-items-stretch flex-grow-1"
        style={{ width: '100%', minHeight: 0, height: 0 }}
      >

        {/* Left: framework diagram */}
        <Col xs={12} md={4} className="d-none d-md-flex justify-content-center align-items-center"
          style={{ minHeight: 0, height: '100%', overflow: 'hidden' }}>
          <Image
            src={frameworkImg}
            alt="Outcome-led PFM framework"
            fluid
            style={{ maxHeight: '100%', width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
          />
        </Col>

        {/* Right: intro content — flex column so card scrolls and button stays pinned */}
        <Col xs={12} md={8} className="d-flex flex-column" style={{ minHeight: 0, height: '100%', gap: '8px' }}>

          {/* Title block — fixed, never scrolls away */}
          <div style={{
            flexShrink: 0,
            borderLeft: '4px solid #2d7aaa',
            background: 'rgba(45,122,170,0.06)',
            borderRadius: '0 8px 8px 0',
            padding: '12px 18px',
          }}>
            <p style={{ margin: '0 0 4px 0', fontSize: 'clamp(17px, 1.4vw, 24px)', fontWeight: '700', color: '#0d2d4a', lineHeight: 1.3 }}>
              Welcome to the Outcome Explorer
            </p>
            <p style={{ margin: 0, fontSize: 'clamp(12px, 1vw, 16px)', color: '#2d7aaa', fontWeight: '600', lineHeight: 1.5 }}>
              Outcome-Led PFM Reform — A five-step diagnostic framework
            </p>
          </div>

          {/* Main description card — scrollable, fills remaining space */}
          <div style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            background: '#fff',
            border: '1px solid #b8d9ee',
            borderRadius: '8px',
            padding: '12px 16px',
          }}>
            <p style={{ fontSize: 'clamp(10px, 0.75vw, 13px)', fontWeight: '700', color: '#2d7aaa', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 6px 0' }}>
              About this tool
            </p>
            <p style={{ fontSize: 'clamp(13px, 0.95vw, 16px)', color: '#1a3a52', lineHeight: 1.6, margin: '0 0 8px 0' }}>
              The five-step process for outcome-led PFM reform is designed to support PFM reforms
              that more effectively advance development outcomes and public policy objectives. The aim
              is to provide a practical method for governments and other reform stakeholders to
              identify, prioritize, and address key PFM bottlenecks, and thereby enable public
              finance to play its roles in support of service delivery and development outcomes more
              effectively.
            </p>

            <div className="d-flex justify-content-center" style={{ margin: '4px 0 10px 0' }}>
              <Image
                src={fivestepImg}
                alt="Five-step process diagram"
                style={{ width: 'clamp(30%, 45%, 60%)', height: 'auto', objectFit: 'contain' }}
              />
            </div>

            <p style={{ fontSize: 'clamp(13px, 0.95vw, 16px)', color: '#1a3a52', lineHeight: 1.6, margin: 0 }}>
              This Outcome-Led PFM Reform Explorer takes you through the first two of the five
              steps — the process of reform diagnosis by identifying reform priorities based on an
              Outcome-Led Analytical approach. It allows you to explore the taxonomy of roles of
              public finance and PFM bottlenecks for different development outcomes, drawing on a
              body of examples compiled from research.
              The aim is to help you understand the logic of the approach and where to look when
              applying the outcome-led approach to PFM reform.
            </p>
          </div>

          {/* Get started + disclaimer — always visible, never scrolls away */}
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ flexShrink: 0, paddingBottom: '4px' }}
          >
            <p style={{ fontSize: 'clamp(11px, 0.8vw, 14px)', color: '#888', margin: 0, lineHeight: 1.5 }}>
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
                fontSize: 'clamp(13px, 1vw, 16px)',
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
