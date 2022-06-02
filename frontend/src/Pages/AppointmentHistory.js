import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../Components/Alert/Alert";
import { getAppointmentHistory } from "../state/reducers/appointmentsReducer";
import Loader from "../Components/Loading/loader";
import Moment from 'react-moment';
import PrescriptionModal from "../Components/Modal/prescriptionModal";
import { getPrescription } from "../state/reducers/prescriptionReducer";

function AppointmentHistory() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const userInfo = useSelector((state)=>state.userLogin.data);
  const appointmentData = useSelector((state) => state.appointmentData);
  const { appointments, error, loading, dataChanged } = appointmentData;
  useEffect(() => {
    dispatch(getAppointmentHistory(page));
  }, [dispatch, dataChanged, page]);

  const emptyProps = { variant: "danger", message: "No Appointments found" };
  const errorProps = { variant: "danger", message: error };

  //======================== handling prescription show =================
  const [ show , setShow ] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleModal = (id , date) => {
    console.log(id , date);
    handleShow();
    dispatch(getPrescription({id,date,user_id:userInfo._id}))
  }

  const prescriptionModalProps = {
     show , handleClose
  }

  return (
    <>
      <Container>
        <h3 style={{ color: "#4D4C7D" }} className="text-center" >Booking History</h3>
        {error && <AlertMessage {...errorProps} />}
        {loading && <Loader />}
        <PrescriptionModal { ...prescriptionModalProps } />
        {appointments.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Doctors name</th>
                <th>Shift</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>

              </tr>
            </thead>
            <tbody>
              {appointments.length > 0
                ? appointments.map((data, index) => {
                    return (
                      <tr key={index} className="text-center">
                        <td > {index + 1} </td>
                        <td >
                          {data.doctor_id.user_name}
                        </td>
                        <td>
                          {" "}
                          {data.doctor_id.workShift}{" "}
                        </td>
                        <td> {data.status} </td>  
                        <td>
                          {" "}
                          <Moment format="YYYY/MM/DD">{data.date}</Moment>{" "}
                        </td> 
                        <td style={{ color : 'blue' , fontSize : '13px' , cursor : 'pointer'}} onClick ={ ()=>{ handleModal(data.doctor_id._id , data.date ) } } > { data.status === 'treated' ? <u  > Show Prescription </u> : '' } </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </Table>
        ) : (
          <AlertMessage {...emptyProps} />
        )}
      </Container>
    </>
  );
}

export default AppointmentHistory;
