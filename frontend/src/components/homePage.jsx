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
import defaultVisual from '../assets/default-visual.svg';
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
                  src={defaultVisual}
                  alt="Five-step process diagram"
                  style={{ maxWidth: '280px', maxHeight: '220px', objectFit: 'contain' }}
                />
              </div>

              <Card.Text className="text-justify">
                This Outcome-Led PFM Reform Explorer takes you through the first two of the five
                steps — the process of reform diagnosis by identifying reform priorities based on an
                Outcome-Led Analytical approach. It allows you to explore the taxonomy of roles of
                public finance and PFM bottlenecks for different development outcomes, drawing on a
                body of examples compiled from research.
              </Card.Text>

              <Card.Text className="text-justify">
                First, select a development outcome below. Then explore the public sector context,
                the roles that public finance plays, and the bottlenecks that prevent it from doing so.
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

      {/* Outcome selection tiles */}
      <div className="px-3 pb-4">
        <p className="mb-3 mt-2">Select a development outcome below to start exploring:</p>
        <Row className="justify-content-center">
          {tiles.map((tile) => (
            <Col key={tile.title} xs={12} sm={6} md={4} lg={3} xl={2} className="mb-3">
              <Card
                className="h-100 text-center shadow-sm"
                style={{ cursor: 'pointer' }}
                onClick={() => handleNavigation(tile.title, tile.path)}
              >
                <Card.Body className="d-flex flex-column align-items-center justify-content-center p-2">
                  <Image src={tile.icon} alt={tile.title} fluid style={{ width: '180px', height: '150px', objectFit: 'contain' }} />
                  <Card.Text className="mt-2 mb-0 fw-semibold small">{tile.title}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

    </Container>
  );
}

export default HomePage;
