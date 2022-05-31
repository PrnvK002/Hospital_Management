import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import AlertMessage from '../Components/Alert/Alert';
import Loader from '../Components/Loading/loader';
import { getMedicineDetails } from '../state/reducers/medicineReducer';
import AddMedicine from '../Components/Modal/AddMedicine';

function Medicine() {

    const dispatch = useDispatch();
    const medicineData = useSelector((state) => state.medicineData);
    const { medicines, loading, error } = medicineData;
    useEffect(() => {
        dispatch(getMedicineDetails());
    }, [dispatch]);

    const noMedicineProps = { variant: 'danger', message: 'No Medicine Data found' };
    const errorProps = { variant : 'danger' , message : error }

    //============== add medicine set up ==================
    const [ show , setShow ] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const addMedicineProps = { show , handleClose };

    return (
        <>
            <Container className="w-60">
                <div className='d-flex justify-content-center ' >
                    <h3 className="text-center me-5" style={{ color: "#4D4C7D" }}> Medicine </h3>
                    <button className='btn btn-primary' onClick={ handleShow } > Add Medicine </button>
                </div>
                { error && <AlertMessage { ...errorProps } /> }
                { loading && <Loader /> }

                <AddMedicine { ...addMedicineProps } />

                {
                    medicines.length > 0 ? 

                    <Table striped bordered hover className='mt-5' >
                        <thead>
                            <tr className='text-center'>
                                <th>#</th>
                                <th>Medicine Name</th>
                                <th>Stock</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                medicines.length > 0 ?
                                    medicines.map((d,index) => {
                                        return (
                                        <tr key={d._id} className="text-center" >
                                            <td> {index+1} </td>
                                            <td> {d.medicineName} </td>
                                            <td> {d.stock} </td>
                                            <td> {d.price} </td>
                                        </tr>
                                        )
                                })
                                :
                                <AlertMessage {...noMedicineProps} />
                            }
                        </tbody>
                    </Table>
                    :
                    <AlertMessage {...noMedicineProps} />
                }

            </Container>
        </>
    )
}

export default Medicine;