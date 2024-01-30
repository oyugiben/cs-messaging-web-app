/* global Parse */
/* eslint-disable no-undef */
import * as userManagement from './userManagement.js';

const CustomerMessages = Parse.Object.extend('CustomerMessages');
const AgentMessages = Parse.Object.extend('AgentMessages');
const ChatRooms = Parse.Object.extend('ChatRooms');

//Function to assign customer to agent.
async function assignAgentToCustomer(customer) {
  try {
    // Query for the "Agent" role.
    const agentRoleQuery = new Parse.Query(Parse.Role);
    agentRoleQuery.equalTo('name', 'Agent');
    const agentRole = await agentRoleQuery.first({ useMasterKey: true });

    if (!agentRole) {
      throw new Error('Agent role not found');
    }

    // Query for users with the "Agent" role.
    const agentQuery = agentRole.relation('users').query();
    agentQuery.include('customersAssigned');
    agentQuery.descending('customersAssigned.length');

    // Find the agent(s) with the least number of assigned customers.
    const agents = await agentQuery.find({ useMasterKey: true });
    if (!agents || agents.length === 0) {
      throw new Error('No agents were found');
    }

    // Randomly pick one of the agents with the least customers.
    const chosenAgent = agents[Math.floor(Math.random() * agents.length)];

    // Add the customer pointer to the chosen agent's assignedCustomers array.
    chosenAgent.addUnique('customersAssigned', customer);
    await chosenAgent.save(null, { useMasterKey: true });

    // Update the customer's agentAssigned field.
    customer.set('agentAssigned', chosenAgent);
    await customer.save(null, { useMasterKey: true });

    return chosenAgent;
  } catch (error) {
    console.error('Error assigning agent to customer:', error);
    throw error;
  }
}

//Creating Chatroom object
async function createChatRoom(customer, agent, customerMessage) {
  if (!customer || !customerMessage || !agent) {
    throw new Error('create chat room error. customer, agent or message missing');
  }
  const chatRoom = new ChatRooms();
  chatRoom.set('customer', customer);
  chatRoom.set('agent', agent);
  chatRoom.set('messages', [customerMessage]);
  await chatRoom.save(null, { useMasterKey: true });

  agent.addUnique('chatrooms', chatRoom);
  await agent.save(null, { useMasterKey: true });

  return;
}

//Get chat room.
async function getChatRoom(chatRoomId) {
  if (!chatRoomId) throw new Error('Get chatroom error, no customer provided');

  const chatRoom = await new Parse.Query('ChatRooms')
    .equalTo('objectId', chatRoomId)
    .first({ useMasterKey: true });

  if (!chatRoom) throw new Error('Get chatroom error, no chat room found');

  return chatRoom;
}

//Update chatroom. Add messages to chatro
async function updateChatroom(chatRoom, customerMessage = null, agentMessage = null) {
  if (!chatRoom) return new Error('Get chatroom error, no chat room found');
  if (!customerMessage && !agentMessage) throw new Error('Get chatroom error, no message passed');

  if (!customerMessage) {
    chatRoom.addUnique('messages', agentMessage);
    await chatRoom.save();
  } else {
    chatRoom.addUnique('messages', customerMessage);
    await chatRoom.save();
  }

  return;
}

//Creating customer Message
async function createCustomerMessage(customer, agent, messageBody) {
  //Create a new CustomerMessages object
  const customerMessage = new CustomerMessages();
  customerMessage.set('customer', customer);
  customerMessage.set('agent', agent);
  customerMessage.set('messageBody', messageBody);
  customerMessage.set('isRead', false);
  await customerMessage.save(null, { useMasterKey: true });
  return customerMessage;
}

async function createAgentMessage(customer, agent, messageBody) {
  const agentMessage = new AgentMessages();
  agentMessage.set('customer', customer);
  agentMessage.set('agent', agent);
  agentMessage.set('messageBody', messageBody);
  agentMessage.set('isRead', false);
  await agentMessage.save(null, { useMasterKey: true });
  return agentMessage;
}

export async function sendCustomerMessage(customerUserId, messageBody) {
  let agentAssigned;

  //get Customer
  const customer = await userManagement.getCustomer(customerUserId);

  //Check if assigned to an Agent.
  if (!customer.get('agentAssigned')) {
    agentAssigned = await assignAgentToCustomer(customer);
    const customerMessage = await createCustomerMessage(customer, agentAssigned, messageBody);
    await createChatRoom(customer, agentAssigned, customerMessage);
  } else {
    agentAssigned = customer.get('agentAssigned');
    const customerMessage = await createCustomerMessage(customer, agentAssigned, messageBody);
    const chatRoom = await getChatRoom(customer);
    await updateChatroom(chatRoom, customerMessage);
  }

  return;
}

export async function sendAgentMessage(chatRoomId, agentUserId, messageBody) {
  const chatRoom = await getChatRoom(chatRoomId);
  console.log('🚀 ~ sendAgentMessage ~ chatRoom:', chatRoom);
  const agent = await userManagement.getAgent(agentUserId);
  const customer = chatRoom.get('customer');
  const agentMessage = await createAgentMessage(customer, agent, messageBody);
  await updateChatroom(chatRoom, agentMessage);
  return;
}
