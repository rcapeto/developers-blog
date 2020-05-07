import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
   apiKey: "AIzaSyDiwIh0c6_tmQJX4RHTA-m62SxDrPpHIvI",
   authDomain: "blog-programador.firebaseapp.com",
   databaseURL: "https://blog-programador.firebaseio.com",
   projectId: "blog-programador",
   storageBucket: "blog-programador.appspot.com",
   messagingSenderId: "129924560362",
   appId: "1:129924560362:web:8bbf390956de06308c6e93"
}

class Firebase{
   constructor(){
      if(firebase.apps.length === 0){
         firebase.initializeApp(firebaseConfig);
      }
      this.storage = firebase.storage();
   }
   isInitialized(){
      return new Promise(resolve =>{
         firebase.auth().onAuthStateChanged(resolve);
      });
   }
   getCurrent(){
      return firebase.auth().currentUser && firebase.auth().currentUser.email;
   }
   login(email, password){
      return firebase.auth().signInWithEmailAndPassword(email, password);
   }
   logout(){
      return firebase.auth().signOut();
   }
   async register(name, email, password){
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      const uid = firebase.auth().currentUser.uid;

      firebase.firestore().collection('users').doc(uid).set({
         name,
         email
      });
   }
   getUserNameAndEmail() {
      if(!firebase.auth().currentUser){
         return null;
      }
      const uid = firebase.auth().currentUser.uid;

      return firebase.firestore().collection('users').doc(uid).get();
   }
   getUserUid(){
      return firebase.auth().currentUser && firebase.auth().currentUser.uid;
   }
   createNewPost(name, title, description, url){
      return firebase.firestore().collection('posts').add({
         name,
         title,
         description,
         url,
         key: Date.now()
      });
   }
   getAllPosts(){
      return firebase.firestore().collection('posts').orderBy('key').get();
   }
}

export default new Firebase();