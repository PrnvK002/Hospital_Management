import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function Message(props) {

  return (
    <>
      <ToastContainer className="p-3">
        <Toast>
          <Toast.Header closeButton={false}>
            <strong className="me-auto"> {props.from.user_name || props.from }  </strong>
          </Toast.Header>
          <Toast.Body>{props.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default Message;
