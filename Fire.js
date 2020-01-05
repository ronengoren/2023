// import uuid from "uuid";
// import getUserInfo from "./utils/getUserInfo";
// import shrinkImageAsync from "./utils/shrinkImageAsync";
// import uploadPhoto from "./utils/uploadPhoto";
import firebase from "firebase";

import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  MESSAGE_SENDER_ID,
  STORAGE_BUCKET
} from "react-native-dotenv";
// const firebase = require("firebase");
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: "",
  messagingSenderId: MESSAGE_SENDER_ID
};

let Firebase = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

// avoid deprecated warnings

export default Firebase;

// const collectionName = "project-6932705831746224621s";

// class Fire {
//   constructor() {
//     firebase.initializeApp({
//       apiKey: API_KEY,
//       authDomain: AUTH_DOMAIN,
//       databaseURL: DATABASE_URL,
//       projectId: PROJECT_ID,
//       storageBucket: STORAGE_BUCKET,
//       messagingSenderId: MESSAGE_SENDER_ID
//     });
//     firebase.auth().onAuthStateChanged(async user => {
//       if (!user) {
//         await firebase.auth().signInAnonymously();
//       }
//     });
//   }
//   getPaged = async ({ size, start }) => {
//     let ref = this.collection.orderBy("timestamp", "desc").limit(size);
//     try {
//       if (start) {
//         ref = ref.startAfter(start);
//       }

//       const querySnapshot = await ref.get();
//       const data = [];
//       querySnapshot.forEach(function(doc) {
//         if (doc.exists) {
//           const post = doc.data() || {};

//           // Reduce the name
//           const user = post.user || {};

//           const name = user.deviceName;
//           const reduced = {
//             key: doc.id,
//             name: (name || "Secret Duck").trim(),
//             ...post
//           };
//           data.push(reduced);
//         }
//       });

//       const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
//       return { data, cursor: lastVisible };
//     } catch ({ message }) {
//       alert(message);
//     }
//   };

//   // Upload Data
//   uploadPhotoAsync = async uri => {
//     const path = `${collectionName}/${this.uid}/${uuid.v4()}.jpg`;
//     return uploadPhoto(uri, path);
//   };

//   post = async ({ text, image: localUri }) => {
//     try {
//       const { uri: reducedImage, width, height } = await shrinkImageAsync(
//         localUri
//       );

//       const remoteUri = await this.uploadPhotoAsync(reducedImage);
//       this.collection.add({
//         text,
//         uid: this.uid,
//         timestamp: this.timestamp,
//         imageWidth: width,
//         imageHeight: height,
//         image: remoteUri,
//         user: getUserInfo()
//       });
//     } catch ({ message }) {
//       alert(message);
//     }
//   };

//   // Helpers
//   get collection() {
//     return firebase.firestore().collection();
//   }

//   get uid() {
//     return (firebase.auth().currentUser || {}).uid;
//   }
//   get timestamp() {
//     return Date.now();
//   }
// }
// Fire.shared = new Fire();

// export const db = firebase.firestore();

// export default Fire;
