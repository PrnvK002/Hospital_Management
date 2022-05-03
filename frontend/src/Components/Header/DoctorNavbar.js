import React from "react";
import { Container, Nav, Navbar} from "react-bootstrap";


function DoctorNavbar() {
  
  return (
    <Navbar bg="primary" variant="dark">
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

export default DoctorNavbar;
