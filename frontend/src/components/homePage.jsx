import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Container, Card, Image, Row, Col } from 'react-bootstrap';
import OutcomeContext from '../OutcomeContext';

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
import horizontalImg from '../assets/horizontal.png'
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
    { title: 'Universal Healthcare', icon: UniversalHealthCareImg, path: '/UniversalHealthCare' },
    // { title: 'Outcome Combined', icon: OutcomeCombinedImg, path: '/OutcomeCombined' },
    // { title: 'Water', icon: WaterImg, path: '/Water' },
    { title: 'Revenue', icon: RevenueImg, path: '/Revenue' },
  ];


  return (
    <Container fluid className="home-page bg-light  d-flex flex-row align-items-center" style={{minHeight: '92vh',overflowY: 'auto'}}>
      <Image src={frameworkImg} alt="framework" fluid className="mb-4 d-none d-md-block" style={{maxWidth: '30%', maxHeight: '95vh'}} />
      <Container className="d-flex flex-column align-items-center h-100">
      <Card className="w-100  mb-4 mt-4">
        <Card.Body>
          <Card.Text className="text-justify">
            <p></p>The outcome-led framework starts by identifying the development outcomes governments seek and then works backward to determine how public finance can contribute effectively to these goals. This visualization allows you to explore the framework and evidence collected from outcome studies.
          </Card.Text>

          <Card.Text as="div">
            First, select a development outcome below. Then explore the public sector context for achieving the development outcome:
            <ul>
              <li>
                A description of the policy outcome itself.
              </li>
              <li>
                The public sector results that contribute to the outcome and the public sector challenges that constrain countries from achieving them.
              </li>
              <li>
                The types of feasible policy and delivery capability needed to deliver the public sector results and overcome the challenges.
              </li>
            </ul>
          </Card.Text>

          <Card.Text as="div">
            Then explore the answers to the two questions posed by the outcome-led framework:
            <ul>
              <li>
                <i>What are the roles that public finance can play in achieving the outcome?</i><br/>
                Explore each of the four roles of public finance identified and country examples of these roles in practice.
              </li>
              <li>
                <i>What are the bottlenecks which prevent this from happening?</i><br/>
                Explore each of the nine public finance bottlenecks identified and country examples of these roles in practice.
              </li>
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>

      <p className="text-justify mb-3" >
        Select a development outcome below to start exploring:
      </p>

      <Row className="justify-content-center mb-4">
        {tiles.map((tile) => (
          <Col key={tile.title} xs={12} sm={6} md={4} lg={3} xl={2} className="mb-3">
            <Card
              className="h-100 text-center transition-all shadow-sm hover-shadow"
              onClick={() => handleNavigation(tile.title, tile.path)}
            >
              <Card.Body className="align-items-center p-2">
                <Image src={tile.icon} alt={tile.title} fluid style={{ width:'180px', height: '150px' }}/>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      </Container>
    </Container>
  );
}

export default HomePage;
