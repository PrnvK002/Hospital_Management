import React from "react";
import { Container , Nav , Navbar } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


function AdminNavbar() {
  const navigate = useNavigate();
  return (
    <Navbar style={{background : "#363062"}}>
      <Container>
        <Nav className="mx-auto">
          <Nav.Link className="text-white" onClick={ ()=>navigate('/') } >Home</Nav.Link>
          <Nav.Link className="text-white" onClick={ ()=>navigate('/admin/users') } >User management</Nav.Link>
          <Nav.Link className="text-white" onClick={ ()=>navigate('/admin/departments') } >Departments</Nav.Link>
          <Nav.Link className="text-white" onClick={ ()=>navigate('/admin/services') } >Services</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
