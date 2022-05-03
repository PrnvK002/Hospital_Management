import React from "react";
import { Container , Nav , Navbar } from "react-bootstrap";



function AdminNavbar() {

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Nav className="mx-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#features">User management</Nav.Link>
          <Nav.Link href="#pricing">Services</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
