import React from "react";
import propTypes from "prop-types";
import { useContext } from "react";
import OutcomeContext from "../OutcomeContext";
import { Container, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { OUTCOMES } from "../constants";
import NoOutcomePrompt from "./noOutcomePrompt";

const COMBINED_KEY = 'Outcome Combined';
const SINGLE_OUTCOMES = Object.entries(OUTCOMES).filter(([k]) => k !== COMBINED_KEY);

function PolicyCapability({frameworkData, taxonomyGeneral, setSelectedItem}) {
    const { outcome } = useContext(OutcomeContext);
    const isCombined = outcome === COMBINED_KEY;
    const outcome_name = OUTCOMES[outcome];
    const policyData = (outcome_name && frameworkData[outcome_name]) || {};

    // Look up general definitions from taxonomy-general by Term
    const getDefinition = (term) => {
        if (!taxonomyGeneral) return null;
        const row = taxonomyGeneral.find(r => r['Term'] === term);
        return row ? row['Description'] : null;
    };
    const feasiblePolicyDef = getDefinition('Feasible Policy');
    const deliveryCapabilityDef = getDefinition('Delivery Capability');

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
              1.3 Map out the context and assess the delivery capability of government and feasibility of policy in relation to public sector results and policy objectives.
            </p>
            <p style={{ margin: 0, marginBottom: '12px', color: '#1a3a52', fontSize: '14px', lineHeight: 1.7 }}>
              First, understand how the government is set up to pursue the selected outcome. Set out the main features of the relevant public sector policies (whether sector-specific or cross-sectoral), and sector institutions, including the public and private sector delivery modalities and systems (for example, direct provision vs. funding and regulation, decentralization arrangements, digital systems etc.), and the organizations involved at all levels of government and outside it.
            </p>
            <p style={{ margin: 0, color: '#1a3a52', fontSize: '14px', lineHeight: 1.7 }}>
              Then review the feasibility of achieving a policy's stated objectives, from a technical, political and financial perspective. Assess the capability of the government to deliver policy and achieve results. Here the role of government and delivery models are important.
            </p>
          </div>
        </div>

        {/* Intro sentence — outcome name or plural depending on mode */}
        <p style={{ fontSize: '13px', color: '#444', lineHeight: 1.7, margin: '0 0 16px 0', width: '100%', maxWidth: '720px', textAlign: 'left' }}>
          {isCombined
            ? 'For example, the features of feasible policy and institutional capability for each of these outcomes include:'
            : `For example, the features of feasible policy and institutional capability for ${outcome_name} include:`}
        </p>

        {/* Single outcome view */}
        {!isCombined && (
          <>
            {/* Feasible Policy group */}
            <div className="w-100 mb-3" style={{ maxWidth: '720px' }}>
              <Card className="w-100 card-capability">
                <Card.Body className="content-card">
                  <p style={{ fontSize: '13px', fontWeight: '700', color: '#0d2d4a', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Feasible Policy
                  </p>
                  {feasiblePolicyDef && (
                    <div style={{
                      background: '#f5fafd',
                      border: '1px solid #b8d9ee',
                      borderRadius: '6px',
                      padding: '10px 14px',
                      marginBottom: '12px',
                    }}>
                      <p style={{ fontSize: '11px', fontWeight: '700', color: '#2d7aaa', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 4px 0' }}>Definition</p>
                      <p style={{ fontSize: '12px', color: '#1a3a52', lineHeight: 1.6, margin: 0 }}>{feasiblePolicyDef}</p>
                    </div>
                  )}
                  <p style={{ fontSize: '11px', fontWeight: '700', color: '#2d7aaa', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 6px 0' }}>
                    Example
                  </p>
                  <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#1a3a52', margin: 0 }}>
                    {policyData["Feasible Policy"]}
                  </p>
                </Card.Body>
              </Card>
            </div>

            {/* Delivery Capability group */}
            <div className="w-100" style={{ maxWidth: '720px' }}>
              <Card className="w-100 card-capability">
                <Card.Body className="content-card">
                  <p style={{ fontSize: '13px', fontWeight: '700', color: '#0d2d4a', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Delivery Capability
                  </p>
                  {deliveryCapabilityDef && (
                    <div style={{
                      background: '#f5fafd',
                      border: '1px solid #b8d9ee',
                      borderRadius: '6px',
                      padding: '10px 14px',
                      marginBottom: '12px',
                    }}>
                      <p style={{ fontSize: '11px', fontWeight: '700', color: '#2d7aaa', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 4px 0' }}>Definition</p>
                      <p style={{ fontSize: '12px', color: '#1a3a52', lineHeight: 1.6, margin: 0 }}>{deliveryCapabilityDef}</p>
                    </div>
                  )}
                  <p style={{ fontSize: '11px', fontWeight: '700', color: '#2d7aaa', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 6px 0' }}>
                    Example
                  </p>
                  <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#1a3a52', margin: 0 }}>
                    {policyData["Delivery Capability"]}
                  </p>
                </Card.Body>
              </Card>
            </div>
          </>
        )}

        {/* Combined view: two separate cards, each listing all outcomes with chip labels */}
        {isCombined && (
          <div className="w-100 d-flex flex-column gap-3" style={{ maxWidth: '720px' }}>

            {/* Feasible Policy card */}
            <Card className="w-100 card-capability">
              <Card.Body className="content-card">
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#0d2d4a', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Feasible Policy
                </p>
                {feasiblePolicyDef && (
                  <div style={{ background: '#f5fafd', border: '1px solid #b8d9ee', borderRadius: '6px', padding: '10px 14px', marginBottom: '14px' }}>
                    <p style={{ fontSize: '11px', fontWeight: '700', color: '#2d7aaa', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 4px 0' }}>Definition</p>
                    <p style={{ fontSize: '12px', color: '#1a3a52', lineHeight: 1.6, margin: 0 }}>{feasiblePolicyDef}</p>
                  </div>
                )}
                <p style={{ fontSize: '11px', fontWeight: '700', color: '#2d7aaa', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 10px 0' }}>
                  Examples
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {SINGLE_OUTCOMES.map(([shortName, fullName]) => {
                    const text = (frameworkData[fullName] || {})['Feasible Policy'];
                    if (!text) return null;
                    return (
                      <div key={shortName}>
                        <span style={{
                          display: 'inline-block', fontSize: '10px', fontWeight: '700',
                          color: '#fff', background: '#2d7aaa', borderRadius: '3px',
                          padding: '2px 7px', marginBottom: '4px', letterSpacing: '0.04em',
                        }}>
                          {shortName}
                        </span>
                        <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#1a3a52', margin: 0 }}>{text}</p>
                      </div>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>

            {/* Delivery Capability card */}
            <Card className="w-100 card-capability">
              <Card.Body className="content-card">
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#0d2d4a', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Delivery Capability
                </p>
                {deliveryCapabilityDef && (
                  <div style={{ background: '#f5fafd', border: '1px solid #b8d9ee', borderRadius: '6px', padding: '10px 14px', marginBottom: '14px' }}>
                    <p style={{ fontSize: '11px', fontWeight: '700', color: '#2d7aaa', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 4px 0' }}>Definition</p>
                    <p style={{ fontSize: '12px', color: '#1a3a52', lineHeight: 1.6, margin: 0 }}>{deliveryCapabilityDef}</p>
                  </div>
                )}
                <p style={{ fontSize: '11px', fontWeight: '700', color: '#2d7aaa', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 10px 0' }}>
                  Examples
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {SINGLE_OUTCOMES.map(([shortName, fullName]) => {
                    const text = (frameworkData[fullName] || {})['Delivery Capability'];
                    if (!text) return null;
                    return (
                      <div key={shortName}>
                        <span style={{
                          display: 'inline-block', fontSize: '10px', fontWeight: '700',
                          color: '#fff', background: '#2d7aaa', borderRadius: '3px',
                          padding: '2px 7px', marginBottom: '4px', letterSpacing: '0.04em',
                        }}>
                          {shortName}
                        </span>
                        <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#1a3a52', margin: 0 }}>{text}</p>
                      </div>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>

          </div>
        )}

      </Container>
    );
}

PolicyCapability.propTypes = {
    frameworkData: propTypes.any,
    taxonomyGeneral: propTypes.any,
    setSelectedItem: propTypes.func,
}
export default PolicyCapability;
