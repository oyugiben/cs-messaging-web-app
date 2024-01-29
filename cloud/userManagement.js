/* global Parse */
/* eslint-disable no-undef */

//Define role names.
const ADMIN_ROLE = 'Administrator';
const AGENT_ROLE = 'Agent';
const CUSTOMER_ROLE = 'Customer';

// Function to set up Admin and Agents roles.
async function setUpAdminAndAgents() {
  try {
    // Check if roles already exist
    const existingAdminRole = await new Parse.Query(Parse.Role)
      .equalTo('name', ADMIN_ROLE)
      .first({ useMasterKey: true });
    console.log('🚀 ~ setUpAdminAndAgents ~ existingAdminRole:', existingAdminRole);
    const existingAgentRole = await new Parse.Query(Parse.Role)
      .equalTo('name', AGENT_ROLE)
      .first({ useMasterKey: true });
    console.log('🚀 ~ setUpAdminAndAgents ~ existingAgentRole:', existingAgentRole);
    const existingCustomerRole = await new Parse.Query(Parse.Role)
      .equalTo('name', CUSTOMER_ROLE)
      .first({ useMasterKey: true });
    console.log('🚀 ~ setUpAdminAndAgents ~ existingCustomerRole:', existingCustomerRole);

    // Create Admin role if not exist
    if (!existingAdminRole) {
      console.log('No admin role');
      const adminRoleACL = new Parse.ACL();
      adminRoleACL.setPublicReadAccess(false);
      adminRoleACL.setPublicWriteAccess(false);

      //Create one admin
      const adminRole = new Parse.Role(ADMIN_ROLE, adminRoleACL);
      await adminRole.save(null, { useMasterKey: true });
      await signUpAdmin('admin@example.com', 'admin', 'pass');
    }

    // Create Agent role if not exist
    if (!existingAgentRole) {
      const agentRoleACL = new Parse.ACL();
      agentRoleACL.setPublicReadAccess(false);
      agentRoleACL.setPublicWriteAccess(false);

      const agentRole = new Parse.Role(AGENT_ROLE, agentRoleACL);
      await agentRole.save(null, { useMasterKey: true });

      //Create 5 new Admins
      for (let i = 0; i < 5; i++) {
        await signUpAgent(`agent${i + 1}@example.com`, `agent${i + 1}`, 'pass');
      }
    }

    // Create Customer role if not exist
    if (!existingCustomerRole) {
      const customerRoleACL = new Parse.ACL();
      customerRoleACL.setPublicReadAccess(false);
      customerRoleACL.setPublicWriteAccess(false);

      const customerRole = new Parse.Role(CUSTOMER_ROLE, customerRoleACL);
      await customerRole.save(null, { useMasterKey: true });

      //create 56 customers
      for (let i = 0; i < 56; i++) {
        await signUpCustomer(`customer${i + 1}@example.com`, `customer${i + 1}`, 'pass');
      }
    }
  } catch (error) {
    console.error('Error setting up Admin and Agents:', error);
    throw error;
  }
}

// Function to assign a user to a specific role.
async function assignRoleToUser(user, roleName) {
  const roleQuery = new Parse.Query(Parse.Role);
  roleQuery.equalTo('name', roleName);
  const role = await roleQuery.first({ useMasterKey: true });

  if (role) {
    role.getUsers().add(user);
    await role.save(null, { useMasterKey: true });
  } else {
    throw new Error(`Role ${roleName} not found`);
  }
}

//Get Customer.
export async function getCustomer(customerUserId) {
  if (!customerUserId) {
    throw new Error('Customer userId cannot be empty');
  }

  const customer = await new Parse.Query(Parse.User)
    .equalTo('objectId', customerUserId)
    .first({ useMasterKey: true });

  if (!customer) {
    throw new Error('Customer not found');
  }
  return customer;
}

//Get Agent.
export async function getAgent(agentUserId) {
  if (!agentUserId) {
    throw new Error('Agent userId cannot be empty');
  }

  const agent = await new Parse.Query(Parse.User)
    .equalTo('objectId', agentUserId)
    .first({ useMasterKey: true });

  if (!agent) {
    throw new Error('Customer not found');
  }
  return agent;
}

//Sign up admin.
export async function signUpAdmin(email, username, password) {
  if (!email || !username || !password) {
    throw new Error('Email, username, or password missing');
  }

  // Create admin user
  const adminUser = new Parse.User();
  adminUser.setEmail(email);
  adminUser.setUsername(username);
  adminUser.setPassword(password);

  // Save admin user
  await adminUser.signUp(null, { useMasterKey: true });

  // Assign the admin user to the Admin role
  await assignRoleToUser(adminUser, ADMIN_ROLE);

  return;
}

//Sign up agent.
export async function signUpAgent(email, username, password) {
  if (!email || !username || !password) {
    throw new Error('Email, username, or password missing');
  }

  // Create agent user
  const agentUser = new Parse.User();
  agentUser.setEmail(email);
  agentUser.setUsername(username);
  agentUser.setPassword(password);
  agentUser.set('customersAssigned', []);

  // Save agent user
  await agentUser.signUp(null, { useMasterKey: true });

  // Assign the agent user to the Agent role
  await assignRoleToUser(agentUser, AGENT_ROLE);

  return;
}

//Sign up customer.
export async function signUpCustomer(email, username, password) {
  if (!email || !username || !password) {
    throw new Error('Email, username, or password missing');
  }

  // Create customer user
  const customerUser = new Parse.User();
  customerUser.setEmail(email);
  customerUser.setUsername(username);
  customerUser.setPassword(password);
  customerUser.set('agentAssigned', undefined);

  // Save customer user
  await customerUser.signUp(null, { useMasterKey: true });

  // Assign the customer user to the Customer role
  await assignRoleToUser(customerUser, CUSTOMER_ROLE);

  return;
}

setUpAdminAndAgents();
