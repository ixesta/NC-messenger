import React, { Component } from 'react';
import {db} from './config';
import moment from 'moment';
import uniqid from 'uniqid';
import * as api from './api';
import UserPanel from './components/UserPanel';

class App extends Component {
    state = {
        messages : [],
        users : [],
        newMessageText : '',
        myUserId : '',
        waitingForUsername : '',
        loginError: ''
    }
    
    componentDidMount () {
        api.listenForNewMessages(newMessages => {
            console.log(newMessages);
            const {messages} = this.state;
            this.setState({
                messages : [...messages, ...newMessages]
            })
        });
        api.listenToUsers(userEvent => {
            const {users} = this.state;
            console.log({userEvent});
            if (userEvent.msg === 'new users') {
                this.setState({
                    users : [...users, ...userEvent.users]
                })
            } else if (userEvent.msg === 'user status change') {
                this.setState({
                    users : users.map(user => {
                        if (user.id === userEvent.user.id) {
                            return userEvent.user
                        } else return user;
                    })
                })
            }
        })
    }

    render() {
        const {messages, users, newMessageText, myUserId, loginError} = this.state;
        if (!users.length || !messages.length) return null
        const myUser = users.find(user => {
            return user.id === myUserId
        });
        return (
            <div className="App">
                Logged in as:
                <p>{myUser ? myUser.username : 'Nobody yet...'}</p>
                Messages:
                <ul>
                    {messages.map((message, i) => 
                        <li key={message.id}>{users.find(user => user.id === message.userId).username}: {message.text}</li>
                    )}
                </ul>
                {myUserId && <div>
                    <p>Add new message:</p>
                    <input 
                        type="text"
                        value={newMessageText}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                    />
                </div>}
                {myUserId && <button onClick={this.logout}>Logout</button>}
                {!myUserId && <div>
                    Create user:
                    <UserPanel 
                        clickFunc={this.createUser}
                        text='Create User'
                    />
                    Login:
                    <UserPanel 
                        clickFunc={this.login}
                        text='Login'
                    />
                    {loginError !== '' && <p>{loginError}</p>}
                </div>}
            </div>
        );
    }

    handleChange = (e) => {
        this.setState({
            newMessageText : e.target.value
        })
    }

    handleKeyDown = (e) => {
        if (e.which === 13) this.sendMessage();
    }

    createUser = (user) => {
        api.createUser(user, (err, res) => {
            this.setState({myUserId : res})
        });
    }

    login = (user) => {
        api.login(user, (err, res) => {
            if (err) {
                this.setState({
                    loginError : err
                })
            } else {
                this.setState({
                    loginError : '',
                    myUserId : res
                })
            }
        })
    }

    logout = () => {
        api.logout(this.state.myUserId, err => {
            if (err) console.log(err);
            else {
                this.setState ({myUserId : ''})
            }
        })
    }

    sendMessage = () => {
        const {newMessageText, myUserId} = this.state;
        const message = {
            text : newMessageText,
            userId : myUserId,
            timestamp : moment().format(),
            references : null
        }
        api.postMessage(message, (err, res) => {
            console.log(err, res);
        });
        this.setState({
            newMessageText : ''
        });
    }
}

export default App;
