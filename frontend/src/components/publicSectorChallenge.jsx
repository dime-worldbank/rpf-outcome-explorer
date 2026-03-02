import React from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { Container, Card } from 'react-bootstrap';
import OutcomeContext from "../OutcomeContext";
import { OUTCOMES } from "../constants";
import NoOutcomePrompt from "./noOutcomePrompt";

function PublicSectorChallenge({ challengeData, setSelectedItem }) {
  const { outcome } = useContext(OutcomeContext);
  const outcome_name = OUTCOMES[outcome];
  const allChallenges = (outcome_name && challengeData[outcome_name]) || undefined;

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
            1.4 Set out the existing (or potential) public sector challenges.
          </p>
          <p style={{ margin: 0, marginBottom: '12px', color: '#1a3a52', fontSize: '14px', lineHeight: 1.7 }}>
            Next identify the main challenges in achieving the public sector results identified. This is best done in consultation with the leading public sector organizations in the sectors concerned with delivering them.
          </p>
          <p style={{ margin: 0, color: '#1a3a52', fontSize: '14px', lineHeight: 1.7 }}>
            The identification of these problems should start at the point of delivery, because that is where the consequences are felt most acutely. The point of delivery may be a school, medical facility, a tax office, or a utility provider. Seeking the perspective of service users and beneficiaries as well as frontline staff is important. It should then move upwards to the organizations which are responsible for the direct management and oversight of delivery functions – for example local authorities or deconcentrated units. It can then finally move to central ministries, departments and agencies and legislatures, where policy related challenges may be identified.
          </p>
        </div>
      </div>

      {/* Content card */}
      <div className="w-100" style={{ maxWidth: '720px' }}>
        <Card className="w-100 card-result">
          <Card.Body className="content-card">
            <p style={{ fontSize: '13px', color: '#444', lineHeight: 1.7, marginBottom: '12px' }}>
              To illustrate, public sector challenges for {outcome_name} are commonly faced by governments include:
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0 }}>
              {allChallenges && allChallenges.map((challenge, index) => (
                <li key={index} style={{ fontSize: '13px', lineHeight: 1.8, color: '#1a3a52', marginBottom: '12px' }}>
                  <strong style={{ color: '#0d2d4a' }}>{challenge['Public Sector Challenge']}</strong>
                  <br />
                  {challenge["Description"]}
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      </div>

    </Container>
  );
}

PublicSectorChallenge.propTypes = {
  challengeData: PropTypes.any,
  setSelectedItem: PropTypes.func,
};

export default PublicSectorChallenge;
