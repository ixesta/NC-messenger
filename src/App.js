import React, { Component } from 'react';
// import { db } from './config';
import './App.css'
import * as api from './api';
import Messages from './Messages/Messages';
import User from './User/User';

class App extends Component {

    state = {
        userName: ''
    }

    render() {
        return (
            <div className='App'>
                {this.state.userName ? <Messages userName={this.state.userName} /> : 'Please log in to see messages'}
                <User logIn={this.logIn} logOut={this.logOut} userName={this.state.userName}/>
            </div>
        )
    }
    logIn = (newUser, newPassword) => {
        api.login({
            userName: newUser,
            password: newPassword
        }, (error) => { error ? alert(error.messages) : this.setState({ userName: newUser }) });
    }

    logOut = () => {
        api.logout(this.state.userName,
        (error) => { error ? alert(error.messages) : this.setState({ userName: '' }) });
    }

}

export default App;
