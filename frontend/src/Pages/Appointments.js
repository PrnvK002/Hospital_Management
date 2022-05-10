import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAppointments } from "../../../backend/controllers/appointmentController";
import AlertMessage from "../Components/Alert/Alert";
import Loader from "../Components/Loading/loader";

function Appointments() {
  const dispatch = useDispatch();

  //============= getting appointments of this doctor ==========
  const appointmentData = useSelector((state) => state.appointmentData);
  const moreInfoData = useSelector((state) => state.moreInfo.data);
  const moreInfoLoading = useSelector((state) => state.moreInfo.loading);
  const moreInfoError = useSelector((state) => state.moreInfo.error);
  const { appointments, loading, error } = appointmentData;

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  //===================== getting more user Info ============
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const moreUserInfo = (id) => {
    dispatch(getMoreInfo(id));
    handleShow();
  };

  //============= no appointments props ====================
  const props = { variant: "danger", message: "No data found " };

  return (
    <>
      <Container>
        {/* Modal more info start */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>More Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {moreInfoLoading && <Loading />}
            {moreInfoError && <p>{moreInfoError}</p>}
            {Object.keys(moreUserInfo).length > 0 ? (
              <div>
                <p> {moreInfoData.user_name} </p>
                <p> {moreInfoData.email} </p>
                <p> {moreInfoData.phone} </p>
                <p> {moreInfoData.role} </p>
                <p> {moreInfoData.age} </p>
                <p>User from : {moreInfoData.createdAt} </p>
                <p>
                  {" "}
                  {moreInfoData.department ? moreInfoData.department : ""}{" "}
                </p>
                <p> {moreInfoData.salary ? moreInfoData.salary : ""} </p>
              </div>
            ) : (
              ""
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Modal more info end */}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Patient Name</th>
              <th>Gender </th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {loading && <Loader />}
            {error && <AlertMessage {...props} />}
            {appointments ? (
              appointments.map((data, index) => {
                return (
                  <tr key={data._id}>
                    <td>{index + 1}</td>
                    <td>{data.user_id.user_name}</td>
                    <td>{data.user_id.gender}</td>
                    <td>{data.user_id.age}</td>
                    <td>
                      <button
                        onClick={() => {
                          moreUserInfo(data.user_id._id);
                        }}
                        style={{
                          background: "none",
                          outline: "none",
                          border: "none",
                        }}
                      >
                        <i className="bi bi-eye-fill"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <AlertMessage {...props} />
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Appointments;
