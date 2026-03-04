import React from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { Container, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import OutcomeContext from "../OutcomeContext";
import { OUTCOMES } from "../constants";
import NoOutcomePrompt from "./noOutcomePrompt";

const COMBINED_KEY = 'Outcome Combined';
const SINGLE_OUTCOMES = Object.entries(OUTCOMES).filter(([k]) => k !== COMBINED_KEY);

function PublicSectorResult({resultData, taxonomyGeneral, setSelectedItem}) {
    const { outcome } = useContext(OutcomeContext);
    const isCombined = outcome === COMBINED_KEY;
    const outcome_name = OUTCOMES[outcome];
    const publicSectorResult = (outcome_name && resultData[outcome_name]) || undefined;

    const publicSectorResultsDef = taxonomyGeneral
        ?.find(r => r['Term'] === 'Public Sector Results')?.['Description'] || '';

    if (!outcome) return <NoOutcomePrompt setSelectedItem={setSelectedItem} />;

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
              1.2 Identify development outcomes and specific public sector results of focus in the chosen policy areas.
            </p>
            <p style={{ margin: 0, marginBottom: '0', color: '#1a3a52', fontSize: '14px', lineHeight: 1.7 }}>
              For the chosen policy area(s), next identify a development outcome and a subset of specific and key public sector results which contribute to it. The aim is to agree a scope which is both impactful and makes the reform diagnosis, design and implementation manageable and practical.
            </p>
          </div>
        </div>

        {/* Definition box — combined view only; single view shows it inside the card */}
        {isCombined && publicSectorResultsDef && (
          <div className="w-100 mb-3" style={{ maxWidth: '720px' }}>
            <p style={{ fontSize: '13px', fontWeight: '700', color: '#0d2d4a', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Public Sector Results
            </p>
            <div style={{ background: '#f5fafd', border: '1px solid #b8d9ee', borderRadius: '6px', padding: '10px 14px' }}>
              <p style={{ fontSize: '11px', fontWeight: '700', color: '#2d7aaa', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 4px 0' }}>Definition</p>
              <p style={{ fontSize: '12px', color: '#1a3a52', lineHeight: 1.6, margin: 0 }}>{publicSectorResultsDef}</p>
            </div>
          </div>
        )}

        {/* Intro sentence — singular or plural depending on mode */}
        <p style={{ fontSize: '13px', color: '#444', lineHeight: 1.7, margin: '0 0 16px 0', width: '100%', maxWidth: '720px', textAlign: 'left' }}>
          {isCombined
            ? 'The public sector results which contribute to the outcome were identified for each of these outcomes as follows:'
            : 'The public sector results which contribute to the outcome were identified as:'}
        </p>

        {/* Single outcome content card */}
        {!isCombined && (
          <div className="w-100" style={{ maxWidth: '720px' }}>
            <Card className="w-100 card-result">
              <Card.Body className="content-card">
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#0d2d4a', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Public Sector Results
                </p>
                {publicSectorResultsDef && (
                  <div style={{ background: '#f5fafd', border: '1px solid #b8d9ee', borderRadius: '6px', padding: '10px 14px', marginBottom: '12px' }}>
                    <p style={{ fontSize: '11px', fontWeight: '700', color: '#2d7aaa', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 4px 0' }}>Definition</p>
                    <p style={{ fontSize: '12px', color: '#1a3a52', lineHeight: 1.6, margin: 0 }}>{publicSectorResultsDef}</p>
                  </div>
                )}
                <p style={{ fontSize: '11px', fontWeight: '700', color: '#2d7aaa', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 6px 0' }}>
                  Example
                </p>
                <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#1a3a52', marginBottom: '0' }}>
                  {publicSectorResult && publicSectorResult['Public Sector Results']}
                </p>
              </Card.Body>
            </Card>
          </div>
        )}

        {/* Combined view: accordion per outcome */}
        {isCombined && (
          <div className="w-100" style={{ maxWidth: '720px' }}>
            <Accordion>
              {SINGLE_OUTCOMES.map(([shortName, fullName], idx) => {
                const outcomeResult = resultData[fullName];
                return (
                  <Accordion.Item eventKey={idx.toString()} key={shortName}>
                    <Accordion.Button style={{ fontSize: '13px', fontWeight: '600', color: '#0d2d4a' }}>
                      {shortName}
                    </Accordion.Button>
                    <Accordion.Body style={{ padding: '12px 16px' }}>
                      <p style={{ fontSize: '11px', fontWeight: '700', color: '#2d7aaa', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 6px 0' }}>
                        Example
                      </p>
                      <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#1a3a52', margin: 0 }}>
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
