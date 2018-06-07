# FE-nc-messenger

## Learning Objectives

* Design data structure collaboratively (TICK)
* Continue managing props and state sensibly in React.
* Handle data coming in at unpredictable times with websockets.
* Build lean, mean React components.
* Integrate an external cloud database (firebase-firestore) using their api.
* Create an engaging and intuitive UI (consider CSS Grids!)

# Task
We have set up a Firebase Firestore database. This is a database which is interacted with via websockets which allow it to be 'realtime' - you can open listeners to database endpoints, and pass in callback functions to be invoked when the database detects changes.

Your task is to create a chat room that interacts with the database, rendering and posting messages just like any other chat room. These messages will be attributed to users, which you will be able to create, log in, and log out.

We have created an internal api with methods for you to use in your react components. Just import the api in the components you need. For the first day, you shouldn't need to change or add anything to this file.

API methods:
```js
.listenForNewMessages((newMessages) => {})
//This establishes a listener in the messages collection. When this is first invoked, your callback function will be called with an array of all current messages in the collection. Every subsequent time new messages are detected, the callback function will again be called with these messages (always in an array, even if there is only one).

.postMessage(message, (err, messageId) => {})
//This posts a new message to the collection. The message should be an object with the agreed properties. If a message is passed in with incorrect properties, you callback will be invoked with an error message detailing these. When the message is successfully added, the callback function will be invoked with an id representing the new message's place in the collection.

.listenToUsers((userEvent) => {})
//This establishes a listener in the users collection. Every time a new user is detected (including the first time this function is called), the callback function will be invoked, sending back an array of objects with two properties. The first is the 'user' property, which contains the user's data (currently just loggedIn and userName, but you can add more!) and the second is a message relating to what the change was. 

// There are two types of change you're likely to encounter - 'added', when a user was added to the collection (and is therefore logged in) and 'modified', when a user's loggedIn status has changed in some way. You will have to treat these different, and it is reasonably challenging to handle users logging in/out efficiently!

.createUser(user, (err, {userName, loggedIn}) => {})
//This posts a new user to the collection. If a user is passed in with incorrect properties, you callback will be invoked with an error message detailing these. The userName property cannot already exist on the database and in this case it will invoke the callback with an error; if a user is successfully added, the callback will be invoked with a user object containing the userName and loggedIn property (which will be set to true).

.login({userName, password}, (err, {userName, loggedIn}) => {})
//This takes a details object with a username and password string properties and finds a user that matches these details. The error first callback will be invoked with the error if it is an invalid combination. If it succeeds, it will be invoked with a user object containing the userName and loggedIn property (which will be set to true).

.logout(userId, (err, {userName, loggedIn}) => {})
//This takes a userId and sets their loggedIn status to false. If anything goes wrong, the cb will be invoked with an error. Otherwise, it will be invokved with a user object containing the userName and loggedIn property (which will be set to false).
```

As you always should with React, create your static layout first. Draw out your components, and make decisions about where to listen for data and set it to state.

NOTE: Collectively we have decided on schema for our `user` and `message` data. It is really important you stick to these schema! If there are inconsistencies in the data, people's code is liable to break as it attempts to access properties that are not there...

NOTE ALSO: We are not doing proper authentication here. There is nothing protecting the password you use to create your user. So please don't use a password you actually use!