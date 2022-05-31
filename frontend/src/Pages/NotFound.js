import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import notFoundImage from '../Assets/background/errorPageBackground.png'

function NotFound() {
    const navigate = useNavigate();
  return (
    <>
        <Container>

            <Row>
                <Col md style={{position : 'relative'}} >
                    <img src={notFoundImage} alt="Loading.." srcset="" />
                    <div  style={{position:'absolute',top:'28rem',right:'15rem'}} >
                        <h1 style={{color : '#4D4C7D'}} > 404 <span style={{fontSize : '10px'}} >NOT Found</span> </h1>
                        <h4 style={{color : '#4D4C7D'}} > It's the dead end </h4>
                        <p style={{cursor:'pointer'}} onClick={ ()=> navigate('/') } >Back to Home</p>
                    </div>
                </Col>
            </Row>

        </Container>
    </>
  )
}

export default NotFound