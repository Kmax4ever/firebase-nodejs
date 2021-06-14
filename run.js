const firebase = require('firebase/app')
// const { Firestore } = require('@google-cloud/firestore');
// var app = firebase.initializeApp({
//     apiKey: "AIzaSyBtWHaJAxVwn-LR-Dug6z5QsyY1aXEM_hk",
//     authDomain: "my-fist-fire-base.firebaseapp.com",
//     databaseURL: "https://my-fist-fire-base.firebaseio.com",
//     projectId: "my-fist-fire-base",
//     storageBucket: "my-fist-fire-base.appspot.com",
//     messagingSenderId: "710247542015",
//     appId: "1:710247542015:web:9538a650c4f16e2fcc30ca"
// });
var fireBaseAdmin = require("firebase-admin");
const { random } = require('lodash')
var serviceAccount = require("./my-fist-fire-base-firebase-adminsdk-df2kk-129b6a0e83.json");

fireBaseAdmin.initializeApp({
    credential: fireBaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://my-fist-fire-base.firebaseio.com",
});


const db = fireBaseAdmin.firestore();


async function get() {
    const snapshot = await db.collection('messages').get();
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });
}
const users = {
    0: {
        name: 'Kontum',
        url: "https://lh3.googleusercontent.com/proxy/1_acZuOUd64lfI7NxGRkPgTawSjx6rLXgGCBrGt_TRVKm1-ztp4zYXSf5L20f6uCOOZ9y6RkNIAp5IiJ8VXdQjqqK6JU6XUayiUqGIGKsjr5I6xB-a-F"
    },
    1: {
        name: 'Kai',
        url: `https://sieupet.com/sites/default/files/gia-cho-shiba-inu-02-768x768_0.jpg`

    },
    2: {
        name: 'Biden',
        url: "https://image.thanhnien.vn/1024/uploaded/minhnguyet/2020_01_10/cho-pitbulll-4_nfps.jpg"

    },
    3: {
        name: 'Win',
        url: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Degaen.jpg"
    }
}



function loadMessages() {

//    var query = await db.collection('messages').where("type","==","image").get()

    var query = fireBaseAdmin.firestore()
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .limit(1);

    // Start listening to the query.
    query.onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            var message = change.doc.data();
            console.log(message);
        });
    });
}

async function sendMessage(message) {
    try {
        const idx = random(3)
        await db.collection('messages').add({

            name: users[`${idx}`].name,
            text: users[`${idx}`].name,
            profilePicUrl: users[`${idx}`].url,
            timestamp: fireBaseAdmin.firestore.FieldValue.serverTimestamp()
        })
        console.log('send message', Date.now());
    } catch (error) {
        console.error('Error writing new message to database', error);
    };


}

function loopSendMessage() {
    setInterval(async () => {
        await sendMessage(Date.now())
    }, 2000);
}

async function start() {
    loadMessages()
    loopSendMessage()

}

start()