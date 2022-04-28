import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../axios";

function Login() {
  

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
    api
      .post("/login", { ...data })
      .then((response) => {
        console.log(response);
        if (response.data) {
          localStorage.setItem(
            `token+${response.data._id}`,
            "Bearer " + response.data.authToken
          );
          console.log("------------Not working------------");
          navigate("/");
        } else {
          console.log(response.data.error);
          setError(response.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
