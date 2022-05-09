import React,{ useState } from "react";
import { useSelector } from "react-redux";
import DoctorNavbar from "./DoctorNavbar";
import PatientNavbar from "./PatientNavbar";
import StaffNavbar from "./StaffNavbar";
import AdminNavbar from "./AdminNavbar";
import Topbar from './Topbar';

const Header = () => {

  const userInfo = useSelector((state) => state.userLogin.data);

  return (
    <>
    <Topbar data={userInfo}/>
   { 
     Object.keys(userInfo).length === 0 ? 
     <PatientNavbar /> :
     userInfo.role === "patient" ? 
     <PatientNavbar /> :
     userInfo.role === "doctor" ? 
     <DoctorNavbar /> :
     userInfo.role === "admin" ? 
     <AdminNavbar /> :
     <StaffNavbar />
  }
    </>
  
  );
};

export default Header;
