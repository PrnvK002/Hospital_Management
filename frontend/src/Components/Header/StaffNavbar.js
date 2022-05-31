import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";



function StaffNavbar() {

  return (
    <Navbar style={{background : "#363062"}} >
      <Container>
        <Nav className="mx-auto">
          <Nav.Link className="text-white" href="/">Home</Nav.Link>
          <Nav.Link className="text-white" href="/staff/appointments">Appointments</Nav.Link>
          <Nav.Link className="text-white" href="/staff/medicalReport">Medical Reports</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default StaffNavbar;
