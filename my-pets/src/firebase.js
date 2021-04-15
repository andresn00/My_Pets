import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDINwjzf1oXZt-L7TkZmoseJyE4864OAPg",
    authDomain: "mypets-fc91f.firebaseapp.com",
    projectId: "mypets-fc91f",
    storageBucket: "mypets-fc91f.appspot.com",
    messagingSenderId: "667439654948",
    appId: "1:667439654948:web:f3d53c81ba07388f1b50b1",
    measurementId: "G-K5Q2N6W2X0"
};
  
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
}

export const generateUserDocument = async (user, nombre = '', isVet = false) => {
    if (!user) return;
    const userRef = firestore.collection('users').doc(user.uid);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email } = user;
        const userDoc = {
            email,
            nombre,
            isVet
        }
        try {
            await userRef.set(userDoc);
        } catch (error) {
            console.log("Error creating user document", error)
        }
    }
    return getUserDocument(user.uid)
}
const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.collection('users').doc(uid).get();
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
};
  
