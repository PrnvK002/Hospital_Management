import React, { useEffect } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Alert from "../Components/Alert/Alert";
import Loading from "../Components/Loading/loader";
import { addUserData, setDataChange } from "../state/reducers/userDataReducer";

function AddUser() {
  const departmentData = useSelector((state) => state.departmentData);
  const userData = useSelector((state) => state.usersData);
  const { loading, error, dataChanged } = userData;
  const { departments } = departmentData;
  const navigate = useNavigate();
  //====================== Validation ===========================
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //======================== Data submission ===================
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    dispatch(addUserData(data));
  };

  //==================== Success Props =========================

  const props = { vaiant: "success", message: "Successfully added user" };

  //========================= Redirecting to users ===============
  useEffect(() => {
    if (dataChanged === true) {
      dispatch(setDataChange());
      navigate("/admin/users");
    }
  }, [navigate, dataChanged, dispatch]);

  return (
    <>
      <Container className="w-50">
        <h3 className="text-center" style={{ color: "#4D4C7D" }}>
          ADD USER
        </h3>
        {dataChanged && <Alert {...props} />}
        {loading && <Loading />}
        <div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>{error}</p>
            )}
            {errors.email && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.email.message}
              </p>
            )}
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "email must be filled",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />
            </FloatingLabel>
            {errors.password && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.password.message}
              </p>
            )}
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "password must be filled",
                  minLength: {
                    value: 6,
                    message: "Password must contain atlest 6 characters",
                  },
                })}
              />
            </FloatingLabel>

            {errors.username && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.username.message}
              </p>
            )}
            <FloatingLabel
              controlId="floatingInput"
              label="User name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="User name"
                {...register("username", {
                  required: "Full name must be filled",
                })}
              />
            </FloatingLabel>
            {errors.phone && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.phone.message}
              </p>
            )}
            <FloatingLabel
              controlId="floatingInput"
              label="Phone"
              className="mb-3"
            >
              <Form.Control
                type="phone"
                placeholder="Phone"
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
            </FloatingLabel>
            <Row className="g-2 mb-3">
              {errors.age && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.age.message}
                </p>
              )}
              {errors.salary && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.salary.message}
                </p>
              )}
              
              <Col md>
                <FloatingLabel controlId="floatingInput" label="Age">
                  <Form.Control
                    type="number"
                    placeholder="Age"
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
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingInput" label="Salary">
                  <Form.Control
                    type="number"
                    placeholder="Salary"
                    {...register("salary", {
                      required: "salary Should be filled",
                    })}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="g-2">
            {errors.gender && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.gender.message}
                </p>
              )}
              {errors.role && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.role.message}
                </p>
              )}
              {errors.department && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.department.message}
                </p>
              )}
              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label="Gender">
                  <Form.Select
                    aria-label="Gender"
                    {...register("gender", {
                      required: "Gender should be filled",
                    })}
                  >
                    <option>Open this select menu</option>
                    <option value="Male">Male</option>
                    <option value="Female">Fe-male</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel
                  controlId="floatingSelectGrid"
                  label="Role of the user"
                >
                  <Form.Select
                    aria-label="Role"
                    {...register("role", {
                      required: "role should be filled",
                    })}
                  >
                    <option>Open this select menu</option>
                    <option value="doctor">Doctor</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel
                  controlId="floatingSelectGrid"
                  label="Department"
                >
                  <Form.Select
                    aria-label="Department"
                    {...register("department", {
                      required: "Department should be filled",
                    })}
                  >
                    <option>Open this select menu</option>
                    {departments.map((data) => {
                      return (
                        <option key={data._id} value={data._id}>
                          {data.departmentName}
                        </option>
                      );
                    })}
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="g-2 mt-3">
              
              <Col md>
                <FloatingLabel controlId="floatingInput" label="Qualification">
                  <Form.Control
                    type="text"
                    placeholder="Qualification"
                    {...register("qualification")}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingInput" label="Workshift">
                  <Form.Control
                    type="text"
                    placeholder="Work Shift"
                    {...register("workshift")}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Button type="submit" className="my-3 w-100">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default AddUser;
