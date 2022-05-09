import React from "react";
import { Card , Button } from 'react-bootstrap';


function Cards({ departmentName , description ,image , rating }) {

  return (
    <div>
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
          <Button variant="primary">Book an Appointment</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Cards;
