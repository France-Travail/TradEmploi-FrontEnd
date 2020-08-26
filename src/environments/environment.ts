export const environment = {
  name: 'prod',
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyD4ZAtJqO803JkMYvxun7WmiuU22hn97dE",
    authDomain: "pole-emploi-trad.firebaseapp.com",
    databaseURL: "https://pole-emploi-trad.firebaseio.com",
    projectId: "pole-emploi-trad",
    storageBucket: "pole-emploi-trad.appspot.com",
    messagingSenderId: "860693433183",
    appId: "1:860693433183:web:6afdaa4433c69f098204ea"
  },
  gcp: {
    apiKey: 'AIzaSyBraAcmG6FhlK4A9hCOfo96_s_OvYXEciQ'
  },
  sentry:{
    url:'https://953593ebcd8a40b4a2e743176c9488b8@sentry.io/5180549'
  },
  firefunction:{
    url:'https://us-central1-pole-emploi-trad.cloudfunctions.net/rates',
    login: 'ludo', 
    password: '_#Q5g_1i9Z6lRFC'
  }
};