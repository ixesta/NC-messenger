import React, { Component } from 'react';
import {db} from './config';
import * as api from './api';

class App extends Component {
    
    componentDidMount () {
        api.listenForNewMessages(newMessages => {
            console.log(newMessages);
        });
        api.listenToUsers(userEvent => {
            console.log({userEvent});
        })
    }


    render() {
        return (
            <div>
                FE NC MESSENGER
            </div>
        )
    }
}

export default App;
