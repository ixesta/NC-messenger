import React from 'react';
import * as api from '../api';



class UserList extends React.Component {
  state = {
    users: {}
  }

componentDidMount() {
  api.listenToUsers(updatedUsers => {
    let newUsers = { ...this.state.users };
    updatedUsers.forEach(({ message, user }) => {
      newUsers = { ...newUsers, [user.userName]: user }
    })
    this.setState({ users: newUsers })
  })
};

render() {
  console.log(this.state.users, 'USERS')
  let userArray = []
  for(let key in this.state.users) {
    userArray.push([key])
  }
  return (<div>
    {userArray.map(user => <p>{user}</p>)}
  </div>)
}
}

export default UserList;