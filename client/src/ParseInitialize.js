import Parse from 'parse';

// Initialize Parse
Parse.initialize(
    'branch-cs-messaging-web-app',
    ''
  );
  Parse.serverURL = 'http://localhost:1337/branch-cs-messaging-web-app';
  Parse.masterKey = 'N9IcW9EFc^WUjFbe6(!!L#uqvg^k33AD9LL!4LnPT+VhkPPqNk'

// Enable local data storage (optional)
Parse.enableLocalDatastore(true);

export default Parse;