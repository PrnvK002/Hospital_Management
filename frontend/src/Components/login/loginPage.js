import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../state/reducers/userReducer";
import { GoogleLogin } from "react-google-login";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Loader from "../Loading/loader";
import LoginImage from "../../Assets/background/login_side.svg";

function Login() {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userLogin.data);
  const loading = useSelector((state) => state.userLogin.loading);
  const error = useSelector((state) => state.userLogin.error);

  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  // ====================== Form submit section ===================
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginUser(data));
  };

  //=================== Google login =====================
  const responseGoogle = (response) => {
    setUserData(response.profileObj);
    if(Object.keys(response).length>0){
      handleShow();
    }
  };

  //========= React modal setup ===============
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const submitPassword = () => {
    if (password.length > 6) {
      handleClose();
      dispatch(loginUser({ email: userData.email, password: password }));
    }
    setPasswordErr("Password must contain atlest 7 characters");
  };

  //================ redirecting to home page ============
  useEffect(() => {
    
    if (Object.keys(userInfo).length !== 0) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <>
      <Container>
        {/* loading setup start */}

        {loading && <Loader />}

        {/* loading setup start */}

        {/* React Modal Setup start */}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Your Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {passwordErr ? (
              <p style={{ color: "red", fontSize: "10px" }}> {passwordErr} </p>
            ) : (
              ""
            )}
            <input
              type="password"
              className="inputLogin"
              placeholder="Enter your Password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={submitPassword}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        {/* React Modal Setup end */}
        <Row className = " mt-5 ">
          <Col className="text-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 style={{ color : "#4D4C7D" }}  > Check In </h1>
              <div className="">
                {error && (
                  <p style={{ color: "red", fontSize: "0.8rem" }}>{error}</p>
                )}
                {errors.email && (
                  <p style={{ color: "red", fontSize: "0.8rem" }}>
                    {errors.email.message}
                  </p>
                )}

                <input
                  type="email"
                  className="inputLogin mt-3"
                  placeholder="Enter your email Address"
                  name="email"
                  {...register("email", {
                    required: "email must be filled",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                />

                {errors.password && (
                  <p style={{ color: "red", fontSize: "0.8rem" }}>
                    {errors.password.message}
                  </p>
                )}

                <input
                  type="password"
                  className="inputLogin m-3"
                  placeholder="Enter the password"
                  name="password"
                  {...register("password", {
                    required: "password must be filled",
                    minLength: {
                      value: 6,
                      message: "Password must contain atlest 6 characters",
                    },
                  })}
                />
              </div>

              <div className="submit">
                <button type="submit" style={{backgroundColor:"#4D4C7D"}} className="submitButton">
                  {" "}
                  Login{" "}
                </button>
                <p
                  onClick={() => {
                    navigate("/signup");
                  }}
                  style={{ fontSize: "0.8rem", cursor: "pointer" }}
                >
                  Don't Have an Account ? Signup Now
                </p>
                <GoogleLogin
                  clientId="511456651501-fugmj6urs7bl4j0k02e6lcsvhkn16g8b.apps.googleusercontent.com"
                  buttonText="Login with google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </form>
          </Col>
          <Col className="d-sm-none d-md-block">
            <img src={LoginImage} alt="loading...." width="90%" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
