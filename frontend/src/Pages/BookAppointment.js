import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDoctorsOfDepartments } from "../state/reducers/userDataReducer";
import { Col, Container, Row } from "react-bootstrap";
import AlertMessage from "../Components/Alert/Alert";
import Card from "../Components/Cards/DoctorCard";
import Loader from "../Components/Loading/loader";
import AppointmentModal from "../Components/Modal/AppointmentModal";

function BookAppointment() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.usersData.data);
  const Loading = useSelector((state) => state.usersData.loading);
  const error = useSelector((state) => state.usersData.error);
  const appointmentData = useSelector((state)=>state.appointmentData);
  const { loading , dataChanged } = appointmentData;
  const { id, departmentName } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDoctorsOfDepartments(id));
  }, [dispatch, id]);

  //================ Appointment Settings ==============================
  const [show, setShow] = useState(false);
  const [ doctorData , setDoctor ] = useState({});
  const handleClose = () => setShow(false);

  const errorProps = { variant: "danger", message: error };
  const cardProps = { setDoctor , setShow };
  const appointmentProps = {
    show,
    handleClose,
    doctorData,
    departmentName
  };


  //============ on success routing to booking page ===========
  useEffect(()=>{
    if(dataChanged=== true){
      navigate('/booking');
    }
  },[dataChanged,navigate]);

  return (
    <>
      <Container className="mt-5">
        
        {show ? <AppointmentModal { ...appointmentProps } /> : ""}
        <h3 style={{ color: "#4D4C7D" }} className="text-center">
          {" "}
          {departmentName}{" "}
        </h3>
        {Loading && <Loader />}
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
