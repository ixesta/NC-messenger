import {db} from './config';

export function listenForNewMessages (cb) {
    db.collection('messages').onSnapshot(snap => {
        const newMessages = snap.docChanges.reduce((messages, change) => {
            if (change.type === 'added') {
                messages.push(insertIdProperty(change.doc));
            }
            return messages;
        }, []);
        if (newMessages.length) cb(newMessages)
    })
}

export function listenToUsers (cb) {
    db.collection('users').onSnapshot(snap => {
        const userEvent = snap.docChanges.reduce((acc, change) => {
            const user = insertIdProperty(change.doc);
            delete user.password;
            if (change.type === 'added') {
                if (!acc.msg) acc.msg = 'new users';
                acc.users = acc.users ? [...acc.users, user] : [user]
            }
            if (change.type === 'changed') {
                acc.msg = 'user status change';
                acc.user = user;
            }
            return acc;
        }, {})
        if(userEvent.msg) cb(userEvent);
    })
}

export function postMessage (message, cb) {
    let errors = []
    if (!message.text && typeof message.text !== 'string') {
        errors.push('You must have a string text property on your message');
    }
    if (!message.timestamp && typeof message.timestamp !== 'string') {
        errors.push('You must have a string timestamp property on your message - use moment().format()');
    }

    //**** USE THIS WHILE YOU ARE JUST POSTING MESSAGES, NO USERID ****/
    if (!message.userId && typeof message.userId !== 'string') {
        errors.push('You must have a string userId property on your message');
    }

    //**** REPLACE ABOVE WITH THIS WHEN YOU HAVE ALL IMPLEMENTED USERS TO VALIDATE YOU ARE PASSING IN A CORRECT USERID ****/
    // validateUserId(message.userId)
    // .then(response => {
    //     if (response.status !== 200) {
    //         errors.push(response.msg);
    //     }
    //     if (errors.length) {
    //         cb({messages : errors})
    //         return;
    //     } else {
            return db.collection('messages')
            .add(message)
            .then(res => {
                cb(null, res.id);
            })
    //     }
    // }) 
}

export function createUser (user, cb) {
    let errors = [];
    if (!user.userName && typeof user.userName !== 'string') {
        errors.push('You must have a string userName on your user')
    }
    if (!user.password && typeof user.password !== 'string') {
        errors.push('You must have a string password on your user')
    }
    if (errors.length) {
        cb({messages : errors})
        return;
    } else {
        return db.collection('users')
        .add({
            ...user,
            loggedIn : true
        })
        .then(res => {
            cb(null, res.id);
        })
    }
}

export function login ({userName, password}, cb) {
    let errors = [];
    if (!userName && typeof userName !== 'string') {
        errors.push('You must provide a details object with a userName')
    }
    if (!password && typeof password !== 'string') {
        errors.push('You must provide a details object with a password')
    }
    if (errors.length) {
        return cb(errors);
    }
    return db.collection('users').get()
    .then(snap => {
        let userId;
        snap.forEach(doc => {
            const user = doc.data();
            if (
                user.userName === userName &&
                user.password === password
            ) userId = doc.id;
        })
        if (userId) {
            return Promise.all([
                userId,
                db.collection('users').doc(userId).update({loggedIn: true})
            ])
        } else return [null]
    })
    .then(([userId]) => {
        if (userId) {
            return cb(null, userId)
        } else {
            return cb(['No user found with this userName / password combination']);
        }
    })
}

export function logout (id, cb) {
    validateUserId(id)
    .then(res => {
        if (res.status !== 200) {
            cb(`Somehow, id ${id} appears to be invalid`)
        } else {
            db.collection('users').doc(id).update({loggedIn: false})
        }
    })
}

function insertIdProperty (doc) {
    return {
        ...doc.data(),
        id : doc.id
    }
}

function validateUserId (id, cb) {
    if (!id) return new Promise(res => res({
        status : 400,
        msg : 'No user id has been passed in!'
    }));
    if (typeof id !== 'string') return new Promise(res => res({
        status : 400,
        msg: `User ids must be a string - you passed in a ${typeof id}`
    }))
    return db.collection('users').doc(id)
    .get().then(doc => {
        if (doc.exists) {
            return {
                status : 200,
                msg : 'valid id!'
            };
        } else {
            return {
                status : 400,
                msg : `No user exists with id ${id}`
            }
        }
    });
}