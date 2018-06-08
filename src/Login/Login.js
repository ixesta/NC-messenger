import React from 'react';
// import * as api from '../api';


class Login extends React.Component {
  state = {
    newUserName: '',
    newPassword: '',
  }
  render() {
    return (<form onSubmit={this.handleSubmit}>
          <button className='button' type='submit'>Login</button>
          <br />
      <input placeholder='username' onChange={this.handleUsername} value={this.state.newUserName} />
      <input type='password' placeholder='password' onChange={this.handlePassword} value={this.state.newPassword} />
    </form >)
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.logIn(this.state.newUserName, this.state.newPassword)
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