import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDoctorsOfDepartments } from "../state/reducers/userDataReducer";
import { Col, Container, Row } from "react-bootstrap";
import AlertMessage from "../Components/Alert/Alert";
import Card from "../Components/Cards/DoctorCard";
import Loader from "../Components/Loading/loader";
import AppointmentModal from "../Components/Modal/AppointmentModal";
import Axios from "../axios";

function BookAppointment() {
  const userData = useSelector((state) => state.usersData.data.doctors);
  const loading = useSelector((state) => state.usersData.loading);
  const error = useSelector((state) => state.usersData.error);
  const { id, departmentName } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDoctorsOfDepartments(id));
  }, [dispatch, id]);

  const userInfo = useSelector((state) => state.userLogin.data);
  //================ Appointment Settings ==============================
  const [show, setShow] = useState(false);
  const [ doctorData , setDoctor ] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [appointmentDetails, setDetails] = useState({});

  const errorProps = { variant: "danger", message: error };
  const cardProps = { setDoctor , setShow };
  const [success, setSuccess] = useState(false);
  const appointmentProps = {
    show,
    handleClose,
    setSuccess,
    doctorData,
    departmentName
  };
  const successProps = {
    variant: "success",
    message: "Successfully confirmed the booking",
  };

  return (
    <>
      <Container className="mt-5">
        {success ? <AlertMessage {...successProps} /> : ""}
        {show ? <AppointmentModal { ...appointmentProps } /> : ""}
        <h3 style={{ color: "#4D4C7D" }} className="text-center">
          {" "}
          {departmentName}{" "}
        </h3>
        {loading && <Loader />}
        {error && <AlertMessage {...errorProps} />}
        <Row className="g-2 mt-3">
          {userData ? (
            userData.map((data) => {
              return (
                <Col key={data._id} xs={12} md={4} lg={3}>
                  <Card {...data} {...cardProps} />
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
