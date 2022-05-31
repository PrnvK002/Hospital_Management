import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../Components/Alert/Alert";
import { getAppointmentHistory } from "../state/reducers/appointmentsReducer";
import Loader from "../Components/Loading/loader";
import Moment from 'react-moment';

function AppointmentHistory() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const appointmentData = useSelector((state) => state.appointmentData);
  const { appointments, error, loading, dataChanged } = appointmentData;
  useEffect(() => {
    dispatch(getAppointmentHistory(page));
  }, [dispatch, dataChanged, page]);

  const emptyProps = { variant: "danger", message: "No Appointments found" };
  const errorProps = { variant: "danger", message: error };

  //======================== handling prescription show =================
  const handleShow = () => {
    
  }

  return (
    <>
      <Container>
        <h3 style={{ color: "#4D4C7D" }}>Booking History</h3>
        {error && <AlertMessage {...errorProps} />}
        {loading && <Loader />}
        {appointments.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Doctors name</th>
                <th>Shift</th>
                <th>Status</th>
                <th>Date</th>
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
                        { data.status === 'treated' ? <td onClick={ handleShow } > Show Prescription </td> : '' }
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
