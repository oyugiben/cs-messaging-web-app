/* global Parse */
/* eslint-disable no-undef */

//Cloud functions

//Function to test connection to cloud functions.
Parse.Cloud.define('testConnection', () =>{
    return "Success";
});