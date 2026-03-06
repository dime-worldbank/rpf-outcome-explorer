import React from 'react';
import PropTypes from 'prop-types';
import OutcomeContext from '../OutcomeContext';
import { useContext } from 'react';
import { Container, Card, Image, Row, Col } from 'react-bootstrap';
import { card } from '../theme';
import OutcomeIconGrid from './OutcomeIconGrid';

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

function OutcomePage({frameworkData, setSelectedItem}) {
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
      <div className="w-100 mb-4">
        <div style={card.instruction}>
          <p style={{ margin: 0, marginBottom: '12px', color: '#0d2d4a', fontSize: 'var(--fs-lg)', fontWeight: '700', lineHeight: 1.5 }}>
            1.1 Select policy areas of focus and identify the reform authorizers and conveners required to secure the reform space and coordinate the reform process.
          </p>
          <p style={{ margin: 0, marginBottom: '10px', color: '#1a3a52', fontSize: 'var(--fs-md)', lineHeight: 1.7 }}>
            First select a subset of policy objectives that the government wants to pursue, and that public finances can help achieve. This could be a single policy, or it could be a mix of 2–6 complementary and interrelated ones which combine both fiscal sustainability and sector delivery objectives.
          </p>
          <p style={{ margin: 0, marginBottom: '10px', color: '#1a3a52', fontSize: 'var(--fs-md)', lineHeight: 1.7 }}>
            In doing so, identify and consult the main reform authorizers and convenors at the center of government who would be interested in and able to lead and coordinate reform efforts, and other stakeholders, from within and outside government, that could support the reform process.
          </p>
          <p style={{ margin: 0, color: '#2d7aaa', fontSize: 'var(--fs-base)', fontWeight: '600', lineHeight: 1.6 }}>
            To proceed to the next step, select a specific policy area to explore illustrations and examples related to an outcome of interest or view the outcomes together.
          </p>
        </div>
      </div>

      {/* Prompt text */}
      <h4 className="mb-3 fw-semibold text-center" style={{ fontSize: 'var(--fs-xl)', color: '#2c3e50' }}>
        Select a Development Outcome to get started
      </h4>

      {/* Icon selection panel — always visible */}
      <OutcomeIconGrid
        outcome={outcome}
        onSelect={(title) => { setOutcome(title); setSelectedItem('results'); }}
      />

      {/* Combined detail panel — visible when Outcome Combined is selected */}
      {isCombined && (
        <div className="w-100 mt-4">
          <div style={{ ...card.base, marginBottom: '12px' }}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <Image
                src={OutcomeCombinedImg}
                alt="Combined"
                style={{ width: 'clamp(44px, 4.5vw, 80px)', height: 'clamp(44px, 4.5vw, 80px)', objectFit: 'contain', flexShrink: 0 }}
              />
              <div>
                <h5 className="fw-bold mb-1" style={{ fontSize: 'var(--fs-xl)', color: '#0d2d4a' }}>
                  All Outcomes Combined
                </h5>
                <p className="mb-0" style={{ fontSize: 'var(--fs-base)', color: '#444', lineHeight: 1.5 }}>
                  Viewing all policy areas together. Subsequent steps will show data across all outcomes.
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
                    padding: 'clamp(8px, 0.6vw, 14px) clamp(10px, 0.8vw, 16px)',
                    background: 'rgba(45,122,170,0.04)',
                    borderRadius: '6px',
                    border: '1px solid #dce8f2',
                  }}>
                    <Image
                      src={icon}
                      alt={title}
                      style={{ width: 'clamp(28px, 3vw, 52px)', height: 'clamp(28px, 3vw, 52px)', objectFit: 'contain', flexShrink: 0, marginTop: '2px' }}
                    />
                    <div>
                      <p style={{ margin: 0, fontSize: 'var(--fs-base)', fontWeight: '700', color: '#0d2d4a' }}>{title}</p>
                      {outcomeDesc && (
                        <p style={{ margin: '3px 0 0 0', fontSize: 'var(--fs-sm)', color: '#1a3a52', lineHeight: 1.5 }}>{outcomeDesc}</p>
                      )}
                      {devOutcome && (
                        <p style={{ margin: '4px 0 0 0', fontSize: 'var(--fs-sm)', color: '#444', lineHeight: 1.5 }}>{devOutcome}</p>
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
  frameworkData: PropTypes.object.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default OutcomePage;
