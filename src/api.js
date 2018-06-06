import {db} from './config';




export const listenForNewMessages = cb =>  {
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
            if (change.type === 'modified') {
                acc.msg = 'user status change';
                acc.user = user;
            }
            return acc;
        }, {})
        if(userEvent.msg) cb(userEvent);
    })
}

export const postMessage  = (message, cb) => {
    let errors = []
    if (typeof message.text !== 'string') {
        errors.push('You must have a string text property on your message');
    }
    if (typeof message.timestamp !== 'string') {
        errors.push('You must have a string timestamp property on your message - use moment().format()');
    }
    return db.collection('messages')
    .add(message)
    .then(res => {
        cb(null, res.id);
    })

}

export const createUser = (user, cb) => {
    const {userName, password} = user;
    let errors = [];
    if (typeof userName !== 'string') {
        errors.push('You must have a string userName on your user')
    }
    if (typeof password !== 'string') {
        errors.push('You must have a string password on your user')
    }
    if (errors.length) {
        cb({messages : errors})
    } else {
        return db.collection('users').doc(userName).get()
            .then(({_document}) => (
                _document ? 
                Promise.reject({messages: ['user exists!']}) :
                db.collection('users').doc(userName).set({...user, loggedIn: true})
                )
            )
            .then((res) => console.log(res))
            .catch(err => cb(err))
    }
}

export const login =  ({userName, password}, cb) => {
    let errors = [];
    if (typeof userName !== 'string') {
        errors.push('You must provide a details object with a userName')
    }
    if (typeof password !== 'string') {
        errors.push('You must provide a details object with a password')
    }
    if (errors.length) {
        return cb({messages: errors});
    }
    return db.collection('users').doc(userName).get()
    .then(doc => {
        return !doc.exists ? Promise.reject({messages: 'no such user account'}) : 
            doc.data().password === password ? 
                db.collection('users').doc(userName).update({loggedIn : true}) :
                Promise.reject({messages: 'incorrect password'})
    })
    .then(() => cb(null, userName))
    .catch(err => cb(err))
       
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

function validateUserId (id) {
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
