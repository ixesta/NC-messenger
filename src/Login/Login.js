import React from 'react';
import * as api from '../api';


class Login extends React.Component {
  state = {
    newUserName: '',
    newPassword: '',
  }
  render() {
    return (<form onSubmit={this.handleSubmit}>
      <input placeholder='username' onChange={this.handleUsername} value={this.state.newUserName} />
      <br />
      <input placeholder='password' onChange={this.handlePassword} value={this.state.newPassword} />
      <button type='submit'>Login</button>
    </form >)
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.changeLogStatus(this.state.newUserName, this.state.newPassword)
    this.setState({ newUserName: '', newPassword: '' })
  }

  handleUsername = (event) => {
    event.preventDefault();
    let newUserName = event.target.value;
    this.setState({ newUserName })
  }

  handlePassword = (event) => {
    event.preventDefault();
    let newPassword = event.target.value;
    this.setState({ newPassword })
  }



}


export default Login;