import React, { useEffect,useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cancelAppointment, getActiveAppointments, setDataChange } from "../state/reducers/appointmentsReducer";
import AppointmentCard from "../Components/Cards/AppointmentCard";
import Loader from "../Components/Loading/loader";
import AlertMessage from "../Components/Alert/Alert";
import Confirm from '../Components/Modal/Confirm';

function Bookings() {
  const appointment = useSelector((state) => state.appointmentData);
  const { appointments, loading, error, dataChanged } = appointment;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActiveAppointments('active'));
  }, [dispatch]);

  //========= setting datachanged to false ======
  const [success , setSuccess] = useState(false);
  useEffect(()=>{
    if(dataChanged){
      setSuccess(true);
      dispatch(setDataChange());
    }
  },[dispatch,dataChanged])

  const errorProps = { variant : 'danger' , message : error }

  //================ confirm modal setup ==========

  const [ confirm , setConfirm ] = useState(false);
  const [ cancelId , setCancel ] = useState('');
  const showConfirm = () =>{
    setConfirm(true);
  }
  const hideConfirm = () => {
    setConfirm(false);
  }

  const cancel = (id) =>{
      setCancel(id);
      showConfirm();
  }

  const confirmAction = () => {

    hideConfirm();
    dispatch(cancelAppointment(cancelId));

  }

  const successProps = {
    variant: "success",
    message: "Successfully confirmed the booking",
  };
  const additionalProps = { cancel };
  const confirmProps = { confirm , showConfirm , hideConfirm , confirmAction , removal : 'appointment' , action : "cancel" }

  const noBookingProps = { variant : 'danger' , message : 'No bookings found' };

  return (
    <>
      <Container>
        <Confirm {...confirmProps} />
        <h3 style={{ color: "#4D4C7D" }} className="text-center" > Bookings </h3>
        { success && <AlertMessage {...successProps} /> }
        { error && <AlertMessage {...errorProps} /> }
        { loading && <Loader /> }
        <Row className="mt-5">
          { appointments.length > 0 ? appointments.map((data) => {
            return (
              <Col className="me-4" key={ data._id } xs={12} md={4} lg={3} >
                <AppointmentCard { ...data }{ ...additionalProps } />
              </Col>
            );
          }) : 
          <AlertMessage {...noBookingProps} />
        }
        </Row>
      </Container>
    </>
  );
}

export default Bookings;
