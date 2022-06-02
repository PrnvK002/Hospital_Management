import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



function StaffNavbar() {
  const navigate = useNavigate();
  return (
    <Navbar style={{background : "#363062"}} >
      <Container>
        <Nav className="mx-auto">
          <Nav.Link className="text-white" onClick={ ()=>navigate('/') } >Home</Nav.Link>
          <Nav.Link className="text-white" onClick={ ()=>navigate('/staff/appointments') } href="/staff/appointments">Appointments</Nav.Link>
          <Nav.Link className="text-white" onClick={ ()=>navigate('/staff/medicine') } >Medicines</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default StaffNavbar;
