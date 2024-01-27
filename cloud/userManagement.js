/* global Parse */
/* eslint-disable no-undef */

//Define role names.
const ADMIN_ROLE = 'Admin';
const AGENT_ROLE = 'Agent';
const CUSTOMER_ROLE = 'Customer';

//Function to create roles if they don't exist.
async function createRolesIfNotExist() {
  const adminRoleACL = new Parse.ACL();
  adminRoleACL.setPublicReadAccess(false);
  adminRoleACL.setPublicWriteAccess(false);

  const agentRoleACL = new Parse.ACL();
  agentRoleACL.setPublicReadAccess(false);
  agentRoleACL.setPublicWriteAccess(false);

  const customerRoleACL = new Parse.ACL();
  customerRoleACL.setPublicReadAccess(false);
  customerRoleACL.setPublicWriteAccess(false);

  // Create Admin role
  const adminRole = new Parse.Role(ADMIN_ROLE, adminRoleACL);
  await adminRole.save(null, { useMasterKey: true });

  // Create Agent role
  const agentRole = new Parse.Role(AGENT_ROLE, agentRoleACL);
  await agentRole.save(null, { useMasterKey: true });

  // Create Customer role
  const customerRole = new Parse.Role(CUSTOMER_ROLE, customerRoleACL);
  await customerRole.save(null, { useMasterKey: true });
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

  // Save customer user
  await customerUser.signUp(null, { useMasterKey: true });

  // Assign the customer user to the Customer role
  await assignRoleToUser(customerUser, CUSTOMER_ROLE);

  return;
}

createRolesIfNotExist();
