import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getActiveAppointments } from "../state/reducers/appointmentsReducer";
import AppointmentCard from "../Components/Cards/AppointmentCard";
import Loader from "../Components/Loading/loader";
import AlertMessage from "../Components/Alert/Alert";

function Bookings() {
  const appointment = useSelector((state) => state.appointmentData);
  const { appointments, loading, error, dataChanged } = appointment;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActiveAppointments());
  }, [dispatch , dataChanged]);

  const errorProps = { variant : 'danger' , message : error }

  return (
    <>
      <Container>
        <h3 style={{ color: "#4D4C7D" }}> Bookings </h3>
        { error && <AlertMessage {...errorProps} /> }
        { loading && <Loader /> }
        <Row>
          {appointments.map((data) => {
            return (
              <Col key={ data._id } xs={12} md={4} lg={3} >
                <AppointmentCard { ...data } />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Bookings;
