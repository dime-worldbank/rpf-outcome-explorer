import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Container, Card, Image, Row, Col, Button } from 'react-bootstrap';
import OutcomeContext from '../OutcomeContext';
import {LOGO_URL, FEEDBACK_URL} from '../constants'

// Import images
import EducationImg from '../assets/icon-education.png';
import EconomicResilienceImg from '../assets/icon-economic.png';
import GenderBasedViolenceImg from '../assets/icon-gender.png';
import RenewableEnergyImg from '../assets/icon-energy.png';
import UniversalHealthCareImg from '../assets/icon-health.png';
import OutcomeCombinedImg from '../assets/icon-combined.png';
import WaterImg from '../assets/icon-water.png';
import RevenueImg from '../assets/icon-revenue.png';
import frameworkImg from '../assets/vertical.svg';
import fivestepImg from '../assets/framwork.png';
import RPF_logo_black from '../assets/rpf_logo_black.png';

function HomePage() {
  const { setOutcome } = useContext(OutcomeContext);

  const handleNavigation = (newOutcome, path) => {
    setOutcome(newOutcome);
  };


  const tiles = [
    { title: 'Education', icon: EducationImg, path: '/Education' },
    { title: 'Economic Resilience', icon: EconomicResilienceImg, path: '/EconomicResilience' },
    { title: 'Gender-Based Violence', icon: GenderBasedViolenceImg, path: '/GenderBasedViolence' },
    { title: 'The Energy Transition', icon: RenewableEnergyImg, path: '/RenewableEnergy' },
    { title: 'Healthy Lives', icon: UniversalHealthCareImg, path: '/UniversalHealthCare' },
    // { title: 'Outcome Combined', icon: OutcomeCombinedImg, path: '/OutcomeCombined' },
    // { title: 'Water', icon: WaterImg, path: '/Water' },
    { title: 'Revenue', icon: RevenueImg, path: '/Revenue' },
  ];


  return (
    <Container fluid className="home-page bg-light d-flex flex-column" style={{ minHeight: '92vh', overflowY: 'auto' }}>

      {/* Page title */}
      <h2 className="text-center mt-4 mb-0 px-3">Welcome to the Outcome Explorer</h2>

      {/* Main two-column section */}
      <Row className="flex-grow-1 mx-0 mt-3 mb-2 align-items-stretch">

        {/* Left: framework diagram */}
        <Col xs={12} md={4} className="d-none d-md-flex justify-content-center align-items-center py-3">
          <Image
            src={frameworkImg}
            alt="Outcome-led PFM framework"
            fluid
            style={{ maxHeight: '75vh', objectFit: 'contain' }}
          />
        </Col>

        {/* Right: intro content card */}
        <Col xs={12} md={8} lg={7} className="d-flex flex-column justify-content-start py-3 pe-md-4">
          <Card className="shadow-sm border h-100">
            <Card.Body className="d-flex flex-column">

              {/* Get Started button — top of card */}
              <div className="d-flex justify-content-end mb-3">
                <button
                  onClick={() => setOutcome('Education')}
                  style={{
                    backgroundColor: '#2d7aaa',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '10px 24px',
                    fontSize: '14px',
                    fontWeight: '600',
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
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

              <Card.Text className="text-justify">
                The five-step process for outcome-led PFM reform is designed to support PFM reforms
                that more effectively advance development outcomes and public policy objectives. The aim
                is to provide a practical method for governments and other reform stakeholders to
                identify, prioritize, and address key PFM bottlenecks, and thereby enable public
                finance to play its roles in support of service delivery and development outcomes more
                effectively.
              </Card.Text>

              {/* Circular process diagram */}
              <div className="d-flex justify-content-center my-3">
                <Image
                  src={fivestepImg}
                  alt="Five-step process diagram"
                  style={{ maxWidth: '40vw', maxHeight: '40vh', objectFit: 'contain' }}
                />
              </div>

              <Card.Text className="text-justify">
                This Outcome-Led PFM Reform Explorer takes you through the first two of the five
                steps — the process of reform diagnosis by identifying reform priorities based on an
                Outcome-Led Analytical approach. It allows you to explore the taxonomy of roles of
                public finance and PFM bottlenecks for different development outcomes, drawing on a
                body of examples compiled from research.
                The aim is to help you to understand the logic of the approach and where to look when applying the outcome  led approach to PFM reform.
              </Card.Text>

              <p className="disclaimer mt-auto mb-0">
                Disclaimer: The information presented here is preliminary and illustrative.
                We welcome your feedback on the framework — you can provide it{' '}
                <a href={FEEDBACK_URL}>here</a>.
              </p>

            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
}

export default HomePage;
