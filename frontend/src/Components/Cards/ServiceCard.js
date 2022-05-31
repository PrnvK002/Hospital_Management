import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeService } from "../../state/reducers/servicesReducer";

function ServiceCard({ _id, image, serviceName, description }) {
  const dispatch = useDispatch();
  const deleteService = (id) => {
    dispatch(removeService(id));
  };

  return (
    <>
      <Card style={{ width: "18rem" }} className="text-center">
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title> {serviceName} </Card.Title>
          <Card.Text style={{ minHeight: "3rem" }}>{description}</Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              deleteService(_id);
            }}
          >
            Remove
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default ServiceCard;
