import React from 'react';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import * as api from '../api';


const User = ({ changeLogStatus }) => (
  <div>
    <Register />
    <Login changeLogStatus={changeLogStatus} />
    {/* {loggedIn && (<Logout />)} */}
  </div>
)


export default User;