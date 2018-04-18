import React, { Component } from 'react';
import {db} from './config';
import moment from 'moment';

class App extends Component {
    state = {
        messages : [],
        newMessageText : '',
        user : 'Jonny'
    }
    componentDidMount () {
        db.collection('messages').onSnapshot(snap => {
            const {messages} = this.state;
            const newMessages = snap.docChanges.reduce((messages, change) => {
                console.log(messages);
                if (change.type === 'added') {
                    messages.push(change.doc.data())
                }
                return messages;
            }, []);
            this.setState({
                messages : [...messages, ...newMessages]
            })
        })
    }

    render() {
        const {messages, newMessageText} = this.state;
        return (
            <div className="App">
                <ul>
                    {messages.map((message, i) => 
                        <li key={`${i}${message}`}>{message.user}: {message.text}</li>
                    )}
                </ul>
                <input 
                    type="text"
                    value={newMessageText}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
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

    sendMessage = () => {
        const {newMessageText, user} = this.state;
        const submission = {
            text : newMessageText,
            user,
            timestamp : moment().format()
        }
        db.collection('messages').add(submission);
        this.setState({
            newMessageText : ''
        })
    }
}

export default App;
