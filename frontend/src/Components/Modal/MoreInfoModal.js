import React from "react";
import { Button, Modal } from "react-bootstrap";
import Loader from "../Loading/loader";

function MoreInfoModal( { show , handleClose , showConfirm , moreUserData  } ) {
    const { data , loading , error } = moreUserData;
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>More Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <Loader />}
          {error && <p style={{color:"red"}} >{error}</p>}
          {Object.keys(data).length > 0 ? (
            <div>
              <p> Name : {data.user_name} </p>
              <p> Email: {data.email} </p>
              <p> Phone : {data.phone} </p>
              <p> { showConfirm === false ? '' :  `Position : ${data.role}`} </p>
              <p> Age : {data.age} </p>
              <p> {data.department ? `Department name : ${data.department}` : ""} </p>
              <p> { showConfirm === false ?  '': data.salary ? `Salary : ${data.salary}` : ""  }</p>
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
