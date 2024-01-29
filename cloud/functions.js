/* global Parse */
/* eslint-disable no-undef */
import * as userManagement from './userManagement.js';
import * as messagesManagement from './messagesManagement.js';

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

//Send message to branch
Parse.Cloud.define('sendMessageToBranch', async req => {
  const { customerUserId, messageBody } = req.params;
  await messagesManagement.sendCustomerMessage(customerUserId, messageBody);
});

//Send message to customer
Parse.Cloud.define('sendMessageToCustomer', async req => {
  const { chatRoomId, agentUserId, messageBody } = req.params;
  await messagesManagement.sendCustomerMessage(chatRoomId, agentUserId, messageBody);
});
