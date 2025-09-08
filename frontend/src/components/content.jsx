import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import OutcomePage from './outcomePage';
import PublicSectorResult from './publicSectorResult';
import PolicyCapability from './policyCapability';
import ArrowNav from './arrowNav';
import OutcomeContext from '../OutcomeContext';
import Bottlenecks from './bottleneck';
import Roles from './role';
import {OUTCOMES} from "../constants"
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Content({selectedItem, setSelectedItem, contentRef}) {
    const { outcome } = useContext(OutcomeContext);
      const [data, setData] = useState({});
  
      useEffect(() => {
      async function fetchData() {
      try {
        const url = new URL(`${BASE_URL}/api/data`);
        const outcome_name = OUTCOMES[outcome]
        const params = {filter: outcome_name}
        url.search = new URLSearchParams(params).toString();

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        console.log(result);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const [frameworkData, setFrameworkData] = useState({});

  useEffect(() => {
  async function fetchData() {
  try {
    const url = new URL(`${BASE_URL}/api/framework`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    setFrameworkData(result);
    console.log(result);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
      }

      fetchData();
    }, []);

  const bottleneckData = data?.['Bottlenecks']
  const rolesData = data?.['Roles'];


  return (
    <div
      ref={contentRef}
      className="content"
      style={{
        height:'100%',
        minHeight: 0,
        background:'rgb(240, 240, 240)',
        padding:'0 20px',
        overflow: 'auto',
      }}
    >
      <ArrowNav selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      {selectedItem === 'results' && frameworkData && frameworkData['outcome-results'] && <PublicSectorResult resultData={frameworkData['outcome-results']} challengeData={frameworkData['Public Sector Challenges']} />}
      {selectedItem === 'outcome' && frameworkData && frameworkData['outcome-results'] &&<OutcomePage frameworkData={frameworkData['outcome-results']}/>}
      {selectedItem === 'policy' && frameworkData && frameworkData['outcome-results'] && <PolicyCapability frameworkData={frameworkData['outcome-results']} />}
      {selectedItem.startsWith('bottleneck') && bottleneckData && <Bottlenecks selectedItem={selectedItem} bottleneckData={bottleneckData}/>}
      {selectedItem.startsWith('role') && frameworkData && rolesData && <Roles selectedItem={selectedItem} rolesData={rolesData} rolesDescription={frameworkData['taxonomy-roles']} />}

    </div>
  );
}

Content.propTypes = {
    selectedItem : PropTypes.object.isRequired,
    setSelectedItem: PropTypes.func.isRequired,
    contentRef: PropTypes.object.isRequired
};

export default Content;
