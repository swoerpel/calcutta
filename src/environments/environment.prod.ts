export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyAa-fZUXVeX3HYbTGfWRiQ1R-kSKVMhg28",
    authDomain: "calcutta-a2e90.firebaseapp.com",
    databaseURL: "https://calcutta-a2e90.firebaseio.com",
    projectId: "calcutta-a2e90",
    storageBucket: "calcutta-a2e90.appspot.com",
    messagingSenderId: "641372293374",
    appId: "1:641372293374:web:0c5cab691cdad551837daf"
  },
  firebase_auth: {
      authGuardFallbackURL: 'login',
      authGuardLoggedInURL: 'rooms-list',
      guardProtectedRoutesUntilEmailIsVerified: false,
      enableEmailVerification: false, 
      passwordMinLength: 8
  }
};
