import React, { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Alert from "../Components/Alert/Alert";
import Loading from "../Components/Loading/loader";
import { addDepartment, setAddedStatus } from "../state/reducers/departmentReducer";
import Axios from "../axios";

function AddDepartment() {

  //======================= imgage uploading ===============
  
  const departmentData = useSelector((state) => state.departmentData);
  const { dataChanged, loading, error } = departmentData;
  const [image, setImage] = useState("");
  const [imageUploading, setUpload] = useState(false);
  const [err, setError] = useState("");
  const ImageUpload = async (e) => {
    const file = e.target.files[0];
    setUpload(true);
    const formData = new FormData();
    formData.append("image", file);
    const response = await Axios.post("/uploads/department", formData, {
      headers: { authorization: `Bearer ${userInfo.authToken}` },
    });
    if (response) {
      setImage(response.data.url);
      setUpload(false);
    }
  };

  //======================= form data submission ====================

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin.data);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log(image);
    if (image.length > 0) {
      setError("");
      dispatch(addDepartment({ ...data, image: image }));

    } else {
      setError("Image must be provided");
    }
  };

  const propsError = { variant: "danger", message: error };
  const propsSuccess = {
    variant: "success",
    message: "Successfully added Department",
  };

  //================ redirecting to departments ================
  useEffect(()=>{
    if(dataChanged === true){
      dispatch(setAddedStatus());
      navigate('/admin/departments');
    }
  },[navigate,dataChanged,dispatch]);

  return (
    <>
      <Container className="w-50">
        <h3 className="text-center" style={{ color: "#4D4C7D" }}>
          Add Department
        </h3>
        {dataChanged && <Alert {...propsSuccess} />}
        {error && <Alert {...propsError} />}
        {loading && <Loading />}
        <div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {err && <p style={{ color: "red", fontSize: "0.8rem" }}>{err}</p>}
            {errors.departmentName && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.departmentName.message}
              </p>
            )}
            <FloatingLabel
              controlId="floatingInput"
              label="departmentName"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Department Name"
                {...register("departmentName", {
                  required: "Department Name must be filled",
                })}
              />
            </FloatingLabel>
            {errors.description && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.description.message}
              </p>
            )}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("description", {
                  required: "Description must be filled",
                })}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Choose Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  ImageUpload(e);
                }}
              />
            </Form.Group>
            {imageUploading ? (
              <Button type="submit" className="my-3 w-100" disabled>
                Submit
              </Button>
            ) : (
              <Button type="submit" className="my-3 w-100">
                Submit
              </Button>
            )}
          </Form>
        </div>
      </Container>
    </>
  );
}

export default AddDepartment;
