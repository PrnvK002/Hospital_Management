import React from "react";
import { Container, Offcanvas } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Sidebar({ show, handleClose }) {
  const departmentData = useSelector((state) => state.departmentData);
  const { departments, loading, error } = departmentData;
    const navigate = useNavigate();
  const toChat = (id)=>{
    navigate(`chat/${id}`);
  }

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} style={{ backgroundColor:"#363062" , color : "white" }} >
        <Offcanvas.Header className="text-center" closeButton>
          <Offcanvas.Title >Select A Department</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <p>
              Choose a department to see corresponding doctors,which you wanna
              send message to.
            </p>
            {departments.length > 0
              ? departments.map((data) => {
                  return (
                    <div
                      key={data._id}
                      style={{
                        height: "3rem",
                        cursor: "pointer" 
                      }}
                      className="d-flex border align-items-center justify-content-center"
                    >
                      <p className="mt-3" onClick={ ()=> toChat(data._id) } > {data.departmentName} </p>
                    </div>
                  );
                })
              : "Unable to find departments"}
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
