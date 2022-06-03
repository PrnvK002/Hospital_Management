import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Nav, Row, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { resetUpdate, updateProfile } from '../state/reducers/userReducer';
import profilePicture from '../Assets/doctor.png';
import { getMoreInfo } from '../state/reducers/moreInfo';
import Loader from '../Components/Loading/loader';

function Profile() {

    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userLogin.data);
    const updated = useSelector((state) => state.userLogin.updated);

    //============== getting more user specific data ==============
    const moreInfo = useSelector((state) => state.moreInfo);
    const { data, loading} = moreInfo;
    useEffect(() => {
        dispatch(getMoreInfo(userInfo._id));
    }, [dispatch,userInfo._id]);


    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = () => {
        const data = {
            email,
            username,
            phone,
            age
        }

        dispatch(updateProfile(data));
    }

    useEffect(() => {
        setEmail(data.email);
        setUsername(data.username);
        setAge(data.age);
        setPhone(data.phone);
    }, [data]);

    useEffect(() => {
        if (updated) {
            dispatch(resetUpdate());
        }
    }, [updated]);


    return (
        <div className="mt-5" >

            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Details</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Edit</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            {loading && <Loader />}
                            {
                                data ?

                                    (
                                        <>
                                            <Tab.Pane eventKey="first">
                                                <Container>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <img className='me-5' src={profilePicture} alt="loading" style={{ width: '10rem' }} />
                                                        <h3> {data ? data.user_name : ''} </h3>
                                                    </div>
                                                    <Container className="mt-5" style={{ marginLeft: '15rem' }} >
                                                        <p> Email Address : <span className="ms-5" > {data ? data.email : ''} </span> </p>
                                                        <p> Gender : <span className="ms-5" > {data ? data.gender : ''} </span> </p>
                                                        <p> Age : <span className="ms-5" > {data ? data.age : ''} </span> </p>
                                                        <p> Phone : <span className="ms-5" > {data ? data.phone : ''} </span> </p>

                                                    </Container>
                                                </Container>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                <Container className="w-50">

                                                    <Row>
                                                        <h3 className="text-center">{userInfo.username.toUpperCase()}</h3>

                                                        <Form>
                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label>Email address</Form.Label>
                                                                <Form.Control type="email" placeholder={data.email || 'Enter email'} onChange={(e) => { setEmail(e.target.value) }} />
                                                            </Form.Group>

                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label>User Name</Form.Label>
                                                                <Form.Control type="email" placeholder={data.username || 'Enter user name'} onChange={(e) => { setUsername(e.target.value) }} />
                                                            </Form.Group>

                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label>Age</Form.Label>
                                                                <Form.Control type="email" placeholder={data.age || 'Enter age'} onChange={(e) => { setAge(e.target.value) }} />
                                                            </Form.Group>

                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label>Phone</Form.Label>
                                                                <Form.Control type="email" placeholder={data.phone || 'Enter phone number'} onChange={(e) => { setPhone(e.target.value) }} />
                                                            </Form.Group>
                                                            <Button className="w-100" variant="primary" type="button" onClick={handleSubmit}>
                                                                Submit
                                                            </Button>
                                                        </Form>
                                                    </Row>
                                                </Container>
                                            </Tab.Pane>
                                        </>
                                    )
                                    :
                                    ''
                            }
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </div>
    )
}

export default Profile