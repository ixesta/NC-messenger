import React from 'react';



class User extends React.Component {


  componentDidMount() {
    api.listenToUsers(updatedUsers => {
      let newUsers = { ...this.state.users };
      updatedUsers.forEach(({ message, user }) => {
        newUsers = { ...newUsers, [user.userName]: user }
      })
      this.setState({ users: newUsers })
    })


  }
}

export default User;