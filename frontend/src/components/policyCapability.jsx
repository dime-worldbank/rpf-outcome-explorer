import React from "react";
import propTypes from "prop-types";
import { useContext } from "react";
import OutcomeContext from "../OutcomeContext";
import { Container, Card } from 'react-bootstrap';
import { OUTCOMES } from "../constants";

function PolicyCapability({frameworkData}) {
    const { outcome } = useContext(OutcomeContext);
    const outcome_name = OUTCOMES[outcome]
    const policyData = frameworkData[outcome_name] || {};
    return (
      <Container className="d-flex justify-content-center">
        <Card className="w-100 card-capability" style={{ maxWidth: '900px' }}>
          <Card.Body className="text-start">
                <p style={{
                    lineHeight: '1.8',
                    fontSize: '1.0rem',
                    textAlign: 'justify'
                }}>Making significant progress to deliver the policy outcome and public sector results demands a combination of both feasible policy and delivery capability.</p>
                <p style={{
                    marginTop: '35px',
                    marginBottom: '15px',
                }}><b>Feasible Policy: </b> {policyData["Feasible Policy"]}</p>

                <p style={{
                    marginTop: '35px',
                    marginBottom: '15px',
                }}><b>Delivery capability:</b> {policyData["Delivery Capability"]}</p>

          </Card.Body>
        </Card>
      </Container>
    );
}

PolicyCapability.propTypes = {
    frameworkData: propTypes.any
}
export default PolicyCapability;
