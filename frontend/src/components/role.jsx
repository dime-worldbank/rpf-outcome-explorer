import React from "react";
import PropTypes from 'prop-types';
import ContentText from "./contentText";
import Accordion from 'react-bootstrap/Accordion';
import { OUTCOMES } from "../constants";
import { card } from "../theme";
import DefinitionBox from "./DefinitionBox";
import OutcomeBadge from "./OutcomeBadge";
import SectionLabel from "./SectionLabel";

const COMBINED_KEY = 'Outcome Combined';
const SINGLE_OUTCOMES = Object.entries(OUTCOMES).filter(([k]) => k !== COMBINED_KEY);

function Roles({ selectedItem, rolesData, rolesDescription, isCombined }) {

  const data = rolesData[selectedItem] || [];
  const role_name = rolesData[selectedItem]?.name || '';
  const SHOW_EVIDENCE = true;

  return (
    <div className="d-flex flex-column align-items-center py-4">

      {/* Step instruction block */}
      <div className="w-100 mb-4">
        <div style={card.instruction}>
          <p style={{ margin: 0, marginBottom: '12px', color: '#0d2d4a', fontSize: 'var(--fs-lg)', fontWeight: '700', lineHeight: 1.5 }}>
            2.1 Map out public finance policies and flows and assess the roles of public finance in achieving public sector results.
          </p>
          <p style={{ margin: 0, marginBottom: '10px', color: '#1a3a52', fontSize: 'var(--fs-md)', lineHeight: 1.7 }}>
            This first involves setting out the fiscal policies and PFM systems and mapping out existing financial flows and organizations using PFM and sector diagnostics.
          </p>
          <p style={{ margin: 0, marginBottom: '10px', color: '#1a3a52', fontSize: 'var(--fs-md)', lineHeight: 1.7 }}>
            The roles of public finance in supporting feasible policy and effective delivery should be appraised, working through the interactions between public policy and fiscal policy, fiscal policy and PFM, and PFM and institutions in the public sector.
          </p>
          <p style={{ margin: 0, marginBottom: '10px', color: '#1a3a52', fontSize: 'var(--fs-md)', lineHeight: 1.7 }}>
            The outcome-led taxonomy identifies four broad roles that public finance plays in the achievement of public sector results as it interacts with broader public policy and public sector institutions. These can be used as a framing for elaborating these roles, based on the outcomes and sector context, including the nature of policy and delivery.
          </p>
          <p style={{ margin: 0, color: '#2d7aaa', fontSize: 'var(--fs-base)', fontWeight: '600', lineHeight: 1.6 }}>
            Click on a role in the diagram on the left to see illustrations and examples for each role.
          </p>
        </div>
      </div>

      {/* ── SINGLE OUTCOME VIEW ── */}
      {!isCombined && (
        <>
          {/* Selected role card */}
          {role_name && (
            <div className="w-100 mb-3">
              <div style={card.base}>
                <p style={{ fontSize: 'var(--fs-sm)', fontWeight: '700', letterSpacing: '0.08em', color: '#2d7aaa', textTransform: 'uppercase', margin: '0 0 6px 0' }}>
                  You have selected
                </p>
                <p style={{ fontSize: 'var(--fs-md)', fontWeight: '700', color: '#0d2d4a', margin: '0 0 10px 0' }}>{role_name}</p>
                <DefinitionBox definition={rolesDescription?.[selectedItem]?.["Role Description: Public Finance"]} />
              </div>
            </div>
          )}

          {/* Accordion examples */}
          {role_name && (
            <div className="w-100">
              <p style={{ fontSize: 'var(--fs-base)', color: '#444', lineHeight: 1.7, marginBottom: '10px' }}>
                  This role contributes to public sector results and outcomes as follows (Click for country examples):
              </p>
              <SectionLabel text="Examples" style={{ margin: '0 0 8px 0' }} />
              <Accordion className="mb-3">
                {Object.keys(data).map((roleName, index) => {
                  if (roleName === 'name' || roleName === 'lessons') return null;
                  const roleData = data[roleName] || [];
                  const outcomeRoleName = data[roleName]?.['name'] || '';
                  return (
                    <Accordion.Item eventKey={index.toString()} key={index}>
                      <Accordion.Button style={{ fontSize: 'var(--fs-base)', fontWeight: '600', color: '#0d2d4a' }}>
                        {outcomeRoleName}
                      </Accordion.Button>
                      {SHOW_EVIDENCE && (
                        <Accordion.Body style={{ padding: 'clamp(8px, 0.7vw, 14px) clamp(10px, 0.9vw, 18px)' }}>
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
                <div className="mb-4" style={card.lesson}>
                  <SectionLabel text="The following lessons were learned from the research:" style={{ margin: '0 0 8px 0' }} />
                  {data.lessons.map((lesson, li) => (
                    <p key={li} style={{ fontSize: 'var(--fs-sm)', color: '#1a3a52', lineHeight: 1.7, margin: li < data.lessons.length - 1 ? '0 0 8px 0' : 0 }}>
                      {lesson}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* ── COMBINED VIEW: same structure as single, examples/lessons tagged by outcome ── */}
      {isCombined && (() => {
        // Find role name from first outcome that has data for this selectedItem
        let roleName = '';
        for (const [, fullName] of SINGLE_OUTCOMES) {
          const n = rolesData[fullName]?.[selectedItem]?.name;
          if (n) { roleName = n; break; }
        }

        // Union of all sub-role keys across all outcomes
        const allSubKeys = [...new Set(
          SINGLE_OUTCOMES.flatMap(([, fullName]) =>
            Object.keys(rolesData[fullName]?.[selectedItem] || {}).filter(k => k !== 'name' && k !== 'lessons')
          )
        )];

        return (
          <div className="w-100">
            {/* Selected role card — same as single */}
            {roleName && (
              <div className="w-100 mb-3">
                <div style={card.base}>
                  <p style={{ fontSize: 'var(--fs-sm)', fontWeight: '700', letterSpacing: '0.08em', color: '#2d7aaa', textTransform: 'uppercase', margin: '0 0 6px 0' }}>
                    You have selected
                  </p>
                  <p style={{ fontSize: 'var(--fs-md)', fontWeight: '700', color: '#0d2d4a', margin: '0 0 10px 0' }}>{roleName}</p>
                  <DefinitionBox definition={rolesDescription?.[selectedItem]?.["Role Description: Public Finance"]} />
                </div>
              </div>
            )}

            {roleName && (
              <>
                <p style={{ fontSize: 'var(--fs-base)', color: '#444', lineHeight: 1.7, marginBottom: '10px' }}>
                  This role contributes to public sector results and outcomes as follows (Click for country examples):
                </p>
                <SectionLabel text="Examples" style={{ margin: '0 0 8px 0' }} />
                <Accordion className="mb-3">
                  {allSubKeys.map((roleKey, index) => {
                    // Sub-role name + which outcome owns this key
                    let subRoleName = roleKey;
                    let ownerOutcome = '';
                    for (const [shortName, fullName] of SINGLE_OUTCOMES) {
                      const n = rolesData[fullName]?.[selectedItem]?.[roleKey]?.name;
                      if (n) { subRoleName = n; ownerOutcome = shortName; break; }
                    }

                    const allExamples = SINGLE_OUTCOMES.flatMap(([, fullName]) => {
                      return rolesData[fullName]?.[selectedItem]?.[roleKey]?.examples || [];
                    });

                    if (allExamples.length === 0) return null;

                    return (
                      <Accordion.Item eventKey={index.toString()} key={roleKey}>
                        <Accordion.Button style={{ fontSize: 'var(--fs-base)', fontWeight: '600', color: '#0d2d4a', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                          {ownerOutcome && (
                            <OutcomeBadge label={ownerOutcome} />
                          )}
                          {subRoleName}
                        </Accordion.Button>
                        {SHOW_EVIDENCE && (
                          <Accordion.Body style={{ padding: 'clamp(8px, 0.7vw, 14px) clamp(10px, 0.9vw, 18px)' }}>
                            {allExamples.map((item, i) => {
                              const example = item["Description of  Examples where Roles have been played"];
                              const exampleRef = item["References"];
                              const source = item["Source"];
                              return <ContentText key={i} example={example} exampleRef={exampleRef} source={source} />;
                            })}
                          </Accordion.Body>
                        )}
                      </Accordion.Item>
                    );
                  }).filter(Boolean)}
                </Accordion>

                {/* Lessons — flat list with outcome label, same style as single */}
                {(() => {
                  const allLessons = SINGLE_OUTCOMES.flatMap(([shortName, fullName]) => {
                    const lessons = rolesData[fullName]?.[selectedItem]?.lessons || [];
                    return lessons.map(lesson => ({ lesson, outcomeName: shortName }));
                  });
                  if (allLessons.length === 0) return null;
                  return (
                    <div className="mb-4" style={card.lesson}>
                      <SectionLabel text="The following lessons were learned from the research:" style={{ margin: '0 0 8px 0' }} />
                      {allLessons.map(({ lesson, outcomeName }, i) => (
                        <div key={i} style={{ marginBottom: i < allLessons.length - 1 ? '10px' : 0 }}>
                          <OutcomeBadge label={outcomeName} style={{ marginBottom: '4px' }} />
                          <p style={{ fontSize: 'var(--fs-sm)', color: '#1a3a52', lineHeight: 1.7, margin: 0 }}>{lesson}</p>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </>
            )}
          </div>
        );
      })()}

    </div>
  );
}

Roles.propTypes = {
  selectedItem: PropTypes.string.isRequired,
  rolesData: PropTypes.any,
  rolesDescription: PropTypes.any,
  isCombined: PropTypes.bool,
};

export default Roles;
