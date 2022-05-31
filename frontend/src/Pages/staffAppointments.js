import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import AlertMessage from "../Components/Alert/Alert";
import Loader from "../Components/Loading/loader";
import { getAllAppointmetns } from "../state/reducers/appointmentsReducer";

function StaffAppointments() {
  const dispatch = useDispatch();
  const appointmentData = useSelector((state) => state.appointmentData);
  const { appointments, error, loading, dataChanged } = appointmentData;
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllAppointmetns(page));
  }, [dispatch, page, dataChanged]);

  const emptyProps = { variant: "danger", message: "Cannot find appointments" };
  const errorProps = { variant: "danger", message: error };
  return (
    <>
      <Container>
        <h3 className="text-center" style={{ color: "#4D4C7D" }}>
          Appointments
        </h3>
        {error && <AlertMessage {...errorProps} />}
        {loading && <Loader />}
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
