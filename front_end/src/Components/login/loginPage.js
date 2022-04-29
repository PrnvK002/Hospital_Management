import React, { useState , useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from "../../state/reducers/userReducer";

function Login() {
  
  const dispatch = useDispatch();

  const userInfo = useSelector(state => state.userLogin.data);
  const loading = useSelector( state => state.userLogin.loading );
  const error = useSelector(state => state.userLogin.error);

  const navigate = useNavigate();
  const [errorMessage, setError] = useState();

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

  useEffect(() => {
    userInfo ? navigate('/') : "" ;
  }, [userInfo])
  

  return (
    <div className="totalBody">
        <div className="boxLogin">
          {errorMessage && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1> Login Form </h1>
            <div className="input">
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
                  required: "email must be filled",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  }
                })}
              />

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
                  required: "password must be filled",
                  minLength: {
                    value: 6,
                    message: "Password must contain atlest 6 characters",
                  }
                })}
              />
            </div>

            <div className="submit">
              <button type="submit" className="submitButton">
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
            </div>
          </form>
        </div>
      </div>
  );
}

export default Login;
