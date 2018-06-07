



// componentDidMount() {
//   api.listenToUsers(updatedUsers => {
//     let newUsers = { ...this.state.users };
//     updatedUsers.forEach(({ message, user }) => {
//       newUsers = { ...newUsers, [user.userName]: user }
//     })
//     this.setState({ users: newUsers })
//   })
// };