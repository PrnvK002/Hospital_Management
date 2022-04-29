import React,{ useState,useEffect } from "react";
import { Navbar , Container , Nav , Offcanvas } from 'react-bootstrap';
// import './bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';


const Header = () => {

  const navigate = useNavigate();

  const userInfo = useSelector(state => state.userLogin.data);
  const loading = useSelector( state => state.userLogin.loading );
  const error = useSelector(state => state.userLogin.error);

  const dispatch = useDispatch();

  const logout = ()=>{
    dispatch({
      type : 'logout'
    })
  }

  return (
    <div>
      
    </div>
  );
};

export default Header;
