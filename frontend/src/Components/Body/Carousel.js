import React, { useEffect } from "react";
import { Carousel, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../state/reducers/servicesReducer";
import AlertMessage from "../Alert/Alert";

function Slider() {
  const dispatch = useDispatch();
  const serviceData = useSelector((state) => state.services);
  const { services, loading, error } = serviceData;
  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const errorProps = { variant: "danger", message: "No services found" };

  return (
    <Col>
      <Carousel>
        {services.length > 0 ? (
          services.map((d) => {
            return (
              <Carousel.Item key={ d._id }>
                <img
                  className="d-block w-100 fluid"
                  src={d.image}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>{d.serviceName}</h3>
                  <p> {d.description} </p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })
        ) : (
          <AlertMessage {...errorProps} />
        )}
      </Carousel>
    </Col>
  );
}

export default Slider;
