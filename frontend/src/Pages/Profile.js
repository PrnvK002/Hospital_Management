import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { resetUpdate, updateProfile } from '../state/reducers/userReducer';

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userLogin.data);
    const updated = useSelector((state)=>state.userLogin.updated);
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
        setEmail(userInfo.email);
        setUsername(userInfo.username);
        setAge(userInfo.age);
        setPhone(userInfo.phone);
    }, [userInfo]);

    useEffect(()=>{
        if(updated){
            dispatch(resetUpdate());
        }
    },[updated])

    return (
        <>
            <Container className="w-50">

                <Row>
                    <h3 className="text-center">{userInfo.username.toUpperCase()}</h3>

                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder={userInfo.email || 'Enter email'} onChange={(e) => { setEmail(e.target.value) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="email" placeholder={userInfo.username || 'Enter user name'} onChange={(e) => { setUsername(e.target.value) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="email" placeholder={userInfo.age || 'Enter age'} onChange={(e) => { setAge(e.target.value) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="email" placeholder={userInfo.phone || 'Enter phone number'} onChange={(e) => { setPhone(e.target.value) }} />
                        </Form.Group>
                        <Button className="w-100" variant="primary" type="button" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Row>
            </Container>
        </>
    )
}

export default Profile