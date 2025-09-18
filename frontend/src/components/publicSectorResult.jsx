import React from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { Container, Card } from 'react-bootstrap';
import OutcomeContext from "../OutcomeContext";
import { OUTCOMES } from "../constants";

function PublicSectorResult({resultData, challengeData}) {
    const { outcome } = useContext(OutcomeContext);
    const outcome_name = OUTCOMES[outcome]
    const publicSectorResult = resultData[outcome_name] || undefined;
    const allChallenges = challengeData[outcome_name] || undefined;
    return (
      <Container className="d-flex justify-content-center">
        <Card className="w-100 h-50 card-result" >
          <Card.Body className="text-left content-card">
                <p style={{
                    textAlign: 'left', /* Align text to the left */
                    marginBottom: '20px'
                }}>The <b>public sector results</b> which countries aim to deliver to achieve the outcome are: </p>
                <p style={{
                    lineHeight: '1.8',
                    textAlign: 'left' /* Align text to the left */
                }}>{publicSectorResult && publicSectorResult['Public Sector Results']}</p>
                <p style={{
                    marginTop: '35px',
                    marginBottom: '25px',
                    textAlign: 'left' /* Align text to the left */
                }}>The main <b>public sector challenges</b> in delivering these public sector results typically include:</p>
                <ul style={{
                    listStyleType: 'disc',
                    paddingLeft: '20px',
                    lineHeight: '1.8',
                    textAlign: 'left' /* Align text to the left */
                }}>
                    {allChallenges && allChallenges.map((challenge, index) => (
                        <li key={index} style={{ marginBottom: '15px' }}>
                            <strong >{challenge['Public Sector Challenge']}</strong> <br/>{challenge["Description"]}
                            <br />
                            <em>Source: {challenge.source}</em>
                        </li>
                    ))}
                </ul>
          </Card.Body>
        </Card>
    </Container>
  );
}
PublicSectorResult.propTypes = {
    resultData: PropTypes.any,
    challengeData: PropTypes.any
}

export default PublicSectorResult;
