import React, { Component } from 'react';
import {db} from './config';
import * as api from './api';
import moment from 'moment'

class App extends Component {

    state = {
       
    }
    
    componentDidMount () {
        api.listenToUsers(updatedUsers => {
            let newUsers = {...this.state.users};
            updatedUsers.forEach(({message, user}) => {
               newUsers = {...newUsers, [user.userName]: user}
            })
            this.setState({users: newUsers})
        })
        
        api.listenForNewMessages(newMessages => {
            this.setState({
                messages: [...this.state.messages, ...newMessages]
            })
        });
    }


    render() {
    }
}

export default App;
