import React from 'react';
import * as api from '../api';


class Register extends React.Component {

  state = {
    userName: '',
    password: ''
  }
  render() {
    return (<form>
      <input placeholder='username' onChange={this.handleUsername} value={this.state.userName} />
      <br />
      <input placeholder='password' onChange={this.handlePassword} value={this.state.password} />
      <button type='Submit' onClick={this.sendUserInfo}>Register</button>
    </form >)
  }

  handleUsername = (event) => {
    event.preventDefault();
    let userName = event.target.value;
    this.setState({ userName })
  }

  handlePassword = (event) => {
    event.preventDefault();
    let password = event.target.value;
    this.setState({ password })
  }


  sendUserInfo = (event) => {
    event.preventDefault();
    api.createUser({
      userName: this.state.userName,
      password: this.state.password,
    }, (error) => error ? alert(error.messages) : this.setState({ userName: '', password: '' }));
  }

}

export default Register;