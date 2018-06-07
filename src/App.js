import React, { Component } from 'react';
import { db } from './config';
import * as api from './api';
import moment from 'moment';
import WriteMessage from './WriteMessage/WriteMessage';
import Display from './Display/Display';
import Messages from './Messages/Messages';
import User from './User/User';

class App extends Component {

    state = {
        userName: ''
    }

    render() {
        return (
            <div>
                <Messages userName={this.state.userName} />
                <User changeLogStatus={this.changeLogStatus} />
            </div>
        )
    }
    changeLogStatus = (newUser, newPassword) => {
        api.login({
            userName: newUser,
            password: newPassword
        }, (error) => { error ? alert(error.messages) : this.setState({ userName: newUser }) });
    }

}

export default App;
