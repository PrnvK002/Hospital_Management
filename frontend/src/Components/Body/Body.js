import React from "react";
import Carousel from "./Carousel";
import Card from "./Cards";
import { Row, Col, Container } from "react-bootstrap";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";

function Body() {
  return (
    <>
      <Carousel />
      <div className="cardSection">
        <h3> Departments </h3>
        <Row>
          <Col>
            <Card />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Body;
