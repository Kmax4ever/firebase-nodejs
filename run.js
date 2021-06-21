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
const { random, update } = require('lodash')
var config = require("./config/key.json");

fireBaseAdmin.initializeApp({
    credential: fireBaseAdmin.credential.cert(config.firebase),
    databaseURL: "https://my-fist-fire-base.firebaseio.com",
});


const db = fireBaseAdmin.firestore();




function loadMessages() {

    //    var query = await db.collection('messages').where("type","==","image").get()
    var query = fireBaseAdmin.firestore()
        .collection('notices')
        .orderBy('timestamp', 'desc')
        .limit(3);

    // Start listening to the query.
    var ref;
    var message;
    query.onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            message = change.doc.data();
            message.doc_id = change.doc.id
            console.log(message);
        });
    });



}

function updateMessage(docId) {
    db.collection('notices').doc(id).update({ isView: true })
}


// async function sendMessage(message) {
//     try {
//         const idx = random(3)
//         await db.collection('notices').add({

//             name: users[`${idx}`].name,
//             text: users[`${idx}`].name,
//             profilePicUrl: users[`${idx}`].url,
//             timestamp: fireBaseAdmin.firestore.FieldValue.serverTimestamp()
//         })
//         console.log('send message', Date.now());
//     } catch (error) {
//         console.error('Error writing new message to database', error);
//     };


// }

// function loopSendMessage() {
//     setInterval(async () => {
//         await sendMessage(Date.now())
//     }, 2000);
// }

async function start() {
    loadMessages()
    //  loopSendMessage()

}

start()