import React,{ useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "../axios";
import { createServices } from "../state/reducers/servicesReducer";
import AlertMessage from "../Components/Alert/Alert";

function AddService() {

    const dataChanged = useSelector((state)=>state.services.dataChanged);
  //======================= Image upload =======================

  const [image, setImage] = useState("");
  const [imageUploading, setUpload] = useState(false);
  const [err, setError] = useState("");
  const ImageUpload = async (e) => {
    const file = e.target.files[0];
    setUpload(true);
    const formData = new FormData();
    formData.append("image", file);
    const response = await Axios.post("/uploads/service", formData, {
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
      dispatch(createServices({ ...data, image: image }));

    } else {
      setError("Image must be provided");
    }
  };

  useEffect(()=>{
    if(dataChanged){
      navigate('/admin/services');
    }
  },[dataChanged,navigate])

  const propsSuccess = {
    variant: "success",
    message: "Successfully added Services",
  };

  return (
    <>
      <Container className="w-50">
        <h3 className="text-center" style={{ color: "#4D4C7D" }}>
          Add Service
        </h3>
        {dataChanged && <AlertMessage {...propsSuccess} />}
        <div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {err && <p style={{ color: "red", fontSize: "0.8rem" }}>{err}</p>}
            {errors.serviceName && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.serviceName.message}
              </p>
            )}
            <FloatingLabel
              controlId="floatingInput"
              label="serviceName"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Service Name"
                {...register("serviceName", {
                  required: "Service Name must be filled",
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

export default AddService;
