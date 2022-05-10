import React from "react";
import { Card , Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";



function Cards({ _id , departmentName , description ,image , rating }) {

  const navigate = useNavigate();

  return (
    <>
      <Card style={{ width: "14rem",height:"22rem"}} className="align-items-center" >
        <Card.Img variant="top" src={image} style={{ width : "10rem" , height : "10rem" }} />
        <Card.Body>
          <Card.Title>{departmentName}</Card.Title>
          <Card.Text style={{ fontSize : "14px" }}>
            {description}
          </Card.Text>
          <Card.Text>
            {rating}
          </Card.Text>
          <Button variant="primary" onClick = { ()=>{ navigate(`/bookAppointment/${_id}/${departmentName}`); } } >Book Appointment</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default Cards;
