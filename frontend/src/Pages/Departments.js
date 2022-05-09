import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDepartments,
  removeDepartment,
  setAddedStatus,
} from "../state/reducers/departmentReducer";
import AlertMessage from "../Components/Alert/Alert";
import Loader from "../Components/Loading/loader";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Departments() {
  const navigate = useNavigate();
  //=========== getting department data ================

  const dispatch = useDispatch();
  const departmentData = useSelector((state) => state.departmentData);
  const { departments, loading, error, dataChanged } = departmentData;

  useEffect(() => {
    dispatch(getDepartments());
    if (dataChanged === true) {
      dispatch(setAddedStatus());
    }
  }, [dispatch, dataChanged]);

  //=========== Alert props ===============
  const props = {
    variant: "danger",
    message: "Unable to find department Data",
  };
  const errorProps = { variant: "danger", message: error };

  //============= Removing departments ==================

  const [confirm, setConfirm] = useState(false);
  const [Id, setId] = useState("");
  const showConfirm = (id) => {
    setId(id);
    setConfirm(true);
  };

  const hideConfirm = () => setConfirm(false);

  const confirmRemoval = () => {
    hideConfirm();
    dispatch(removeDepartment(Id));
  };

  return (
    <>
      {error && <AlertMessage {...errorProps} />}
      {loading && <Loader />}
      <Row className="text-center mb-3">
        <Col md>
          <h3> Departments </h3>
        </Col>
        <Col md>
          <Button
            onClick={() => {
              navigate("/admin/addDepartment");
            }}
          >
            Add Department
          </Button>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Department Name</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {departments ? (
            departments.map((data, index) => {
              return (
                <tr key={data._id}>
                  <td>{index + 1}</td>
                  <td>{data.departmentName}</td>
                  <td>{data.description}</td>
                  <td>
                    <img src={data.image} alt="loading.." />
                  </td>
                  <td>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        outline: "none",
                      }}
                      onClick={() => {
                        showConfirm(data._id);
                      }}
                    >
                      <i className="bi bi-trash-fill"></i>
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

      {/* confirm modal set up start */}

      <Modal show={confirm} onHide={hideConfirm} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure want to remove this department({Id}) ?{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideConfirm}>
            Close
          </Button>
          <Button variant="primary" onClick={confirmRemoval}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* confirm modal set up end */}
    </>
  );
}

export default Departments;
