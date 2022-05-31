import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getServices, resetChange } from "../state/reducers/servicesReducer";
import ServiceCard from "../Components/Cards/ServiceCard";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loading/loader";
import AlertMessage from "../Components/Alert/Alert";

function Services() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const serviceData = useSelector((state) => state.services);
  const { services, loading, error, dataChanged } = serviceData;

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);
  useEffect(() => {
    if (dataChanged) {
      dispatch(getServices());
      dispatch(resetChange());
    }
  }, [dispatch, dataChanged]);

  const errorProps = { variant: "danger", message: error };
  const noDataProps = { variant : 'danger' , message : "No Data found" };

  return (
    <>
      <div className="d-flex justify-content-center align-self-center">
        <h3 style={{ color: "#4D4C7D" }} className="text-center me-5">
          Services
        </h3>
        <button style={{ background : 'none' , border : 'none' , outline : 'none' }} onClick={ ()=>{ navigate('/admin/addService') } } ><i className="bi bi-plus-square-fill"></i></button>
      </div>
      <Row className="mt-4">
        {loading && <Loader />}
        {error && <AlertMessage {...errorProps} />}
        { services ? services.map((data) => {
          return (
            <Col key={data._id}>
              <ServiceCard {...data} />
            </Col>
          );
        }) :
        <AlertMessage {...noDataProps} />
      }
      </Row>
    </>
  );
}

export default Services;
