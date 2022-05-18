import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDoctorsOfDepartments } from "../state/reducers/userDataReducer";
import Loader from '../Components/Loading/loader';

function Chat() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const doctorData = useSelector((state) => state.usersData);
  const { data, loading, error } = doctorData;

  useEffect(() => {
    dispatch(getDoctorsOfDepartments(id));
  }, [dispatch,id]);

  return (
    <>
      <Container>
        <h3 style={{ color: "#4D4C7D" }} className="text-center">
          {" "}
          Chat With Doctor{" "}
        </h3>
        <Container className="d-flex justify-content-center align-items-center">
          <div
            style={{
              border: "1px solid #4D4C7D",
              height: "70vh",
              width: "70vw",
            }}
            className="d-flex"
          >
            <div
              style={{
                border: "1px solid #4D4C7D",
                width: "30%",
                margin: "0",
                padding: "0",
              }}
              className="viewDoctors"
            >
              {data.length > 0 ? (
                data.map((e) => {
                  return (
                    <div
                      style={{ height: "3rem", cursor: "pointer" }}
                      className="border d-flex align-items-center justify-content-center"
                    >
                      <p className="mt-3"> {e.user_name} </p>
                    </div>
                  );
                })
              ) : (
                
                <p className="color-danger">No doctors found</p>
              )}
            </div>
            <div
              style={{ border: "1px solid #4D4C7D", width: "70%" }}
              className="viewChat"
            >

            </div>
          </div>
        </Container>
      </Container>
    </>
  );
}

export default Chat;
