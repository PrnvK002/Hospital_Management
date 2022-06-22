import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, createUser, googleRegister } from "../../state/reducers/userReducer";
import singupImage from "../../Assets/background/signup_side.svg";
import AlertMessage from "../Alert/Alert";

function Signup() {
  const navigate = useNavigate();
  //====================== Validation ===========================
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ===================== useref settting ==============

  const inputRef = useRef();
  const { ref, ...rest } = register("username", {
    required: "Full name must be filled",
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //====================== Form submision ============================

  const dispatch = useDispatch();
  const [passwrdErr,setPassErr] = useState('');
  const onSubmit = (data) => {
    console.log(data);
    if(data.password === data.confirm_password ){
      dispatch(signupUser(data));
      handleShowOtp();
    }else{
      setPassErr('Passwords not matching');
    }
  };

  //=========== Google signup setup ====================
  const [userData, setUser] = useState();
  const [googleLogin,setGoogleLogin] = useState(false);
  const googleSuccess = (response) => {
    setUser(response.profileObj);
    setGoogleLogin(true);
    handleShow();
  };
  const googleFailure = (response) =>{
    console.log(response);
  }

  //========= React modal setup ===============
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //==============  Data submission for getting otp ==============
  const submitData = () => {
    if (password.length > 6 && phone.length === 10 && gender) {
      dispatch(
        signupUser({
          ...userData,
          password: password,
          phone: phone,
          gender: gender,
        })
      );
      handleClose();
      handleShowOtp();
    }
    setPasswordErr(
      "Password must contain atlest 7 characters and phone must contain 10 digits and gender is a must"
    );
  };

  //============ OTP section ======================

  const [otp, setOtp] = useState("");
  const [otpShow, setOtpShow] = useState(false);
  const [otpError, setOtpError] = useState("");
  const handleOtpClose = () => setOtpShow(false);
  const handleShowOtp = () => setOtpShow(true);

  const signupTemp = useSelector((state) => state.userLogin.signupTemp);
  const success = useSelector((state)=>state.userLogin.success);
  const err = useSelector((state)=>state.userLogin.error);

  const submitOtp = () => {
    if (otp === signupTemp.otp) {
      handleOtpClose();
      if(googleLogin === true ){
          dispatch(googleRegister(signupTemp))
      }else{
        console.log("signup temp",signupTemp);
        dispatch(createUser(signupTemp));
      }
    } else {
      setOtpError("Invalid OTP");
    }
  };

  //==== Success alert props =====
  const props = {
    variant: "success",
    message: "Successfully created the user",
  };

  //========= Redirect to login page on success ========
  useEffect(()=>{
    if(success === true){
      navigate('/login');
    }
  },[success,navigate])

  //========== Error props ======
  const errorProps = {
    variant : 'danger',
    message : err
  }

  //=============== Password not matching props =====

  const passwordProps = {
    variant : 'danger',
    message : passwrdErr
  }

  return (
    <>

      
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
            type="phone"
            className="inputLogin"
            placeholder="Enter your Phone"
            name="phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <input
            type="password"
            className="inputLogin"
            placeholder="Enter your Password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <div className="radio">
            <label className="mx-3">
              <input
                type="radio"
                value="Male"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
              Male
            </label>

            <label className="me-3">
              <input
                type="radio"
                value="Female"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
              Female
            </label>

            <label className="me-3">
              <input
                type="radio"
                value="Other"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
              Other
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitData}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* otp modal */}

      <Modal show={otpShow} onHide={handleOtpClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your otp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {otpError && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>{otpError}</p>
          )}
          <input
            type="number"
            className="inputLogin"
            placeholder="Enter your otp"
            name="otp"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOtpClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitOtp}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* React Modal Setup end */}
      <Row className="mt-5">
        <Col md className=" text-center  ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 style={{ color: "#4D4C7D" }}> Welcome To Our Family... </h1>
            {success && <AlertMessage {...props} />}
            { err && <AlertMessage { ...errorProps } /> }
            { passwordErr && <AlertMessage { ...passwordProps } /> }
            <div className="input">
              {errors.username && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.username.message}
                </p>
              )}
              <input
                type="text"
                className="inputLogin"
                placeholder="Enter your full name"
                name="username"
                {...rest}
                ref={(e) => {
                  ref(e);
                  inputRef.current = e;
                }}
              />

              {errors.email && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.email.message}
                </p>
              )}

              <input
                type="email"
                className="inputLogin"
                placeholder="Enter your email Address"
                name="email"
                {...register("email", {
                  required: "Email must be filled",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />

              {errors.phone && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.phone.message}
                </p>
              )}

              <input
                type="number"
                className="inputLogin"
                placeholder="Enter your phone"
                name="phone"
                {...register("phone", {
                  required: "Phone is required",
                  minLength: {
                    value: 10,
                    message: "phone must have length of 10",
                  },
                  maxLength: {
                    value: 10,
                    message: "phone must have length of 10",
                  },
                })}
              />

              {errors.age && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.age.message}
                </p>
              )}

              <input
                type="number"
                className="inputLogin"
                placeholder="Enter your age"
                name="age"
                {...register("age", {
                  required: "Age should be filled",
                  min: {
                    value: 18,
                    message: "Age should be atleast 18",
                  },
                  max: {
                    value: 99,
                    message: "Age cannot be longer than 99",
                  },
                })}
              />

              <div className="d-flex">
                <div className="me-2">
                  <input
                    type="radio"
                    className="genderSelector"
                    value="Male"
                    name="gender"
                    {...register("gender", {
                      required: "Gender should be filled",
                    })}
                  />{" "}
                  Male
                </div>
                <div className="me-2" >
                  <input
                    type="radio"
                    className="genderSelector"
                    value="Female"
                    name="gender"
                    {...register("gender", {
                      required: "Gender should be filled",
                    })}
                  />{" "}
                  Female
                </div>
                <div className="me-2">
                  <input
                    type="radio"
                    className="genderSelector"
                    value="Other"
                    name="gender"
                    {...register("gender", {
                      required: "Gender should be filled",
                    })}
                  />{" "}
                  Other
                </div>
              </div>

              {errors.password && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.password.message}
                </p>
              )}

              <input
                type="password"
                className="inputLogin"
                placeholder="Enter the password"
                name="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "password must contain atleast 6 characters",
                  },
                })}
              />

              {errors.confirmPassword && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.confirmPassword.message}
                </p>
              )}

              <input
                type="password"
                className="inputLogin"
                placeholder="Confirm the password"
                name="password"
                {...register("confirm_password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "password must contain atleast 6 characters",
                  },
                })}
              />
            </div>

            <div className="submit">
              <button type="submit" className="submitButton">
                {" "}
                Sign Up{" "}
              </button>
              <p
                onClick={() => {
                  navigate("/login");
                }}
                style={{ fontSize: "0.8rem", cursor: "pointer" }}
              >
                Already Have an Account ? Login Now
              </p>
              <GoogleLogin
                clientId="511456651501-fugmj6urs7bl4j0k02e6lcsvhkn16g8b.apps.googleusercontent.com"
                buttonText="Signup With Google"
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </form>
        </Col>
        <Col className="text-center d-sm-none d-md-block">
          <img src={singupImage} alt="loading..." width="90%" />
        </Col>
      </Row>
    </>
  );
}

export default Signup;
