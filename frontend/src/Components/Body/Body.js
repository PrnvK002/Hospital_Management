import React, { useEffect } from "react";
import Carousel from "./Carousel";
import Card from "./Cards";
import { Row, Col } from "react-bootstrap";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { getDepartments } from "../../state/reducers/departmentReducer";
import Alert from "../Alert/Alert";
import Loading from "../Loading/loader";

function Body() {
  const departmentData = useSelector((state) => state.departmentData);
  const { departments, loading, error } = departmentData;

  console.log(departments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  const alert = { vaiant: "danger", message: error };

  return (
    <>
      <Carousel />
      <div className="cardSection">
        <h3> Departments </h3>
        <Row className='g-2'>
          {error && <Alert {...alert} />}
          {loading && <Loading />}
          {departments.length > 0 ? (
            departments.map((data) => {
              return (
                <Col xs={12} md={4} lg={3} >
                  <Card key={data._id} {...data} />
                </Col>
              );
            })
          ) : (
            <p>No data found</p>
          )}
        </Row>
      </div>
    </>
  );
}

export default Body;
