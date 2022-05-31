import React from "react";
import { Container, Nav, Navbar} from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function DoctorNavbar() {
  const navigate = useNavigate();
  return (
    <Navbar style={{ backgroundColor : "#363062" }} >
      <Container>
        <Nav className="mx-auto">
          <Nav.Link className="text-white" onClick={()=>navigate('/')}>Home</Nav.Link>
          <Nav.Link className="text-white" onClick={()=>navigate('/dashboard')}>Dashboard</Nav.Link>
          <Nav.Link className="text-white" onClick={ ()=>navigate('/doctor/appointments') }>Appointments</Nav.Link>
          <Nav.Link className="text-white" onClick={ ()=>navigate('/doctor/chat') } >Messages</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default DoctorNavbar;
