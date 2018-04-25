import React from 'react';
import PT from 'prop-types';

class UserPanel extends React.Component {
    state = {
        newUsername : '',
        newPassword : ''
    }

    render () {
        const {newUsername, newPassword} = this.state;
        return (
            <div>
                Username: <input onChange={this.handleUsernameChange} value={newUsername}/><br/>
                Password: <input onChange={this.handlePasswordChange} value={newPassword}/>
                <button onClick={this.handleClick}>{this.props.text}</button>
            </div>
        );
    }

    handlePasswordChange = (e) => {
        this.setState({newPassword : e.target.value})
    }

    handleUsernameChange = (e) => {
        this.setState({newUsername : e.target.value})
    }

    handleClick = () => {
        const {clickFunc} = this.props;
        const {newPassword, newUsername} = this.state;
        const user = {
            username : newUsername,
            password : newPassword
        }
        clickFunc(user);
    }

    static propTypes = {
        clickFunc : PT.func.isRequired
    }
}

export default UserPanel;