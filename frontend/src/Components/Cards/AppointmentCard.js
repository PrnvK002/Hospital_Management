import React from "react";
import { Button, Card } from "react-bootstrap";

function AppointmentCard({ _id , doctor_id , date , token , cancelAppointment }) {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>{doctor_id.user_name}</Card.Title>
          <Card.Text>
            <p> Token Number : {token} </p>
            <p> date : {date} </p>
            <p> Shift : {doctor_id.workShift} </p>
          </Card.Text>
          <Button variant="danger" onClick={ ()=>{ cancelAppointment(_id) } } >Cancel Appointment</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default AppointmentCard;
