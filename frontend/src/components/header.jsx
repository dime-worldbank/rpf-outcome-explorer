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

const imageMap = {
  "Education": EducationImg,
  "Economic Resilience": EconomicResilienceImg,
  "Gender-Based Violence": GenderBasedViolenceImg,
  "The Energy Transition": RenewableEnergyImg,
  "Universal Healthcare": UniversalHealthCareImg,
  "Revenue": RevenueImg,
  "Water": WaterImg
};

function Header() {
  const { outcome, setOutcome } = useContext(OutcomeContext);

  return (
    <Navbar expand="lg" className="px-4 header-custom">
      <Container fluid>
        <Navbar.Brand 
          to="/" 
          onClick={() => setOutcome('')}
          className="fw-bold fs-3 me-auto text-white text-decoration-none"
        >
          <Image src={RPF_logo} alt="RPF Logo" height="40" className="me-4" />
          Outcome Explorer
        </Navbar.Brand>

        {outcome && (
          <div className="d-flex justify-content-center align-items-center mx-auto">
            <div className="d-flex align-items-center">
                                <div
                    className="bg-white rounded-circle overflow-hidden me-3"
                    style={{ width: '40px', height: '40px', padding: '3px' }}>
                    <Image src={imageMap[outcome]} alt={outcome} fluid className="w-100" />
                  </div>
              <Dropdown>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-basic"
                  className="d-flex align-items-center bg-transparent border-0 p-0"
                  style={{ boxShadow: 'none' }}
                >
                   <span className="text-white fs-5">{outcome}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ minWidth: '200px', overflowY: 'auto' }}>
                  {Object.keys(imageMap).map((key) => (
                    <Dropdown.Item
                      key={key}
                      onClick={() => setOutcome(key)}
                      className="d-flex"
                    >
                      <span>{key}</span>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        )}

        <Nav className="ms-auto">
          {outcome !== "" && (
            <Nav.Link
              to="/"
              onClick={() => setOutcome('')}
              className="text-white p-0"
            >
              <FaHome size={24} />
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
