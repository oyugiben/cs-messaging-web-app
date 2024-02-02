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
  await messagesManagement.sendAgentMessage(chatRoomId, agentUserId, messageBody);
});

//Get chatRoom
Parse.Cloud.define('getChatRoom', async req => {
  const customer = req.params;
  const chatRoom = await messagesManagement.getChatRoom(customer);
  return chatRoom;
});

//Get chatRooms
Parse.Cloud.define('getChatRooms', async req => {
  const { agentId } = req.params;
  const chatrooms = await messagesManagement.getChatRooms(agentId);
  return chatrooms;
});

//Search for user in chatrooms
Parse.Cloud.define('getCustomerByUsername', async req => {
  const { customerUsername, agentId } = req.params;
  console.log('🚀 ~ agentId:', agentId);
  console.log('🚀 ~ customerUsername:', customerUsername);
  const customer = await userManagement.getCustomerByUsername(customerUsername, agentId);
  return customer;
});

//Mark messages as read
Parse.Cloud.define('readCustomerMessage', async req => {
  const { customerMessageId } = req.params
  await messagesManagement.readCustomerMessage(customerMessageId);
});
