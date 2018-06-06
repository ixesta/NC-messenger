import firebase from 'firebase';
import 'firebase/firestore';

const config = {
    API_KEY : 'AIzaSyAi5eXHtGpFNRpDtbtXqlQIR0weDpC3Qk4',
    DB_URL : 'https://nc-messenger-b72e3.firebaseio.com/',
    projectId: "nc-messenger-b72e3",
} 

firebase.initializeApp(config);

export const db = firebase.firestore();