import React, { useState, useRef, useEffect } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../axios";

function Signup() {
  const navigate = useNavigate();
  const [errorMessage, setError] = useState();

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

  //=====================================================

  const onSubmit = (data) => {
    console.log(data);
    api
      .post("/signup", { ...data })
      .then((response) => {
        if (response.data) {
         
          navigate("/login");

        } else {
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
            <h1> Signup Form </h1>
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

              {errors.phone && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.phone.message}
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

              <div>
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
            </div>
          </form>
        </div>
      </div>
  );
}

export default Signup;
