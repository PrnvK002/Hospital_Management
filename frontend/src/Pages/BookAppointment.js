import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDoctorsOfDepartments } from "../state/reducers/userDataReducer";
import { Col, Container, Row } from "react-bootstrap";
import AlertMessage from "../Components/Alert/Alert";
import Card from "../Components/Cards/DoctorCard";
import Loader from "../Components/Loading/loader";

function BookAppointment() {
  const userData = useSelector((state) => state.usersData.data.doctors);
  const loading = useSelector((state) => state.usersData.loading);
  const error = useSelector((state) => state.usersData.error);
  const { id, departmentName } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDoctorsOfDepartments(id));
  }, [dispatch, id]);

  const errorProps = { variant: "danger", message: error };

  return (
    <>
      <Container className="mt-5">
        <h3 style={{ color: "#4D4C7D" }} className = "text-center"> {departmentName} </h3>
        {loading && <Loader />}
        {error && <AlertMessage {...errorProps} />}
        <Row className="g-2 mt-3">
          {userData ? (
            userData.map((data) => {
              return (
                <Col xs={12} md={4} lg={3}>
                  <Card {...data} />
                </Col>
              );
            })
          ) : (
            <AlertMessage {...errorProps} />
          )}
        </Row>
      </Container>
    </>
  );
}

export default BookAppointment;
