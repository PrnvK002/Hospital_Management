import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersData, setDataChange } from "../state/reducers/userDataReducer";
import AlertMessage from "../Components/Alert/Alert";
import {
  Dropdown,
  DropdownButton,
  Pagination,
  Table,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loading/loader";
import { getMoreInfo } from "../state/reducers/moreInfo";
import Axios from "../axios";
import Confirm from "../Components/Modal/Confirm";
import MoreInfoModal from "../Components/Modal/MoreInfoModal";

function UserManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [role, setRole] = useState("patient");
  const [page, setPage] = useState(1);
  const userInfo = useSelector((state) => state.userLogin.data);

  //============= getting user Info ============
  const usersData = useSelector((state) => state.usersData.data);
  const loading = useSelector((state) => state.usersData.loading);
  const error = useSelector((state) => state.usersData.error);

  const changeRole = (e) => {
    console.log("is it working");
    console.log(e);
    setRole(e);
  };

  useEffect(() => {
    dispatch(setDataChange());
    dispatch(getUsersData({ role, page }));
  }, [role, page, dispatch]);

  //=========== Alert porps ===============
  const props = { variant: "danger", message: "Cannot find any user data" };

  //=========== Getting more user specific data ========

  const moreUserData = useSelector((state) => state.moreInfo);

  const getInfo = (id) => {
    dispatch(getMoreInfo(id));
    handleShow();
  };

  //================ Modal setup ===================

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //=============== Confirm modal setup =============
  const [confirm, setConfirm] = useState(false);
  const [Id, setId] = useState("");
  const [status, setStatus] = useState();
  const showConfirm = (id, status) => {
    setId(id);
    setStatus(status);
    setConfirm(true);
  };
  const hideConfirm = () => setConfirm(false);

  const blockUser = async () => {
    hideConfirm();
    let response = await Axios.patch(
      "/admin/blockUser",
      { Id, status },
      { header: { authorization: `Bearer ${userInfo.authToken}` } }
    );
    if (response) {
      dispatch(getUsersData(role, page));
    }
  };

  //================= confirm props ==============
  const confirmProps = {
    confirm,
    hideConfirm,
    confirmAction: blockUser,
    removal: "user",
    action: "block",
  };
  //============== more info props =============
  const moreInfoProps = { show, handleClose, showConfirm, moreUserData };

  //==================== End =============================

  return (
    <>
      <Row className="text-center m-3">
        <Col>
          <h3 style={{ color: "#4D4C7D" }}>{role.toUpperCase()}</h3>
        </Col>
        <Col className="d-flex mb-3">
          <Button
            className="me-3"
            onClick={() => {
              navigate("/admin/addUser");
            }}
          >
            Add User
          </Button>
          <div className="dropdown">
            <DropdownButton
              id="dropdown-basic-button"
              title="Change Role"
              onSelect={changeRole}
            >
              <Dropdown.Item eventKey="patient">Patients</Dropdown.Item>
              <Dropdown.Item eventKey="doctor">Doctors</Dropdown.Item>
              <Dropdown.Item eventKey="staff">Staffs</Dropdown.Item>
            </DropdownButton>
          </div>
        </Col>
        {error && <AlertMessage {...props} />}
        {loading && <Loader />}
      </Row>

      {/* More info modal start */}
      {show ? <MoreInfoModal {...moreInfoProps} /> : ""}
      {/* More info modal end */}
      {/* confirm modal set up start */}

      {confirm ? <Confirm {...confirmProps} /> : ""}

      {/* confirm modal set up end */}

      {usersData.length > 0 ? (
        <Table striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Email</th>
              <th>User name</th>
              <th>Phone</th>
              <th>Gender</th>
              {role === "patient" ? (
                ""
              ) : (
                <>
                  <th>Salary</th>
                  <th>Department</th>
                </>
              )}
              <th>More Info</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((data, index) => (
              <tr key={data._id} className="text-center">
                <td>{index + 1}</td>
                <td>{data.email}</td>
                <td>{data.user_name}</td>
                <td>{data.phone}</td>
                <td>{data.gender}</td>
                {role === "patient" ? (
                  ""
                ) : (
                  <>
                    <td>{data.salary}</td>
                    <td>
                      {data.department ? data.department.departmentName : ""}
                    </td>
                  </>
                )}
                <td>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      outline: "none",
                    }}
                    onClick={() => {
                      getInfo(data._id);
                    }}
                  >
                    <i className="bi bi-eye-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <Pagination>
                <Pagination.Prev
                  onClick={() => {
                    setPage(page - 1);
                  }}
                />
                <Pagination.Next
                  onClick={() => {
                    setPage(page + 1);
                  }}
                />
              </Pagination>
            </tr>
          </tbody>
        </Table>
      ) : (
        <AlertMessage {...props} />
      )}
    </>
  );
}

export default UserManagement;
