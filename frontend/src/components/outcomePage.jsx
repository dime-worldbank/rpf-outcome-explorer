import React from 'react';
import PropTypes from 'prop-types';
import OutcomeContext from '../OutcomeContext';
import { useContext } from 'react';
import { Container, Card, Image, Row, Col } from 'react-bootstrap';

import { OUTCOMES } from '../constants';
import EducationImg from '../assets/icon-education.png';
import EconomicResilienceImg from '../assets/icon-economic.png';
import GenderBasedViolenceImg from '../assets/icon-gender.png';
import RenewableEnergyImg from '../assets/icon-energy.png';
import UniversalHealthCareImg from '../assets/icon-health.png';
import OutcomeCombinedImg from '../assets/icon-combined.png';

import WaterImg from '../assets/icon-water.png';
import RevenueImg from '../assets/icon-revenue.png';

const imageMap = {
  "Education": EducationImg,
  "Economic Resilience": EconomicResilienceImg,
  "Gender-Based Violence": GenderBasedViolenceImg,
  "The Energy Transition": RenewableEnergyImg,
  "Universal Healthcare": UniversalHealthCareImg,
  "Revenue": RevenueImg,
  "Outcome Combined": OutcomeCombinedImg,
  "Water": WaterImg
};

function OutcomePage({frameworkData}) {
  const { outcome } = useContext(OutcomeContext);
  const outcome_name = OUTCOMES[outcome]
  const outcomeData = frameworkData[outcome_name] || {};
  const developmentOutcome = outcomeData['Development Outcome'] || '';

  return (
    <Container className="d-flex justify-content-center">
      {outcome && (
        <Card className="w-100 card-outcome">
          <Card.Body className="text-center content-card">
            <Card.Title as="h2" className="mb-4 fw-bold">
              {outcome}
            </Card.Title>

            <Row className="justify-content-center mb-4">
              <Col xs={6} md={4}>
                <div style={{
                  width: '180px',
                  height: '190px',
                  overflow: 'hidden',
                  margin: '0 auto'
                }}>
                  <Image
                    src={imageMap[outcome]}
                    alt={outcome}
                    fluid
                    style={{ width: '100%' }}
                  />
                </div>
              </Col>
            </Row>

            <Card.Text className="text-start text-outcome lh-lg">
              In {outcome}, the countries typically pursue the following development outcome:
              <p className="mt-3 " style={{ fontWeight: 'bold' }}>{developmentOutcome}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
OutcomePage.propTypes = {
  frameworkData: PropTypes.object.isRequired
};

export default OutcomePage;
