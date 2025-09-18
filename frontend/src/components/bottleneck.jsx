import React from "react";
import PropTypes from 'prop-types';
import ContentText from "./contentText";
import Accordion from 'react-bootstrap/Accordion';

function Bottlenecks({ selectedItem, bottleneckData }) {


  const data = bottleneckData[selectedItem] || [];
  const bottleneck_group = bottleneckData[selectedItem]?.name || '';
  const SHOW_EVIDENCE = process.env.REACT_APP_SHOW_EXAMPLES === 'True';
  const defaultActiveKey = Array.from({ length: 21 }, (_, i) => i.toString());
  return (
    <>
      {selectedItem && (
        <div className="container p-4 mb-4 border rounded shadow bg-white text-start container-bottleneck" >
          <p className="mb-2">The outcome-led framework then identifies nine common groups of bottlenecks which undermine the potential role of public finance across development outcomes.</p>
          <p className="mb-1">You have selected:</p>
          <p className="fw-bold">{bottleneck_group}</p>
        </div>
      )}

      <div className="pt-4">
        <div className="container text-start container-bottleneck">
          <p className="ps-2">Within this, the following bottlenecks contribute to public sector challenges and constrain the achievement of public sector results:</p>
            <Accordion alwaysOpen defaultActiveKey={defaultActiveKey} className="mb-4">
              {Object.keys(data).map((bottleneckName, index) => {
                if (bottleneckName === 'name') return null; // Skip the 'name' key
                const bottleneckData = data[bottleneckName] || [];
                const bottleneck_name = data[bottleneckName]?.['name'] || '';
                return (
                  <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header><p>{bottleneck_name}</p></Accordion.Header>
                    <Accordion.Body>
                      {Object.keys(bottleneckData).map((bottleneck_outcome, index) => {
                            const item = bottleneck_outcome !== 'name' ? bottleneckData[bottleneck_outcome] : [];
                        return (
                          item.length > 0 && <div key={index} style={{ padding: '10px', textAlign: 'left' }}>
                            <div style={{ width:'100%'}}>
                                <p><span>{bottleneck_outcome}</span></p>
                            </div>
                            {SHOW_EVIDENCE && <>
                            <div style={{ fontWeight: 'bold', paddingBottom: '10px' }}>Examples: </div> 
                            {
                              item.map((example, index) => {
                                const exampleText = example["Description of  Examples of Bottlenecks"];
                                const exampleRef = example["References"];
                                const source = example["Source"];
                                return (
                                  <ContentText example={exampleText} exampleRef={exampleRef} source={source} key={index} />
                                );
                              })
                            }</>}
                                                      </div>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>

        </div>
      </div>
    </>
  );
}

Bottlenecks.propTypes = {
  selectedItem: PropTypes.string.isRequired,
  data: PropTypes.any,
};

export default Bottlenecks;
