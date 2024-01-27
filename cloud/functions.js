/* global Parse */
/* eslint-disable no-undef */
import * as userManagement from './userManagement.js';

//Cloud functions

//Function to test connection to server.
Parse.Cloud.define('testConnection', () => {
  return 'Success';
});

//Functions needed:
//Sign up sdministrator.
Parse.Cloud.define('signUpAdmin', async req => {
  const { email, username, password } = req.params;
  await userManagement.signUpAdmin(email, username, password);
});

//Sign up agent
Parse.Cloud.define('signUpAgent', async req => {
  const { email, password, username } = req.params;
  await userManagement.signUpAgent(email, password, username);
});

//Sign up client
Parse.Cloud.define('signUpCustomer', async req => {
  const { email, password, username } = req.params;
  await userManagement.signUpCustomer(email, password, username);
});