import React from "react";
import { Button, Modal } from "react-bootstrap";
import Loader from "../Loading/loader";

function MoreInfoModal({ show, handleClose, showConfirm, moreUserData }) {
  const { data, loading, error } = moreUserData;
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>More Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <Loader />}
          {error && <p style={{ color: "red" }} >{error}</p>}
          {Object.keys(data).length > 0 ? (
            <div>
              <table style={{ border: "none" }} >
                <tr>
                  <td> Name </td>
                  <td className="ps-3" > : </td>
                  <td className="ps-3" > {data.user_name}  </td>
                </tr>
                <tr>
                  <td> Email </td>
                  <td className="ps-3" > : </td>
                  <td className="ps-3" > {data.email}  </td>
                </tr>
                <tr>
                  <td> Phone </td>
                  <td className="ps-3" > : </td>
                  <td className="ps-3" > {data.phone}  </td>
                </tr>
                <tr>
                  <td> Age </td>
                  <td className="ps-3" > : </td>
                  <td className="ps-3" > {data.age}  </td>
                </tr>
                {data.department ?
                  <tr>
                    <td> Department Name </td>
                    <td className="ps-3" > : </td>
                    <td className="ps-3" > {data.department.departmentName} </td>
                  </tr>
                  : ""}
                {showConfirm === false ? '' :
                  <tr>
                    <td> Position </td>
                    <td className="ps-3" > : </td>
                    <td className="ps-3" > {data.role} </td>
                  </tr>
                }
                {showConfirm === false ? '' :
                  data.salary ?
                    <tr>
                      <td> Salary </td>
                      <td className="ps-3" > : </td>
                      <td className="ps-3" > {data.salary} </td>
                    </tr>
                    : ""}
              </table>
            </div>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {
            showConfirm ?
              (
                <Button
                  variant="primary"
                  onClick={() => {
                    showConfirm(data._id, data.isBlocked);
                  }}
                >
                  {data.isBlocked ? "Unblock" : "Block"}
                </Button>) :
              ''
          }
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default MoreInfoModal;
