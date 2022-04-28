import React from 'react';
import Carousel from './Carousel';
import Card from './Cards';
import { Row , Col , Container } from 'react-bootstrap';
import './style.css'

function Body() {
  return (
    <div>
        <Container>
        <div className='carouselSection'>
            <Carousel />
        </div>
        <div className='cardSection'>
            <h3> Departments </h3>
            <Row>
                <Col>
                    <Card />
                </Col>
            </Row>
        </div>

        </Container>

    </div>
  );
}

export default Body;
