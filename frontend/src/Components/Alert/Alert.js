import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

function AlertMessage({ variant , message }) {

    const [ show , setShow] = useState(true);

  return (
    <>
    { show && 
     (   <Alert onClose={() => setShow(false)} variant={variant} dismissible>
           { message }
        </Alert> )
    }   
    </>
  )
}

export default AlertMessage;