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
              <p> {data.user_name} </p>
              <p> {data.email} </p>
              <p> {data.phone} </p>
              <p> {data.role} </p>
              <p> {data.age} </p>
              <p>User from : {data.createdAt} </p>
              <p> {data.department ? data.department : ""} </p>
              <p> {data.salary ? data.salary : ""} </p>
            </div>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              showConfirm(data._id, data.isBlocked);
            }}
          >
            {data.isBlocked ? "Unblock" : "Block"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default MoreInfoModal;
