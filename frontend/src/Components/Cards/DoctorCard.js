import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import doctorImage from "../../Assets/doctor.png";
import { useDispatch, useSelector } from "react-redux";
import { getMoreInfo } from "../../state/reducers/moreInfo";

function DoctorCard(props) {
  const dispatch = useDispatch();
  const { _id, user_name, image, qualification, workShift , setDoctor ,setShow } = props;
  const getInfo = (id) => {
      console.log("getInfo working");
      dispatch(getMoreInfo(id));
  }
  return (
    <>
      <Card
        style={{ width: "14rem", height: "23rem" }}
        className="align-items-center"
      >
        <Card.Img
          variant="top"
          src={image ? image : doctorImage}
          style={{ width: "8rem", height: "8rem" }}
        />
        <Card.Body>
          <Card.Title onClick={ ()=>getInfo(_id) } >{user_name}</Card.Title>
          <Card.Text style={{ fontSize: "14px" , minHeight : "4rem" }}>{qualification}
          <br />
          Work Shift : {workShift}
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              setDoctor({ id : _id , doctorName : user_name , workShift });
              setShow(true);
            }}
          >
            Confirm Appointment
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default DoctorCard;
