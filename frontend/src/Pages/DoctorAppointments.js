import React, { useEffect , useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import AlertMessage from "../Components/Alert/Alert";
import Loader from "../Components/Loading/loader";
import MoreInfoModal from "../Components/Modal/MoreInfoModal";
import { getAppointments } from "../state/reducers/appointmentsReducer";
import { getMoreInfo } from "../state/reducers/moreInfo";
import { useNavigate } from 'react-router-dom'

function Appointments() {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const [ page ,setPage ] = useState(1);

  //============= getting appointments of this doctor ==========
  const appointmentData = useSelector((state) => state.appointmentData);
  const moreUserData = useSelector((state) => state.moreInfo);

  const { appointments, loading, error } = appointmentData;

  useEffect(() => {
    dispatch(getAppointments(page));
  }, [dispatch,page]);

  //===================== getting more user Info ============
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const moreUserInfo = (id) => {
    dispatch(getMoreInfo(id));
    handleShow();
  };

  const moreInfoProps = { show , handleClose , showConfirm:null , moreUserData }
  //============= no appointments props ====================
  const props = { variant: "danger", message: "No data found " };
  

  return (
    <>
      <Container>
        <h3 className="text-center" style={{ color: "#4D4C7D" }}>
          Appointments
        </h3>
        {/* Modal more info start */}
          <MoreInfoModal { ...moreInfoProps }  />
        {/* Modal more info end */}
        {
          appointments.length > 0 ? 
            <Table striped bordered hover>
              <thead>
                <tr className="text-center" >
                  <th>#</th>
                  <th>Patient Name</th>
                  <th>Gender </th>
                  <th>Age</th>
                  {/* <th> </th> */}
                </tr>
              </thead>
              <tbody>
                {loading && <Loader />}
                {error && <AlertMessage {...props} />}
                {appointments ? (
                  appointments.map((data, index) => {
                    return (
                      <tr key={data._id} className="text-center" >
                        <td>{index + 1}</td>
                        <td>{data.patient_id.user_name}</td>
                        <td>{data.patient_id.gender}</td>
                        <td>{data.patient_id.age}</td>
                        <td>
                          <button
                            onClick={() => {
                              moreUserInfo(data.patient_id._id);
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
                        <td onClick={ () => navigate(`/doctor/prescription/${data.patient_id._id}`) } style={{ color : 'blue' , fontSize : '12px' , cursor : 'pointer' , width : 'fit-content' }} >
                          <u>
                            Add Prescription
                          </u>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <AlertMessage {...props} />
                )}
              </tbody>
            </Table>
                :
                <AlertMessage {...props} />
        }
      </Container>
    </>
  );
}

export default Appointments;
