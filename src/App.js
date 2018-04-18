import React, { Component } from 'react';
import {db} from './config';

class App extends Component {

    componentDidMount() {
        db.collection("users").add({
            first: "Ada",
            last: "Lovelace",
            born: 1815
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });        
    }
  render() {
    return (
      <div className="App">
        Home
      </div>
    );
  }
}

export default App;
