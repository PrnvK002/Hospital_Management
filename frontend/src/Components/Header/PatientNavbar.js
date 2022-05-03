import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";


function PatientNavbar() {

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Nav className="mx-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#features">Booking</Nav.Link>
          <Nav.Link href="#pricing">History</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default PatientNavbar;
