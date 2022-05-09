import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";



function StaffNavbar() {

  return (
    <Navbar bg="primary" style={{background : "#363062"}} variant="light">
      <Container>
        <Nav className="mx-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#features">Appointments</Nav.Link>
          <Nav.Link href="#pricing">History</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default StaffNavbar;
