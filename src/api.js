import { db } from './config';

export const listenForNewMessages = cb => {
    db.collection('messages').onSnapshot(snap => {
        const newMessages = snap.docChanges.map((change) => change.doc.data());
        cb(newMessages)
    })
}

export const listenToUsers = cb => {
    db.collection('users').onSnapshot(snap => {
        const users = snap.docChanges.map((change) => {
            return { message: change.message, user: change.doc.data() }
        })
        cb(users);
    })
}

export const postMessage = (message, cb) => {
    const { text, timestamp } = message
    let errors = []
    if (!text || typeof text !== 'string') {
        errors.push('You must have a string text property on your message');
    }
    if (!timestamp || typeof timestamp !== 'string') {
        errors.push('You must have a string timestamp property on your message - use moment().format()');
    }
    return db.collection('messages')
        .add(message)
        .then(res => {
            cb(null, res.id);
        })

}

export const createUser = (user, cb) => {
    const { userName, password } = user;
    let errors = [];
    if (!userName || typeof userName !== 'string') {
        errors.push('You must have a string userName on your user')
    }
    if (!password || typeof password !== 'string') {
        errors.push('You must have a string password on your user')
    }
    if (errors.length) {
        cb({ messages: errors })
    } else {
        return db.collection('users').doc(userName).get()
            .then(doc => (
                doc.exists ?
                    Promise.reject({ messages: ['user already exists!'] }) :
                    db.collection('users').doc(userName).set({ ...user, loggedIn: true })
            )
            )
            .then((res) => cb(null, { userName, loggedIn: true }))
            .catch(err => cb(err))
    }
}

export const login = ({ userName, password }, cb) => {
    let errors = [];
    if (!userName || typeof userName !== 'string') {
        errors.push('You must provide a details object with a userName')
    }
    if (!password || typeof password !== 'string') {
        errors.push('You must provide a details object with a password')
    }
    if (errors.length) {
        return cb({ messages: errors });
    }
    return db.collection('users').doc(userName).get()
        .then(doc => {
            return !doc.exists ? Promise.reject({ messages: 'no such user account' }) :
                doc.data().password === password ?
                    db.collection('users').doc(userName).update({ loggedIn: true }) :
                    Promise.reject({ messages: 'incorrect password' })
        })
        .then(() => cb(null, { userName, loggedIn: true }))
        .catch(err => cb(err))

}

export function logout(userName, cb) {
    const err = { messages: 'you appear to be logging out someone who does not exist!' }
    if (!userName) return cb(err)
    return db.collection('users').doc(userName).get()
        .then(doc => {
            !doc.exists ?
                cb(err) :
                db.collection('users').doc(userName).update({ loggedIn: false }) && cb(null, { userName, loggedIn: false })
        })
}


