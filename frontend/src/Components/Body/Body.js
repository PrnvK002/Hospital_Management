import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import Card from "../Cards/DepartmentCard";
import { Row, Col } from "react-bootstrap";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { getDepartments } from "../../state/reducers/departmentReducer";
import AppointmentCard from "../Cards/AppointmentCard";
import AlertMessage from "../Alert/Alert";
import Loading from "../Loading/loader";
import Sidebar from '../Offcanvas/Offcanvas';

import { getActiveAppointments } from "../../state/reducers/appointmentsReducer";
import { useNavigate } from "react-router-dom";
import Loader from "../Loading/loader";

function Body() {
  
  const [loginError, setError] = useState("");
  const departmentData = useSelector((state) => state.departmentData);
  const userInfo = useSelector((state)=> state.userLogin.data);
  const [ isUser , setUser ] = useState();
  const { departments, loading, error } = departmentData;
  const appointmentData = useSelector((state)=> state.appointmentData.appointments);
  const appointmentLoading = useSelector((state)=>state.appointmentData.loading);

  const noAppointmentProps = { variant : 'danger' , message : 'No Active Appointments Found' }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDepartments());
    if(Object.keys(userInfo).length > 0) dispatch(getActiveAppointments());
  }, [dispatch,userInfo]);

  useEffect(()=>{
    if(Object.keys(userInfo).length > 0){
      setUser(true);
    }else{
      setUser(false);
    }  
  },[userInfo])

  const alert = { vaiant: "danger", message: error };
  const props = { variant: "danger", message: "No data found" };
  const loginErrorProps = { variant: "danger", message: loginError };
  const cardProps = { setError };

  //============== Offcanvas setting ==================

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const offCanvasProps = { show , handleClose }

  return (
    <>
      <Row className='w-70 d-none d-md-block'>
        <Carousel />
      </Row>
      <div className="cardSection">
        <h3 style={{ color: "#4D4C7D" }} className="text-center" > Departments </h3>
        <Row className="g-2">
          {error && <AlertMessage {...alert} />}
          {loginError.length > 0 ? <AlertMessage {...loginErrorProps} /> : ""}
          {loading && <Loading />}
          {departments.length > 0 ? (
            departments.map((data) => {
              return (
                <Col key={data._id} xs={12} md={4} lg={3}>
                  <Card {...data} {...cardProps} />
                </Col>
              );
            })
          ) : (
            <AlertMessage {...props} />
          )}
        </Row>
        <Sidebar { ...offCanvasProps } />

            { isUser && <button
                className="ms-auto text-center vertical-center"
                style={{
                  position: "fixed",
                  bottom: "4rem",
                  right: "7rem",
                  borderRadius: "100%",
                  height: "3.5rem",
                  width: "3.5rem",
                  backgroundColor: "#363062",
                  border: "none",
                }}

                onClick={handleShow}
              >
                <i className="bi bi-chat-left-fill" style={{ color: "white" }}></i>
              </button>  }

      </div>
      {
        appointmentData.length > 0 ? 

            <Row className="my-3" >
              <h3 style={{ color: "#4D4C7D",cursor:'pointer' }} className="text-center" onClick={()=> navigate('/booking') } > Upcoming appointments </h3>
              {appointmentLoading && <Loader />}
                <div className="mt-3" >
                    { appointmentData.length > 0 ? 
                      appointmentData.map((data) => {
                          return (
                            <AppointmentCard key={data._id} { ...data } />
                          )
                      })
                      :
                          <AlertMessage {...noAppointmentProps} />  
                  }
                </div>
            </Row>

              :

              ""
      }
    </>
  );
}

export default Body;
