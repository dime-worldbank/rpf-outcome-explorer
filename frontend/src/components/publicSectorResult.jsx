import React from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { Container, Card } from 'react-bootstrap';
import OutcomeContext from "../OutcomeContext";
import { OUTCOMES } from "../constants";
import NoOutcomePrompt from "./noOutcomePrompt";

function PublicSectorResult({resultData, setSelectedItem}) {
    const { outcome } = useContext(OutcomeContext);
    const outcome_name = OUTCOMES[outcome];
    const publicSectorResult = (outcome_name && resultData[outcome_name]) || undefined;

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

        {/* Content card */}
        <div className="w-100" style={{ maxWidth: '720px' }}>
          <Card className="w-100 card-result">
            <Card.Body className="content-card">
              <p style={{ fontSize: '13px', color: '#444', lineHeight: 1.7, marginBottom: '12px' }}>
                The <strong style={{ color: '#0d2d4a' }}>public sector results</strong> which countries aim to deliver to achieve the outcome are:
              </p>
              <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#1a3a52', marginBottom: '0' }}>
                {publicSectorResult && publicSectorResult['Public Sector Results']}
              </p>
            </Card.Body>
          </Card>
        </div>

      </Container>
  );
}
PublicSectorResult.propTypes = {
    resultData: PropTypes.any,
    setSelectedItem: PropTypes.func,
}

export default PublicSectorResult;
