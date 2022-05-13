import React from "react";
import { Button, Modal } from "react-bootstrap";

function Confirm({ confirm , hideConfirm , confirmAction , removal , action }) {

  return (
    <>
      <Modal show={confirm} onHide={hideConfirm} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure want to {action} this {removal} ?{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideConfirm}>
            Close
          </Button>
          <Button variant="primary" onClick={confirmAction}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Confirm;
