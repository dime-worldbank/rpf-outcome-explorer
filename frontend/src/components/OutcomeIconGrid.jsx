import React from 'react';
import PropTypes from 'prop-types';
import { Image, Row, Col } from 'react-bootstrap';

import EducationImg         from '../assets/icon-education.png';
import EconomicResilienceImg from '../assets/icon-economic.png';
import GenderBasedViolenceImg from '../assets/icon-gender.png';
import RenewableEnergyImg   from '../assets/icon-energy.png';
import UniversalHealthCareImg from '../assets/icon-health.png';
import OutcomeCombinedImg   from '../assets/icon-combined.png';
import WaterImg             from '../assets/icon-water.png';
import RevenueImg           from '../assets/icon-revenue.png';

const outcomeList = [
  { title: 'Education',             icon: EducationImg },
  { title: 'Economic Resilience',   icon: EconomicResilienceImg },
  { title: 'Gender-Based Violence', icon: GenderBasedViolenceImg },
  { title: 'The Energy Transition', icon: RenewableEnergyImg },
  { title: 'Healthy Lives',         icon: UniversalHealthCareImg },
  { title: 'Revenue',               icon: RevenueImg },
  { title: 'Outcome Combined',      icon: OutcomeCombinedImg },
];

/**
 * Reusable outcome icon selection grid.
 * @param {string}   outcome   — currently selected outcome key
 * @param {function} onSelect  — called with the outcome title when an icon is clicked
 */
function OutcomeIconGrid({ outcome, onSelect }) {
  return (
    <Row className="justify-content-center g-2 w-100">
      {outcomeList.map(({ title, icon }) => {
        const isSelected = outcome === title;
        return (
          <Col key={title} xs={6} sm={4} md={2} className="d-flex justify-content-center">
            <div
              onClick={() => onSelect(title)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                padding: 'clamp(8px, 0.8vw, 18px) clamp(6px, 0.6vw, 14px)',
                borderRadius: '10px',
                border: isSelected ? '2px solid #2d7aaa' : '2px solid transparent',
                background: isSelected ? 'rgba(45,122,170,0.10)' : 'transparent',
                transition: 'border-color 0.2s ease, background 0.2s ease',
                width: '100%',
              }}
              onMouseEnter={e => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#2d7aaa';
                  e.currentTarget.style.background = 'rgba(45,122,170,0.05)';
                }
              }}
              onMouseLeave={e => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <Image
                src={icon}
                alt={title}
                style={{
                  width: 'clamp(44px, 4.5vw, 80px)',
                  height: 'clamp(44px, 4.5vw, 80px)',
                  objectFit: 'contain',
                  marginBottom: 'clamp(4px, 0.5vw, 10px)',
                  opacity: outcome && !isSelected ? 0.45 : 1,
                  transition: 'opacity 0.2s ease',
                }}
              />
              <span style={{
                fontSize: 'clamp(11px, 0.9vw, 15px)',
                fontWeight: isSelected ? '700' : '500',
                textAlign: 'center',
                color: isSelected ? '#1a5f8a' : '#555',
                lineHeight: 1.3,
              }}>
                {title}
              </span>
            </div>
          </Col>
        );
      })}
    </Row>
  );
}

OutcomeIconGrid.propTypes = {
  outcome:  PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default OutcomeIconGrid;
