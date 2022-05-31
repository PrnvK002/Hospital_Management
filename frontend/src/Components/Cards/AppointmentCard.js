import React from "react";
import { Button, Card } from "react-bootstrap";
import Moment from 'react-moment';

function AppointmentCard({ _id , doctor_id , date , token , cancel = null }) {

  return (
    <>
      <Card style={{ width: "18rem" }} className="text-center" >
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>{doctor_id.user_name}</Card.Title>
          <Card.Text style={{ minHeight:"4rem" }} >
            <p> Token Number : {token} </p>
            <p> date : <Moment format="YYYY/MM/DD" date ={date} /> </p>
            <p> Shift : {doctor_id.workShift} </p>
          </Card.Text>
          { cancel ? 
            <Button variant="danger" onClick={ ()=>{ cancel(_id) } } >Cancel Appointment</Button>
          : "" }
        </Card.Body>
      </Card>
    </>
  );
}

export default AppointmentCard;
