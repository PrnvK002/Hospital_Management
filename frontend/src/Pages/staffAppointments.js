import React, { useEffect, useState } from "react";
import { Container, Dropdown, DropdownButton, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import AlertMessage from "../Components/Alert/Alert";
import Loader from "../Components/Loading/loader";
import { getAllAppointmetns } from "../state/reducers/appointmentsReducer";
import PrescriptionModal from "../Components/Modal/prescriptionModal";
import { getPrescription } from "../state/reducers/prescriptionReducer";

function StaffAppointments() {
  const dispatch = useDispatch();
  const appointmentData = useSelector((state) => state.appointmentData);
  const { appointments, error, loading, dataChanged } = appointmentData;
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('active');

  useEffect(() => {
    console.log(status);
    dispatch(getAllAppointmetns({ page, status }));
  }, [dispatch, page, dataChanged, status]);

  const emptyProps = { variant: "danger", message: "Cannot find appointments" };
  const errorProps = { variant: "danger", message: error };

  //================= prescription setting ====================
  const [ show , setShow ] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleModal = (id , date , user_id) => {
    console.log(id , date);
    handleShow();
    dispatch(getPrescription({id,date,user_id}))
  }

  const prescriptionModalProps = {
     show , handleClose
  }

  return (
    <>
      <Container>
        <h3 className="text-center" style={{ color: "#4D4C7D" }}>
          Appointments
        </h3>
        <DropdownButton
          id="dropdown-basic-button"
          title="Change Status"
          onSelect={(e) => { setStatus(e) }}
        >
          <Dropdown.Item eventKey="active"> Active </Dropdown.Item>
          <Dropdown.Item eventKey="treated">Treated</Dropdown.Item>
        </DropdownButton>
        {error && <AlertMessage {...errorProps} />}
        {loading && <Loader />}
        <PrescriptionModal { ...prescriptionModalProps } />

        <div className="mt-4">
          {appointments.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>Patient Name</th>
                  <th>Doctor Name</th>
                  <th>Time Shift</th>
                  <th>Token Number</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((data, index) => {
                  return (
                    <tr key={data._id} className="text-center">
                      <td> {index + 1} </td>
                      <td> {data.patient_id.user_name} </td>
                      <td> {data.doctor_id.user_name} </td>
                      <td> {data.doctor_id.workShift} </td>
                      <td> {data.token} </td>
                      <td>
                        {" "}
                        <Moment date={data.date} format="YYYY/MM/DD" />{" "}
                      </td>
                      <td style={{ color : 'blue' , fontSize : '13px' , cursor : 'pointer'}} onClick ={ ()=>{ handleModal(data.doctor_id._id , data.date,data.patient_id._id ) } } > { data.status === 'treated' ? <u  > Show Prescription </u> : '' } </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <AlertMessage {...emptyProps} />
          )}
        </div>
      </Container>
    </>
  );
}

export default StaffAppointments;
