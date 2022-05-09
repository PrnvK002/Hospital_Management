import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";


function PatientNavbar() {

  return (
    <Navbar style={{ backgroundColor : "#363062" }} >
      <Container>
        <Nav className="mx-auto text-white">
          <Nav.Link className="text-white" href="/">Home</Nav.Link>
          <Nav.Link className="text-white" href="#features">Booking</Nav.Link>
          <Nav.Link className="text-white" href="#pricing">History</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default PatientNavbar;
