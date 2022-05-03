import React from 'react';
import Carousel1 from './images/carousel1.jpg';
import Carousel2 from './images/carousel2.jpg';
import Carousel3 from './images/carousel3.jpg';
import { Carousel, Col } from 'react-bootstrap';

function Slider() {
  return (
    <Col md={8}>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 fluid"
            src={Carousel1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 fluid"
            src={Carousel2}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 fluid"
            src={Carousel3}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Col>
  )
}

export default Slider