import React from 'react';
import * as api from '../api';


class Login extends React.Component {
  state = {
    userName: '',
    password: '',
  }
  render() {
    return (<form>
      <input placeholder='username' onChange={this.handleUsername} value={this.state.userName} />
      <br />
      <input placeholder='password' onChange={this.handlePassword} value={this.state.password} />
      <button type='Submit' onClick={this.props.changeLogStatus}>Login</button>
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



}


export default Login;