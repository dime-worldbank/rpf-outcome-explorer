import React from "react";
import PropTypes from 'prop-types';
import ContentText from "./contentText";
import Accordion from 'react-bootstrap/Accordion';

function Roles({ selectedItem, rolesData, rolesDescription }) {


  const data = rolesData[selectedItem] || [];
  const role_name = rolesData[selectedItem]?.name || '';
  const SHOW_EVIDENCE = process.env.REACT_APP_SHOW_EXAMPLES === 'True';
    const handleClick = (event) =>  {
    event.stopPropagation();
    }
  return (
    <>
      {selectedItem && (
        <div className="container p-4 mb-4 border rounded shadow bg-white text-start  container-role" >
          <p className="mb-2">The outcome-led framework identifies four broad roles that public finance plays in the achievement of public sector results as it interacts with broader public policy and public sector institutions.'</p>
          <p className="mb-1">You have selected:</p>
          <p className="fw-bold">{role_name}</p>
          <p>{rolesDescription[selectedItem]?.["Role Description: Public Finance"]}</p>
        </div>
      )}

      <div className="pt-4  container-role">
        <div className="container text-start">
          <p className="ps-2">This <b>role</b> contributes to public sector results the sector outcome as follows:</p>
            <Accordion className="mb-4" >
              {Object.keys(data).map((roleName, index) => {
                if (roleName === 'name') return;
                const roleData = data[roleName] || [];
                const role_name = data[roleName]?.['name'] || '';
                return (
                  <Accordion.Item  disabled eventKey={undefined}>
                    <Accordion.Button disabled> <p>{role_name}</p></Accordion.Button>
                    {SHOW_EVIDENCE && <Accordion.Body>
                      {Object.keys(roleData).map((key, index) => {
                        if (key === 'name') return null;
                        const items = roleData[key] || [];
                        return items.map((item, index) => {
                            const title = item['Outcome role'];
                            const example = item["Description of  Examples where Roles have been played"];
                            const exampleRef = item["References"];
                            const source = item["Source"];
                        return (
                          <ContentText example={example} exampleRef={exampleRef} source={source} key={index} />
                        );})
                      })}
                    </Accordion.Body>}
                  </Accordion.Item>
                );
              })}
            </Accordion>

        </div>
      </div>
    </>
  );
}

Roles.propTypes = {
  selectedItem: PropTypes.string.isRequired,
  rolesData: PropTypes.any,
  rolesDescription: PropTypes.any
};

export default Roles;
