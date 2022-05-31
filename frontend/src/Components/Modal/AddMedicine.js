import React from 'react';
import { Modal, Form, Button, Container, FloatingLabel } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addMedicine } from '../../state/reducers/medicineReducer';

function AddMedicine({ show, handleClose }) {

    const dispatch = useDispatch();
    // ====================== Form submit section ===================
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        handleClose();
        dispatch(addMedicine(data));
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h3 className="text-center" style={{ color: "#4D4C7D" }}> Add Medicine </h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="text-center">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            {errors.medicineName && (
                                <p style={{ color: "red", fontSize: "0.8rem" }}>
                                    {errors.medicineName.message}
                                </p>
                            )}
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Medicine Name"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="Medicine name" {...register('medicineName', {
                                    required: 'Medicine Name must be filled'
                                })} />
                            </FloatingLabel>
                            {errors.stock && (
                                <p style={{ color: "red", fontSize: "0.8rem" }}>
                                    {errors.stock.message}
                                </p>
                            )}
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Stock"
                                className="mb-3"
                            >
                                <Form.Control type="number" placeholder="Stock" {...register('stock', {
                                    required: 'Stock must be filled'
                                })} />
                            </FloatingLabel>
                            {errors.price && (
                                <p style={{ color: "red", fontSize: "0.8rem" }}>
                                    {errors.price.message}
                                </p>
                            )}
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Price"
                                className="mb-3"
                            >
                                <Form.Control type="number" placeholder="Price" {...register('price', {
                                    required: 'Price must be filled'
                                })} />
                            </FloatingLabel>
                            <Button variant="primary" type="submit" className="w-100">
                                Submit
                            </Button>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default AddMedicine