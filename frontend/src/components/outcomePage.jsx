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
  "Healthy Lives": UniversalHealthCareImg,
  "Revenue": RevenueImg,
  "Outcome Combined": OutcomeCombinedImg,
  "Water": WaterImg
};

const COMBINED_KEY = 'Outcome Combined';

const outcomeList = [
  { title: 'Education', icon: EducationImg },
  { title: 'Economic Resilience', icon: EconomicResilienceImg },
  { title: 'Gender-Based Violence', icon: GenderBasedViolenceImg },
  { title: 'The Energy Transition', icon: RenewableEnergyImg },
  { title: 'Healthy Lives', icon: UniversalHealthCareImg },
  { title: 'Revenue', icon: RevenueImg },
  { title: COMBINED_KEY, icon: OutcomeCombinedImg },
];

function OutcomePage({frameworkData}) {
  const { outcome, setOutcome } = useContext(OutcomeContext);
  const isCombined = outcome === COMBINED_KEY;
  const outcome_name = OUTCOMES[outcome];
  const outcomeData = frameworkData[outcome_name] || {};
  const developmentOutcome = outcomeData['Development Outcome'] || '';

  // For combined view: build list of all single outcomes with their dev outcome text
  const singleOutcomes = outcomeList.filter(o => o.title !== COMBINED_KEY);

  return (
    <Container className="d-flex flex-column align-items-center py-4">

      {/* Step instruction text */}
      <div className="w-100 mb-4" style={{ maxWidth: '720px' }}>
        <div style={{
          borderLeft: '4px solid #2d7aaa',
          background: 'rgba(45,122,170,0.06)',
          borderRadius: '0 8px 8px 0',
          padding: '16px 20px',
        }}>
          <p style={{ margin: 0, marginBottom: '12px', color: '#0d2d4a', fontSize: '15px', fontWeight: '700', lineHeight: 1.5 }}>
            1.1 Select policy areas of focus and identify the reform authorizers and conveners required to secure the reform space and coordinate the reform process.
          </p>
          <p style={{ margin: 0, marginBottom: '10px', color: '#1a3a52', fontSize: '14px', lineHeight: 1.7 }}>
            First select a subset of policy objectives that the government wants to pursue, and that public finances can help achieve. This could be a single policy, or it could be a mix of 2–6 complementary and interrelated ones which combine both fiscal sustainability and sector delivery objectives.
          </p>
          <p style={{ margin: 0, marginBottom: '10px', color: '#1a3a52', fontSize: '14px', lineHeight: 1.7 }}>
            In doing so, identify and consult the main reform authorizers and convenors at the center of government who would be interested in and able to lead and coordinate reform efforts, and other stakeholders, from within and outside government, that could support the reform process.
          </p>
          <p style={{ margin: 0, color: '#2d7aaa', fontSize: '13px', fontWeight: '600', lineHeight: 1.6 }}>
            To proceed to the next step, select a specific policy area to explore illustrations and examples related to an outcome of interest or view the outcomes together.
          </p>
        </div>
      </div>

      {/* Prompt text */}
      <h4 className="mb-3 fw-semibold text-center" style={{ fontSize: '16px', color: '#2c3e50' }}>
        {outcome ? 'Development Outcome' : 'Select a Development Outcome to get started'}
      </h4>

      {/* Icon selection panel — always visible */}
      <Row className="justify-content-center g-2 w-100" style={{ maxWidth: '720px' }}>
        {outcomeList.map(({ title, icon }) => {
          const isSelected = outcome === title;
          return (
            <Col key={title} xs={6} sm={4} md={2} className="d-flex justify-content-center">
              <div
                onClick={() => setOutcome(title)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '10px 8px',
                  borderRadius: '10px',
                  border: isSelected ? '2px solid #2d7aaa' : '2px solid transparent',
                  background: isSelected ? 'rgba(45,122,170,0.10)' : 'transparent',
                  transition: 'border-color 0.2s ease, background 0.2s ease',
                  width: '100%',
                }}
                onMouseEnter={e => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = '#2d7aaa';
                    e.currentTarget.style.background = 'rgba(45,122,170,0.05)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <Image
                  src={icon}
                  alt={title}
                  style={{
                    width: '64px',
                    height: '64px',
                    objectFit: 'contain',
                    marginBottom: '6px',
                    opacity: outcome && !isSelected ? 0.45 : 1,
                    transition: 'opacity 0.2s ease',
                  }}
                />
                <span style={{
                  fontSize: '11px',
                  fontWeight: isSelected ? '700' : '500',
                  textAlign: 'center',
                  color: isSelected ? '#1a5f8a' : '#555',
                  lineHeight: 1.3,
                }}>
                  {title}
                </span>
              </div>
            </Col>
          );
        })}
      </Row>

      {/* Detail panel — visible only when an outcome is selected */}
      <p style={{ fontSize: '13px', color: '#444', lineHeight: 1.7, margin: '8px 0 4px 0', width: '100%', maxWidth: '720px', textAlign: 'left' }}>
        {isCombined
          ? 'To illustrate, the following development outcomes, which governments often pursue, were selected for investigation:'
          : 'To illustrate, the following development outcome, which governments often pursue, was selected for investigation:'}
      </p>
      {outcome && !isCombined && (
        <div className="w-100 mt-4" style={{ maxWidth: '720px' }}>
          <Card className="w-100 card-outcome">
            <Card.Body className="d-flex align-items-start gap-4 content-card">
              <div style={{ flexShrink: 0, width: '100px', height: '105px' }}>
                <Image
                  src={imageMap[outcome]}
                  alt={outcome}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div className="flex-grow-1">
                <h5 className="fw-bold mb-2" style={{ fontSize: '16px', color: '#0d2d4a' }}>
                  {outcome}
                </h5>
                <p className="mb-1" style={{ fontSize: '13px', color: '#444', lineHeight: 1.6 }}>
                  In {outcome}, the countries typically pursue the following development outcome:
                </p>
                <p className="mb-0" style={{ fontSize: '13px', fontWeight: '600', color: '#1a3a52', lineHeight: 1.6 }}>
                  {developmentOutcome}
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}

      {/* Combined detail panel — visible when Outcome Combined is selected */}
      {isCombined && (
        <div className="w-100 mt-4" style={{ maxWidth: '720px' }}>
          <div style={{
            background: '#fff',
            border: '1px solid #b8d9ee',
            borderRadius: '8px',
            padding: '16px 20px',
            marginBottom: '12px',
          }}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <Image
                src={OutcomeCombinedImg}
                alt="Combined"
                style={{ width: '56px', height: '56px', objectFit: 'contain', flexShrink: 0 }}
              />
              <div>
                <h5 className="fw-bold mb-1" style={{ fontSize: '16px', color: '#0d2d4a' }}>
                  All Outcomes Combined
                </h5>
                <p className="mb-0" style={{ fontSize: '13px', color: '#444', lineHeight: 1.5 }}>
                  Viewing all policy areas together. Subsequent steps will show data grouped by outcome.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {singleOutcomes.map(({ title, icon }) => {
                const name = OUTCOMES[title];
                const outcomeEntry = frameworkData[name] || {};
                const devOutcome = outcomeEntry['Development Outcome'] || '';
                const outcomeDesc = outcomeEntry['Outcome Description'] || '';
                return (
                  <div key={title} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '10px 12px',
                    background: 'rgba(45,122,170,0.04)',
                    borderRadius: '6px',
                    border: '1px solid #dce8f2',
                  }}>
                    <Image
                      src={icon}
                      alt={title}
                      style={{ width: '36px', height: '36px', objectFit: 'contain', flexShrink: 0, marginTop: '2px' }}
                    />
                    <div>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#0d2d4a' }}>{title}</p>
                      {outcomeDesc && (
                        <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#1a3a52', lineHeight: 1.5 }}>{outcomeDesc}</p>
                      )}
                      {devOutcome && (
                        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#444', lineHeight: 1.5 }}>{devOutcome}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </Container>
  );
}
OutcomePage.propTypes = {
  frameworkData: PropTypes.object.isRequired
};

export default OutcomePage;
