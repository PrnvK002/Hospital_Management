import React from "react";
import { Card , Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



function Cards({ _id , departmentName , description ,image , rating , setError }) {


  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userLogin.data);
  const bookAppointmentButton = () =>{ 
    if(Object.keys(userInfo).length > 0){
      navigate(`/bookAppointment/${_id}/${departmentName}`);
    }else{
      setError('User Not logged in please login to book appointments');
    }
   }

  return (
    <>
      <Card style={{ width: "14rem",height:"22rem"}} className="align-items-center" >
        <Card.Img variant="top" src={image} style={{ width : "10rem" , height : "10rem" }} />
        <Card.Body>
          <Card.Title>{departmentName}</Card.Title>
          <Card.Text style={{ fontSize : "14px" , minHeight : "4rem"  }}>
            {description}
          </Card.Text>
          <Card.Text>
            {rating}
          </Card.Text>
          <Button variant="primary" onClick = { bookAppointmentButton } >Book Appointment</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default Cards;
