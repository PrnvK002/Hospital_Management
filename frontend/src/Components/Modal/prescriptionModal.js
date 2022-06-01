import React from 'react'
import { Modal, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import AlertMessage from '../Alert/Alert';
import Loader from '../Loading/loader';

function PrescriptionModal({ show, handleClose }) {

    const prescriptionData = useSelector((state) => state.prescriptionData);
    const { prescription, loading, error } = prescriptionData;


    const noDataProps = { variant: 'danger', message: 'No Prescription Found' };
    const errorProps = { variant: 'danger', message: error };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title> Prescription </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading && <Loader />}
                    {error && <AlertMessage {...errorProps} />}
                    {
                        Object.keys(prescription).length > 0 ?
                            (

                                <Table striped bordered hover>
                                    <thead>
                                        <tr className="text-center">
                                            <th>#</th>
                                            <th>Medicine Name</th>
                                            <th> Frequency <span style={{ fontSize: '12px', fontWeight: 'normal' }} >(times per day)</span> </th>
                                            <th> Days </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            prescription.medicines.map((data, index) => {

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
                            ) :
                            <AlertMessage {...noDataProps} />
                    }

                </Modal.Body>

            </Modal>
        </>
    )
}

export default PrescriptionModal