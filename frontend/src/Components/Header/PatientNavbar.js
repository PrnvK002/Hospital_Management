import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PatientNavbar() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userLogin.data);

  return (
    <Navbar style={{ backgroundColor: "#363062" }}>
      <Container>
        <Nav className="mx-auto text-white">
          <Nav.Link className="text-white" onClick={ ()=> navigate('/') }>
            Home
          </Nav.Link>
          {Object.keys(userInfo).length > 0 ? (
            <>
              <Nav.Link className="text-white" onClick={ ()=> navigate('/booking') }>
                Booking
              </Nav.Link>
              <Nav.Link className="text-white" onClick={ ()=> navigate('/history') } >
                History
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link className="text-white"  disabled>
                Booking
              </Nav.Link>
              <Nav.Link className="text-white" disabled>
                History
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
export default PatientNavbar;
