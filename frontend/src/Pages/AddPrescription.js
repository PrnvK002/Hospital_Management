import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getMedicineDetails } from '../state/reducers/medicineReducer';
import { addPrescription, resetSuccess } from '../state/reducers/prescriptionReducer';

function AddPrescription() {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //=========== medicine details ==============

    useEffect(() => {
        dispatch(getMedicineDetails());
    }, [dispatch]);
    const medicineDetails = useSelector((state) => state.medicineData);
    const { medicines  } = medicineDetails;

    //=============== Prescription Details =============
    const success = useSelector((state)=>state.prescriptionData.success);
    const [prescriptionData, setPrescriptionData] = useState([]);
    const [medicineName, setMedicineName] = useState('');
    const [frequency, setFrequency] = useState(1);
    const [days, setDays] = useState(1);

    const add = () => {
        const med = {
            medicineName,
            frequency,
            days
        };
        setPrescriptionData([...prescriptionData, med]);
    }

    const handleSubmit = () => {
        const data = {
            medicineData: prescriptionData,
            user_id: id
        }
        dispatch(addPrescription(data));
    }

    useEffect(()=>{
        if(success){
            navigate('/doctor/appointments');
        }
        return () => {
            dispatch(resetSuccess());
        }
    },[success,navigate,dispatch]);

    return (
        <>
            <Container>
                <Row className="d-flex" >
                    <h3 className="text-center" style={{ color: "#4D4C7D" }} > Prescription </h3>
                    <Button title="Submit Prescription" className='btn btn-success' onClick={handleSubmit} > <i className ="bi bi-box-arrow-right"></i> </Button>
                </Row>
                <Row className="my-4">
                    <Col md>
                        <Form.Select aria-label="Medicines" onChange={(e) => setMedicineName(e.target.value)} >
                            <option>Open this select menu</option>
                            {
                                medicines.length > 0 ?
                                    medicines.map((data) => {
                                        return <option value={data.medicineName} key={data._id} > {data.medicineName} </option>
                                    })
                                    :
                                    ''
                            }
                        </Form.Select>
                    </Col>
                    <Col md>
                        <Form.Select aria-label="Frequency of Medicine" onChange={(e) => setFrequency(e.target.value)}  >
                            <option>Open this select menu</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </Form.Select>
                    </Col>
                    <Col md>
                        <Form.Group controlId="floatingInput" label="Days" className="mb-3">
                            <Form.Control type="text" placeholder="No.of days" onChange={(e) => { setDays(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Button className="btn btn-primary" title="Add Medicine to prescription" onClick={add}> Add </Button>
                    </Col>
                </Row>
                <Row>
                    {
                        prescriptionData.length > 0 ?

                            <Table striped bordered hover>
                                <thead>
                                    <tr className="text-center">
                                        <th>#</th>
                                        <th>Medicine Name</th>
                                        <th> Frequency <span style={{ fontSize : '12px' , fontWeight : 'normal' }} >(times per day)</span> </th>
                                        <th> Days </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        prescriptionData.map((data, index) => {

                                            return (
                                                <tr key={data._id} className="text-center" >
                                                    <td> {index + 1} </td>
                                                    <td>{data.medicineName}</td>
                                                    <td>{data.frequency}</td>
                                                    <td> {data.days} </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </Table>


                            :
                            ''
                    }

                </Row>
            </Container>
        </>
    )
}

export default AddPrescription