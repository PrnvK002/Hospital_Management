import React, { useState } from "react";
import GooglePayButton from "@google-pay/button-react";
import { Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fixAppointment } from "../../state/reducers/appointmentsReducer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AppointmentModal({
  show,
  handleClose,
  setSuccess,
  doctorData,
  departmentName,
}) {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const confirmBooking = (paymentDetails) => {
    console.log(date);
    console.log(paymentDetails);
    const data = {
      paymentDetails: paymentDetails.paymentMethodData,
      doctor_id: doctorData.id,
      date: date,
    };
    setSuccess(true);
    dispatch(fixAppointment(data));
    handleClose();
  };

  const today = new Date();

  return (
    <>
      <Modal show={show} onHide={handleClose} className="text-center" >
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Name of the Doctor : {doctorData.doctorName}</p>
          <p>Name of the Department : {departmentName}</p>
          <p>Time : {doctorData.workShift}</p>
          <p>Booking fee : 50RS</p>
          <Row callName="d-flex">
            <label htmlFor="datePicker">Choose date : </label>
            <DatePicker
              selected={date}
              minDate={today}
              dateFormat="dd-MM-yyyy"
              onChange={(date) => {
                setDate(date);
                console.log(date);
              }}
            />
          </Row>
          <GooglePayButton
            style={{ "margin-top" :"6px" }}
            environment="TEST"
            paymentRequest={{
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [
                {
                  type: "CARD",
                  parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["MASTERCARD", "VISA"],
                  },
                  tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",
                    parameters: {
                      gateway: "example",
                      gatewayMerchantId: "exampleGatewayMerchantId",
                    },
                  },
                },
              ],
              merchantInfo: {
                merchantId: "12345678901234567890",
                merchantName: "Demo Merchant",
              },
              transactionInfo: {
                totalPriceStatus: "FINAL",
                totalPriceLabel: "Total",
                totalPrice: "50.00",
                currencyCode: "INR",
                countryCode: "IN",
              },
            }}
            onLoadPaymentData={(paymentRequest) => {
              confirmBooking(paymentRequest);
            }}
            onError={(err) => {
              console.log(err);
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AppointmentModal;
