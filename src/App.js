import React, { Component } from 'react';
import { db } from './config';
import * as api from './api';
import moment from 'moment';
import WriteMessage from './WriteMessage/WriteMessage';
import Display from './Display/Display';
import Messages from './Messages/Messages';

class App extends Component {

    state = {
        userName: {
            name: ''
        }
    }

    render() {
        return (
            <div>
                <Messages userName={this.state.userName.name} />
            </div>
        )
    }

}

export default App;
