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
    dispatch(fixAppointment(data));
    handleClose();
  };

  const today = new Date();

  return (
    <>
      <Modal show={show} onHide={handleClose}  >
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table style={{ border: "none" }} >
            <tr>
              <td> Name of the Doctor </td>
              <td className="px-3" > : </td>
              <td> {doctorData.doctorName} </td>
            </tr>
            <tr>
              <td> Name of the Department </td>
              <td className="px-3" > : </td>
              <td> {departmentName} </td>
            </tr>
            <tr>
              <td> Time </td>
              <td className="px-3" > : </td>
              <td> {doctorData.doctorName} </td>
            </tr>
            <tr>
              <td> Booking fee </td>
              <td className="px-3" > : </td>
              <td> 50 RS </td>
            </tr>
            <tr>
              <td> Choose Date </td>
              <td className="px-3" > : </td>
              <td>
                <DatePicker
                  selected={date}
                  minDate={today}
                  dateFormat="dd-MM-yyyy"
                  onChange={(date) => {
                    setDate(date);
                    console.log(date);
                  }}
                /> </td>
            </tr>
          </table>
          <Row className="text-center" >

          <GooglePayButton
            style={{ "margin-top": "6px" }}
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
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AppointmentModal;
