import React from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { Container, Card, Image } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import OutcomeContext from "../OutcomeContext";
import { OUTCOMES } from "../constants";
import NoOutcomePrompt from "./noOutcomePrompt";
import { card } from "../theme";
import DefinitionBox from "./DefinitionBox";
import SectionLabel from "./SectionLabel";

import EducationImg          from '../assets/icon-education.png';
import EconomicResilienceImg from '../assets/icon-economic.png';
import GenderBasedViolenceImg from '../assets/icon-gender.png';
import RenewableEnergyImg    from '../assets/icon-energy.png';
import UniversalHealthCareImg from '../assets/icon-health.png';
import OutcomeCombinedImg    from '../assets/icon-combined.png';
import RevenueImg            from '../assets/icon-revenue.png';

const imageMap = {
  'Education':             EducationImg,
  'Economic Resilience':   EconomicResilienceImg,
  'Gender-Based Violence': GenderBasedViolenceImg,
  'The Energy Transition': RenewableEnergyImg,
  'Healthy Lives':         UniversalHealthCareImg,
  'Revenue':               RevenueImg,
  'Outcome Combined':      OutcomeCombinedImg,
};

const COMBINED_KEY = 'Outcome Combined';
const SINGLE_OUTCOMES = Object.entries(OUTCOMES).filter(([k]) => k !== COMBINED_KEY);

function PublicSectorResult({resultData, taxonomyGeneral, setSelectedItem}) {
    const { outcome } = useContext(OutcomeContext);
    const isCombined = outcome === COMBINED_KEY;
    const outcome_name = OUTCOMES[outcome];
    const outcomeData = (outcome_name && resultData[outcome_name]) || {};
    const publicSectorResult = outcomeData || undefined;
    const developmentOutcome = outcomeData['Development Outcome'] || '';

    const publicSectorResultsDef = taxonomyGeneral
        ?.find(r => r['Term'] === 'Public Sector Results')?.['Description'] || '';

    if (!outcome) return <NoOutcomePrompt setSelectedItem={setSelectedItem} />;

    return (
      <Container className="d-flex flex-column align-items-center py-4">

        {/* Step instruction text */}
        <div className="w-100 mb-3">
          <div style={card.instruction}>
            <p style={{ margin: 0, marginBottom: '12px', color: '#0d2d4a', fontSize: 'var(--fs-lg)', fontWeight: '700', lineHeight: 1.5 }}>
              1.2 Identify development outcomes and specific public sector results of focus in the chosen policy areas.
            </p>
            <p style={{ margin: 0, color: '#1a3a52', fontSize: 'var(--fs-md)', lineHeight: 1.7 }}>
              For the chosen policy area(s), next identify a development outcome and a subset of specific and key public sector results which contribute to it. The aim is to agree a scope which is both impactful and makes the reform diagnosis, design and implementation manageable and practical.
            </p>
          </div>
        </div>

        {/* Selected outcome intro + card — single mode only */}
        {!isCombined && (
          <p style={{ fontSize: 'var(--fs-base)', color: '#444', lineHeight: 1.7, margin: '0 0 12px 0', width: '100%' }}>
            To illustrate, the following development outcome, which governments often pursue, was selected for investigation:
          </p>
        )}
        {!isCombined && (
          <div className="w-100 mb-3">
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
                  <h5 className="fw-bold mb-2" style={{ fontSize: 'var(--fs-xl)', color: '#0d2d4a' }}>
                    {outcome}
                  </h5>
                  <p className="mb-1" style={{ fontSize: 'var(--fs-base)', color: '#444', lineHeight: 1.6 }}>
                    In {outcome}, the countries typically pursue the following development outcome:
                  </p>
                  <p className="mb-0" style={{ fontSize: 'var(--fs-base)', fontWeight: '600', color: '#1a3a52', lineHeight: 1.6 }}>
                    {developmentOutcome}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </div>
        )}

        {/* Definition box — combined view only; single view shows it inside the card */}
        {isCombined && publicSectorResultsDef && (
          <div className="w-100 mb-3">
            <SectionLabel text="Public Sector Results" style={{ margin: '0 0 6px 0' }} />
            <DefinitionBox definition={publicSectorResultsDef} />
          </div>
        )}

        {/* Intro sentence */}
        <p style={{ fontSize: 'var(--fs-base)', color: '#444', lineHeight: 1.7, margin: '0 0 16px 0', width: '100%', textAlign: 'left' }}>
          {isCombined
            ? 'The public sector results which contribute to the outcome were identified for each of these outcomes as follows:'
            : 'The public sector results which contribute to the outcome were identified as:'}
        </p>

        {/* Single outcome content card */}
        {!isCombined && (
          <div className="w-100">
            <Card className="w-100 card-result">
              <Card.Body className="content-card">
                <SectionLabel text="Public Sector Results" style={{ margin: '0 0 6px 0' }} />
                {publicSectorResultsDef && (
                  <DefinitionBox definition={publicSectorResultsDef} style={{ marginBottom: '12px' }} />
                )}
                <SectionLabel text="Example" style={{ margin: '0 0 6px 0' }} />
                <p style={{ fontSize: 'var(--fs-base)', lineHeight: 1.8, color: '#1a3a52', marginBottom: '0' }}>
                  {publicSectorResult && publicSectorResult['Public Sector Results']}
                </p>
              </Card.Body>
            </Card>
          </div>
        )}

        {/* Combined view: accordion per outcome */}
        {isCombined && (
          <div className="w-100">
            <Accordion>
              {SINGLE_OUTCOMES.map(([shortName, fullName], idx) => {
                const outcomeResult = resultData[fullName];
                return (
                  <Accordion.Item eventKey={idx.toString()} key={shortName}>
                    <Accordion.Button style={{ fontSize: 'var(--fs-base)', fontWeight: '600', color: '#0d2d4a' }}>
                      {shortName}
                    </Accordion.Button>
                    <Accordion.Body style={{ padding: 'clamp(8px, 0.7vw, 14px) clamp(10px, 0.9vw, 18px)' }}>
                      <SectionLabel text="Example" style={{ margin: '0 0 6px 0' }} />
                      <p style={{ fontSize: 'var(--fs-base)', lineHeight: 1.8, color: '#1a3a52', margin: 0 }}>
                        {outcomeResult?.['Public Sector Results'] || 'No data available.'}
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </div>
        )}

      </Container>
  );
}

PublicSectorResult.propTypes = {
    resultData: PropTypes.any,
    taxonomyGeneral: PropTypes.any,
    setSelectedItem: PropTypes.func,
}

export default PublicSectorResult;
