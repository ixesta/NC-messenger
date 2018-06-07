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
        userName: '',
        loggedIn: false
    }

    render() {
        return (
            <div>
                <Messages userName={this.state.userName} />
                <User changeLogStatus={this.changeLogStatus} />
            </div>
        )
    }
    changeLogStatus = (event) => {
        event.preventDefault();
        api.login({
            userName: this.state.userName,
            password: this.state.password,
            loggedIn: this.props.loggedIn
        }, (error) => error ? alert(error.messages) : this.setState({ userName: '', password: '' }));
    }

}

export default App;
