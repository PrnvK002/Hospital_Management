import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function DoctorCard(props) {
    const navigate = useNavigate()
    const {_id , user_name , image,qualification , workShift } = props;
  return (
    <>
        <Card style={{ width: "14rem",height:"22rem"}} className="align-items-center" >
        <Card.Img variant="top" src={image} style={{ width : "10rem" , height : "10rem" }} />
        <Card.Body>
          <Card.Title>{user_name}</Card.Title>
          <Card.Text style={{ fontSize : "14px" }}>
            {qualification}
          </Card.Text>
          <Card.Text style={{ fontSize : "14px" }}>
            {workShift}
          </Card.Text>
          <Button variant="primary" onClick = { ()=>{ navigate(`/confirmAppointment/${_id}`); } } >Confirm Appointment</Button>
        </Card.Body>
      </Card> 
    </>
  )
}

export default DoctorCard
