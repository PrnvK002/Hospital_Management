import React, { useEffect,useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { getUsersData } from '../state/reducers/userDataReducer';


function userManagement() {

  const dispatch = useDispatch();
  const [ role , setRole ] = useState('patient');
  const [ page , setPage ] = useState(1); 
  const usersData = useSelector((state) => state.usersData.data);
  const loading = useSelector((state) => state.usersData.loading);
  const error = useSelector((state) => state.usersData.error);
  //============= getting user Info ============
  useEffect(() => {
    dispatch(getUsersData(role,page));
  }, [role,page])

  return (
    <>



    </>
  )
}

export default userManagement