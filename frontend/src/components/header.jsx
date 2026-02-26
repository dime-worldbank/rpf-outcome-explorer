import React from 'react';
import { useContext } from 'react';
import { FaHome } from "react-icons/fa";
import { Navbar, Container, Nav, Image, Dropdown } from 'react-bootstrap';
import OutcomeContext from '../OutcomeContext';
import EducationImg from '../assets/icon-education.png';
import EconomicResilienceImg from '../assets/icon-economic.png';
import GenderBasedViolenceImg from '../assets/icon-gender.png';
import RenewableEnergyImg from '../assets/icon-energy.png';
import UniversalHealthCareImg from '../assets/icon-health.png';
import RevenueImg from '../assets/icon-revenue.png';
import WaterImg from '../assets/icon-water.png';
import RPF_logo from '../assets/rpf_logo.png';
import '../custom.scss'
import {LOGO_URL} from '../constants'

const imageMap = {
  "Education": EducationImg,
  "Economic Resilience": EconomicResilienceImg,
  "Gender-Based Violence": GenderBasedViolenceImg,
  "The Energy Transition": RenewableEnergyImg,
  "Healthy Lives": UniversalHealthCareImg,
  "Revenue": RevenueImg,
  // "Water": WaterImg
};

function Header() {
  const { outcome, setOutcome } = useContext(OutcomeContext);

  return (
    <Navbar expand="lg" className="px-4 header-custom">
      <Container fluid className="position-relative">

        {/* Home icon — always on the left */}
        <Nav.Link
          onClick={() => setOutcome('')}
          className="text-white p-0 me-3"
          style={{ cursor: 'pointer', zIndex: 1 }}
          title="Go to home"
        >
          <FaHome size={28} />
        </Nav.Link>

        {/* Centred title or outcome dropdown */}
        <div
          className="position-absolute start-50 translate-middle-x d-flex justify-content-center align-items-center"
          style={{ pointerEvents: 'auto' }}
        >
          {outcome ? (
            <div className="d-flex align-items-center">
              <div
                className="bg-white rounded-circle overflow-hidden me-2"
                style={{ width: '36px', height: '36px', padding: '3px', flexShrink: 0 }}
              >
                <Image src={imageMap[outcome]} alt={outcome} fluid className="w-100" />
              </div>
              <Dropdown>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-basic"
                  className="d-flex align-items-center bg-transparent border-0 p-0"
                  style={{ boxShadow: 'none' }}
                >
                  <span className="text-white fw-bold fs-5">{outcome}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ minWidth: '300px', overflowY: 'auto' }}>
                  {Object.keys(imageMap).map((key) => (
                    <Dropdown.Item key={key} onClick={() => setOutcome(key)} className="d-flex">
                      <span>{key}</span>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <span className="fw-bold text-white fs-5">Outcome Explorer</span>
          )}
        </div>

        {/* Right spacer to balance the home icon */}
        <div className="ms-auto" style={{ width: '28px' }} />
      </Container>
    </Navbar>
  );
}

export default Header;
