import React from 'react';
import { useContext } from 'react';
import { FaHome } from "react-icons/fa";
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import OutcomeContext from '../OutcomeContext';
import EducationImg from '../assets/icon-education.png';
import EconomicResilienceImg from '../assets/icon-economic.png';
import GenderBasedViolenceImg from '../assets/icon-gender.png';
import RenewableEnergyImg from '../assets/icon-energy.png';
import UniversalHealthCareImg from '../assets/icon-health.png';
import RPF_logo from '../assets/rpf_logo.png';
const imageMap = {
  "Education": EducationImg,
  "Economic Resilience": EconomicResilienceImg,
  "Gender-Based Violence": GenderBasedViolenceImg,
  "The Energy Transition": RenewableEnergyImg,
  "Universal Healthcare": UniversalHealthCareImg
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
              <span className="text-white fs-5">{outcome}</span>
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
