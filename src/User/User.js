import React from 'react';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
// import * as api from '../api';


const User = ({ logIn, userName, logOut }) => (
  <div className='user'>
    {userName && (<Logout userName ={userName} logOut={logOut}/>)}
    {!userName && (<div><Register /> <Login logIn={logIn} /></div>)}
  </div>
)


export default User;