/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars


// import firebase from "firebase";
import firebase from 'firebase/app'
import "firebase/database"
import 'firebase/firestore';

import { db } from "../../src/firebase";
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    // deconstruct the individual properties
    send() {
      const id =1010;
      console.log("hi  hi hi hi")

      const firebaseConfig = {
        apiKey: "AIzaSyAEoBb1_fnHXoJEjA-ToUSR5aanufXVn3k",
        authDomain: "first-project-19f5d.firebaseapp.com",
        projectId: "first-project-19f5d",
        storageBucket: "first-project-19f5d.appspot.com",
        messagingSenderId: "736720204279",
        appId: "1:736720204279:web:f883f28ef93a88cd0abef2",
        measurementId: "G-4T8R5QWG7D"
      };
      
      firebase.initializeApp(firebaseConfig);
      const db = firebase.firestore();

      await db.collection("Messages").orderBy('createdAt')
      //  .add({
      //     text: "hi for test",
      //     id:id,
      //     // photoURL,
      //     //createdAt:'10/10/2020'
      //      createdAt: firebase.firestore.FieldValue.serverTimestamp()
      // })

      return null
    },
  })
}
