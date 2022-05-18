import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import Card from "./Cards";
import { Row, Col } from "react-bootstrap";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { getDepartments } from "../../state/reducers/departmentReducer";
import AlertMessage from "../Alert/Alert";
import Loading from "../Loading/loader";
import Sidebar from '../Offcanvas/Offcanvas';

function Body() {
  const [loginError, setError] = useState("");
  const departmentData = useSelector((state) => state.departmentData);
  const { departments, loading, error } = departmentData;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  const alert = { vaiant: "danger", message: error };
  const props = { variant: "danger", message: "No data found" };
  const loginErrorProps = { variant: "danger", message: loginError };
  const cardProps = { setError };

  //============== Offcanvas setting ==================

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const offCanvasProps = { show , handleClose }

  return (
    <>
      <Carousel />
      <div className="cardSection">
        <h3 style={{ color: "#4D4C7D" }}> Departments </h3>
        <Row className="g-2">
          {error && <AlertMessage {...alert} />}
          {loginError.length > 0 ? <AlertMessage {...loginErrorProps} /> : ""}
          {loading && <Loading />}
          {departments.length > 0 ? (
            departments.map((data) => {
              return (
                <Col key={data._id} xs={12} md={4} lg={3}>
                  <Card {...data} {...cardProps} />
                </Col>
              );
            })
          ) : (
            <AlertMessage {...props} />
          )}
        </Row>
        <Sidebar { ...offCanvasProps } />
        <button
          className="ms-auto text-center vertical-center"
          style={{
            position: "fixed",
            bottom: "5rem",
            right: "7rem",
            borderRadius: "100%",
            height: "3.5rem",
            width: "3.5rem",
            backgroundColor: "#363062",
            border: "none",
          }}

          onClick={handleShow}
        >
          <i className="bi bi-chat-left-fill" style={{ color: "white" }}></i>
        </button>
      </div>
    </>
  );
}

export default Body;
