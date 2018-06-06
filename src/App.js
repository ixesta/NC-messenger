import React, { Component } from 'react';
import {db} from './config';
import * as api from './api';
import moment from 'moment'

class App extends Component {

    state = {
        messages: [], 
        users: [],
        text: '',
        userId: '7yclptN1EdkSgwDS8pCl',
        userName: 'Jac', 
        newUser: '',
        newPassword: ''
        
    }
    
    componentDidMount () {
        api.listenToUsers(userEvent => {
            console.log({userEvent});
            this.setState({users: [...this.state.users, ...userEvent.users]})
        })
        api.listenForNewMessages(newMessages => {
            this.setState({
                messages: [...this.state.messages, ...newMessages]
            })
        });
    }


    render() {
        const {text, newUser, newPassword} = this.state;
        return (
            <div>
                FE NC MESSENGER
                {this.state.messages.map(({userName, text}, i) => {
                    return <p>message: {text} from {userName}</p>
                })}
                <form onSubmit={this.sendMessage}>
                    <input value={text} onChange={e => this.handleInput(e, "text")}/>
                </form>
                <form onSubmit={this.createUser}>
                    <input value={newUser} onChange={e => this.handleInput(e, "newUser")}/>
                    <input value={newPassword} onChange={e => this.handleInput(e, "newPassword")}/>
                    <button type="submit">Create new user</button>
                </form>
            </div>
        )
    }
    createUser = e => {
        e.preventDefault();
        const {newPassword, newUser} = this.state;
        // if(typeof newPassword !== 'string' || typeof newUser !== 'string')
        api.createUser({userName: newUser, password: newPassword}, ({messages}, id) => {
            messages ? alert(messages) :
            this.setState({
                newUser: '',
                newPassword: '', 
                userName: newUser, 
                userId: id
            })
        })
    }

    sendMessage = e => {
        e.preventDefault();
        const {userId, text, userName} = this.state;
        const message = {userId, text, userName, timestap: moment().format()}
        api.postMessage(message, (err, res) => {
            this.setState({text: ''})
        })

    }
    handleInput = ({target: {value}}, key) => {
        this.setState({[key]: value})
    }
}

export default App;
