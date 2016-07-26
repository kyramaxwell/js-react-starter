import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAHZBueTBV9aG29WtBXrwdVSfMBLjNRklY',
  authDomain: 'reacthw.firebaseapp.com',
  databaseURL: 'https://reacthw.firebaseio.com',
  storageBucket: 'reacthw.appspot.com',
};
firebase.initializeApp(config);


// Get a reference to the database service
const database = firebase.database();

export function fetchNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    callback(snapshot);
  });
}

export function removeNote(id) {
  database.ref('notes').child(id).remove();
}

export function updateNoteLoc(id, ui) {
  database.ref('notes').child(id).update({ x: ui.x, y: ui.y });
}

export function updateNoteText(id, textvalue) {
  database.ref('notes').child(id).update({ text: textvalue });
}

export function createNote(note) {
  const newNoteKey = database.ref('notes').push(note).key;
  return newNoteKey;
}
