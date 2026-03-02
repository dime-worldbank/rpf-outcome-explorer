import React from "react";
import PropTypes from 'prop-types';
import ContentText from "./contentText";
import Accordion from 'react-bootstrap/Accordion';

function Bottlenecks({ selectedItem, bottleneckData, taxonomyBottlenecks }) {

  const data = bottleneckData[selectedItem] || [];
  const bottleneck_group = bottleneckData[selectedItem]?.name || '';
  const bottleneck_description = taxonomyBottlenecks?.[selectedItem]?.description || '';
  const SHOW_EVIDENCE = true;

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
            2.2 Identify the PFM bottlenecks which contribute to public sector challenges and prevent public finance from playing its role and prioritize them.
          </p>
          <p style={{ margin: 0, marginBottom: '10px', color: '#1a3a52', fontSize: '14px', lineHeight: 1.7 }}>
            The taxonomy of bottlenecks identifies eight common groups of bottlenecks which undermine the potential role of public finance across development outcomes. This can be used as a reference guide as to what to look for. Yet, the primary driver for their identification and prioritization must be your local context and their importance in contributing to public sector challenges you identify:
          </p>
          <p style={{ margin: 0, marginBottom: '10px', color: '#1a3a52', fontSize: '14px', lineHeight: 1.7 }}>
            First, start with the public sector challenges you identified and break them down into bottlenecks, identify those which relate to the management of public resources and to the interaction between public policy and public sector systems, and public finance.
          </p>
          <p style={{ margin: 0, marginBottom: '10px', color: '#1a3a52', fontSize: '14px', lineHeight: 1.7 }}>
            Second, prioritize the resulting PFM bottlenecks in terms of the degree to which: a) they impact on the identified public sector challenges and delivery of public sector results; b) they are common across multiple sectors and affect multiple beneficiary and user groups; and c) the feasibility of addressing them. The fewer the bottlenecks identified, the better; in any case, the target should typically be below 10 overall and 5 for an outcome.
          </p>
          <p style={{ margin: 0, marginBottom: '10px', color: '#1a3a52', fontSize: '14px', lineHeight: 1.7 }}>
            The result of this process is a limited set of the most important and specific PFM bottlenecks that are critical to the public sector challenges.
          </p>
          <p style={{ margin: 0, color: '#2d7aaa', fontSize: '13px', fontWeight: '600', lineHeight: 1.6 }}>
            Click on a bottleneck group in the diagram on the left to see illustrations and examples for each bottleneck.
          </p>
        </div>
      </div>

      {/* Selected bottleneck card */}
      {bottleneck_group && (
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
            <p style={{ fontSize: '14px', fontWeight: '700', color: '#0d2d4a', margin: '0 0 8px 0' }}>{bottleneck_group}</p>
            {bottleneck_description && (
              <p style={{ fontSize: '13px', color: '#1a3a52', lineHeight: 1.7, margin: 0 }}>{bottleneck_description}</p>
            )}
          </div>
        </div>
      )}

      {/* Accordion examples */}
      <div className="w-100" style={{ maxWidth: '720px' }} key={selectedItem}>
        <p style={{ fontSize: '13px', color: '#444', lineHeight: 1.7, marginBottom: '10px' }}>
          {Object.keys(data).length > 0
            ? "Within this, the following bottlenecks contribute to public sector challenges and constrain the achievement of public sector results. (Click for country examples.)"
            : "No relevant examples to display."}
        </p>
        <Accordion className="mb-3">
          {Object.keys(data).map((bottleneckName, index) => {
            if (bottleneckName === 'name' || bottleneckName === 'lessons') return null;
            const subData = data[bottleneckName] || [];
            const sub_name = data[bottleneckName]?.['name'] || '';
            return (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Button style={{ fontSize: '13px', fontWeight: '600', color: '#0d2d4a' }}>
                  {sub_name}
                </Accordion.Button>
                <Accordion.Body style={{ padding: '12px 16px' }}>
                  {(() => {
                    const dataItems = Object.keys(subData)
                      .filter(key => key !== 'name')
                      .map((bottleneck_outcome, idx) => {
                        const item = subData[bottleneck_outcome] || [];
                        if (item.length === 0) return null;
                        return (
                          <div key={idx} style={{ textAlign: 'left' }}>
                            {SHOW_EVIDENCE && item.map((example, i) => {
                              const exampleText = example["Description of  Examples of Sub-Bottlenecks"];
                              const exampleRef = example["References"];
                              const source = example["Source"];
                              return (
                                <ContentText example={exampleText} exampleRef={exampleRef} source={source} key={i} bottleneckName={bottleneck_outcome} />
                              );
                            })}
                          </div>
                        );
                      })
                      .filter(item => item !== null);
                    return dataItems.length === 0 ? <p style={{ fontSize: '13px', color: '#666' }}>No data to display.</p> : dataItems;
                  })()}
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>

        {/* Lessons from Outcome-Based Research — at the bottleneck group level */}
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

    </div>
  );
}

Bottlenecks.propTypes = {
  selectedItem: PropTypes.string.isRequired,
  bottleneckData: PropTypes.any,
  taxonomyBottlenecks: PropTypes.any,
};

export default Bottlenecks;
