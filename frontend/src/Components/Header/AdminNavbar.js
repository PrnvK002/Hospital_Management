import React from "react";
import { Container , Nav , Navbar } from "react-bootstrap";



function AdminNavbar() {

  return (
    <Navbar style={{background : "#363062"}}>
      <Container>
        <Nav className="mx-auto">
          <Nav.Link className="text-white" href="/">Home</Nav.Link>
          <Nav.Link className="text-white" href="/admin/users">User management</Nav.Link>
          <Nav.Link className="text-white" href="/admin/departments">Departments</Nav.Link>
          <Nav.Link className="text-white" href="/admin/services">Services</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
