import React from "react";
import PropTypes from 'prop-types';
import ContentText from "./contentText";
import Accordion from 'react-bootstrap/Accordion';

function Roles({ selectedItem, rolesData, rolesDescription }) {


  const data = rolesData[selectedItem] || [];
  const role_name = rolesData[selectedItem]?.name || '';
  const SHOW_EVIDENCE = true; // currently the posit variable addition is not working. Make this configurable as that is resolved
  return (
    <div className="d-flex flex-column align-items-center py-4">

      {/* Step instruction block */}
      <div className="w-100 mb-4" style={{ maxWidth: '720px' }}>
        <div style={{
          borderLeft: '4px solid #2d7aaa',
          background: 'rgba(45,122,170,0.06)',
          borderRadius: '0 8px 8px 0',
          padding: '16px 20px',
        }}>
          <p style={{ margin: 0, marginBottom: '12px', color: '#0d2d4a', fontSize: '15px', fontWeight: '700', lineHeight: 1.5 }}>
            2.1 Map out public finance policies and flows and assess the roles of public finance in achieving public sector results.
          </p>
          <p style={{ margin: 0, marginBottom: '10px', color: '#1a3a52', fontSize: '14px', lineHeight: 1.7 }}>
            This first involves setting out the fiscal policies and PFM systems and mapping out existing financial flows and organizations using PFM and sector diagnostics.
          </p>
          <p style={{ margin: 0, marginBottom: '10px', color: '#1a3a52', fontSize: '14px', lineHeight: 1.7 }}>
            The roles of public finance in supporting feasible policy and effective delivery should be appraised, working through the interactions between public policy and fiscal policy, fiscal policy and PFM, and PFM and institutions in the public sector.
          </p>
          <p style={{ margin: 0, marginBottom: '10px', color: '#1a3a52', fontSize: '14px', lineHeight: 1.7 }}>
            The outcome-led taxonomy identifies four broad roles that public finance plays in the achievement of public sector results as it interacts with broader public policy and public sector institutions. These can be used as a framing for elaborating these roles, based on the outcomes and sector context, including the nature of policy and delivery.
          </p>
          <p style={{ margin: 0, color: '#2d7aaa', fontSize: '13px', fontWeight: '600', lineHeight: 1.6 }}>
            Click on a role in the diagram on the left to see illustrations and examples for each role.
          </p>
        </div>
      </div>

      {/* Selected role card */}
      {role_name && (
        <div className="w-100 mb-3" style={{ maxWidth: '720px' }}>
          <div style={{
            background: '#fff',
            border: '1px solid #b8d9ee',
            borderRadius: '8px',
            padding: '14px 18px',
          }}>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', color: '#2d7aaa', textTransform: 'uppercase', margin: '0 0 6px 0' }}>
              You have selected
            </p>
            <p style={{ fontSize: '14px', fontWeight: '700', color: '#0d2d4a', margin: '0 0 8px 0' }}>{role_name}</p>
            <p style={{ fontSize: '13px', color: '#1a3a52', lineHeight: 1.7, margin: 0 }}>
              {rolesDescription[selectedItem]?.["Role Description: Public Finance"]}
            </p>
          </div>
        </div>
      )}

      {/* Accordion examples */}
      {role_name && (
        <div className="w-100" style={{ maxWidth: '720px' }}>
          <p style={{ fontSize: '13px', color: '#444', lineHeight: 1.7, marginBottom: '10px' }}>
              This role contributes to public sector results and outcomes as follows (Click for country examples):          </p>
          <Accordion className="mb-3">
            {Object.keys(data).map((roleName, index) => {
              if (roleName === 'name' || roleName === 'lessons') return null;
              const roleData = data[roleName] || [];
              const outcomeRoleName = data[roleName]?.['name'] || '';
              return (
                <Accordion.Item eventKey={index.toString()} key={index}>
                  <Accordion.Button style={{ fontSize: '13px', fontWeight: '600', color: '#0d2d4a' }}>
                    {outcomeRoleName}
                  </Accordion.Button>
                  {SHOW_EVIDENCE && (
                    <Accordion.Body style={{ padding: '12px 16px' }}>
                      {(roleData.examples || []).map((item, i) => {
                        const example = item["Description of  Examples where Roles have been played"];
                        const exampleRef = item["References"];
                        const source = item["Source"];
                        return (
                          <ContentText example={example} exampleRef={exampleRef} source={source} key={i} />
                        );
                      })}
                    </Accordion.Body>
                  )}
                </Accordion.Item>
              );
            })}
          </Accordion>

          {/* Lessons from Outcome-Based Research — at the role level, below the accordion */}
          {data.lessons && data.lessons.length > 0 && (
            <div className="mb-4" style={{
              background: 'rgba(45,122,170,0.06)',
              borderLeft: '3px solid #2d7aaa',
              borderRadius: '0 6px 6px 0',
              padding: '12px 16px',
            }}>
              <p style={{ fontSize: '11px', fontWeight: '700', color: '#2d7aaa', textTransform: 'uppercase', margin: '0 0 8px 0', letterSpacing: '0.07em' }}>
                The following lessons were learned from the research:
              </p>
              {data.lessons.map((lesson, li) => (
                <p key={li} style={{ fontSize: '12px', color: '#1a3a52', lineHeight: 1.7, margin: li < data.lessons.length - 1 ? '0 0 8px 0' : 0 }}>
                  {lesson}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}

Roles.propTypes = {
  selectedItem: PropTypes.string.isRequired,
  rolesData: PropTypes.any,
  rolesDescription: PropTypes.any
};

export default Roles;
