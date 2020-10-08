export const environment = {
  name: 'development',
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBP2bEopJwWiWBleSXgQFg4DW3UMnmfRpE',
    authDomain: 'pole-emploi-trad-dev.firebaseapp.com',
    databaseURL: 'https://pole-emploi-trad-dev.firebaseio.com',
    projectId: 'pole-emploi-trad-dev',
    storageBucket: 'pole-emploi-trad-dev.appspot.com',
    messagingSenderId: '615733745472',
    appId: '1:615733745472:web:c14d5ad351090c67044ca5'
  },
  gcp: {
    apiKey: 'AIzaSyBraAcmG6FhlK4A9hCOfo96_s_OvYXEciQ'
  },
  sentry:{
    url:'https://953593ebcd8a40b4a2e743176c9488b8@sentry.io/5180549'
  },
  firefunction:{
    url:'https://us-central1-pole-emploi-trad-dev.cloudfunctions.net/rates',
    login: 'ludo', 
    password: '_#Q5g_1i9Z6lRFC'
  }
};