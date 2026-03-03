import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import OutcomePage from './outcomePage';
import PublicSectorResult from './publicSectorResult';
import PublicSectorChallenge from './publicSectorChallenge';
import PolicyCapability from './policyCapability';
import ArrowNav from './arrowNav';
import OutcomeContext from '../OutcomeContext';
import Bottlenecks from './bottleneck';
import Roles from './role';
import Closure from './closure';
import NoOutcomePrompt from './noOutcomePrompt';
import {OUTCOMES} from "../constants"
const BASE_URL = 'http://localhost:5000';
const COMBINED_KEY = 'Outcome Combined';

function Content({selectedItem, setSelectedItem, contentRef}) {
    const { outcome } = useContext(OutcomeContext);
      const [data, setData] = useState({});
  
      useEffect(() => {
      async function fetchData() {
      try {
        const url = new URL(`${BASE_URL}/api/data`);
        const filter_value = outcome === COMBINED_KEY ? '__all__' : OUTCOMES[outcome];
        const params = {filter: filter_value}
        url.search = new URLSearchParams(params).toString();

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [outcome]);

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

  } catch (error) {
    console.error('Error fetching data:', error);
  }
      }

      fetchData();
    }, []);

  const bottleneckData = data?.['Bottlenecks']
  const rolesData = data?.['Roles'];
  const isCombined = outcome === COMBINED_KEY;


  return (
    <div
      ref={contentRef}
      className="content"
      style={{
        background: 'rgb(240, 240, 240)',
        padding: '0 20px',
        minHeight: '100%',
      }}
    >
      <ArrowNav selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      {selectedItem === 'results' && frameworkData && frameworkData['outcome-results'] && <PublicSectorResult resultData={frameworkData['outcome-results']} setSelectedItem={setSelectedItem} />}
      {selectedItem === 'challenges' && frameworkData && frameworkData['Public Sector Challenges'] && <PublicSectorChallenge challengeData={frameworkData['Public Sector Challenges']} setSelectedItem={setSelectedItem} />}
      {selectedItem === 'outcome' && frameworkData && frameworkData['outcome-results'] &&<OutcomePage frameworkData={frameworkData['outcome-results']}/>}
      {selectedItem === 'policy' && frameworkData && frameworkData['outcome-results'] && <PolicyCapability frameworkData={frameworkData['outcome-results']} taxonomyGeneral={frameworkData['taxonomy-general']} setSelectedItem={setSelectedItem} />}
      {selectedItem.startsWith('bottleneck') && (!outcome ? <NoOutcomePrompt setSelectedItem={setSelectedItem} /> : bottleneckData && <Bottlenecks selectedItem={selectedItem} bottleneckData={bottleneckData} taxonomyBottlenecks={frameworkData?.['taxonomy-bottlenecks'] || {}} isCombined={isCombined}/>)}
      {selectedItem.startsWith('role') && (!outcome ? <NoOutcomePrompt setSelectedItem={setSelectedItem} /> : frameworkData && rolesData && <Roles selectedItem={selectedItem} rolesData={rolesData} rolesDescription={frameworkData['taxonomy-roles']} isCombined={isCombined}/>)}
      {selectedItem === 'closure' && (!outcome ? <NoOutcomePrompt setSelectedItem={setSelectedItem} /> : <Closure />)}

    </div>
  );
}

Content.propTypes = {
    selectedItem : PropTypes.object.isRequired,
    setSelectedItem: PropTypes.func.isRequired,
    contentRef: PropTypes.object.isRequired
};

export default Content;
