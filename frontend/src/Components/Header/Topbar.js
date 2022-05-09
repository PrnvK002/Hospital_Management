import React from "react";
import { Container, Nav, Navbar, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Brand from "../../Assets/brand_logo.png";

function Topbar(props) {
  const userInfo = props.data;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const logout = () => {
    dispatch({
      type: "logout",
    });
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img src={Brand} alt="logo" width="100rem" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {Object.keys(userInfo).length !== 0 ? (
                <Dropdown className="me-5">
                  <Dropdown.Toggle
                    id="dropdown-button-dark-example1"
                    style={{
                      background: "none",
                      color: "#112B3C",
                      outline: "none",
                    }}
                    variant="primary"
                  >
                    Profile <i className="bi bi-person"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item href="">{userInfo.email}</Dropdown.Item>
                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={() => logout()}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                // <button className="warning" onClick={() => navigate("/login")}>Check In</button>
                <Button
                  variant="success"
                  style={{ backgroundColor: "#112B3C", color: "white" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Topbar;
