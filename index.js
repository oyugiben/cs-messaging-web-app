/* global process */
/* eslint-disable no-undef */

//Imports.
import express from 'express';
import { ParseServer } from 'parse-server';
import path from 'path';
import http from 'http';
import dotenv from 'dotenv';
import os from 'os';
import { spawn } from 'child_process';

export const app = express();

//Variables set-up.
dotenv.config();
const __dirname = path.resolve();
const mountPath = process.env.MOUNT_PATH || '/branch-cs-messaging-web-app';
const port = 1337;
let ipAddress;

// Function to get the ip address of the host machine.
function getLocalIpAddress(ipAddress) {
  return new Promise((resolve, reject) => {
    const ifaces = os.networkInterfaces();

    Object.keys(ifaces).forEach(ifname => {
      ifaces[ifname].forEach(iface => {
        if (iface.family === 'IPv4' && !iface.internal) {
          ipAddress = iface.address;
        }
      });
    });

    if (ipAddress) {
      console.log('🚀 ~ getLocalIpAddress ~ ipAddress:', ipAddress);
      resolve(ipAddress);
    } else {
      reject(new Error('Could not resolve the host machines ip address'));
    }
  });
}

//Parse Server configuration options.
export const config = {
  databaseURI: process.env.DATABASE_URI || 'mongodb://localhost:27017/branch-cs-messaging-app-1',
  cloud: __dirname + (process.env.CLOUD_CODE_FILE_LOCATION || '/cloud/main.js'),
  appId: process.env.APP_ID || 'branch-cs-messaging-web-app', //Set the app id as you see fit
  masterKey: process.env.MASTER_KEY || 'masterKey', //Set the master key as you see fit
  appName: process.env.APP_NAME || 'cs-messaging-app',
  serverURL: `http://localhost:${port}${mountPath}`,
  publicServerURL: `http://${ipAddress}:${port}${mountPath}`,
  liveQuery: ['ChatRooms'],
  mountPath: mountPath,
};

//Function to start the parse-server instance.
async function initializeParseServer() {
  try {
    //Get ip address.
    ipAddress = await getLocalIpAddress();
    config.publicServerURL = `http://${ipAddress}:${port}${mountPath}`;

    //Start parse server.
    //Serve the parse api
    const server = new ParseServer(config);
    await server.start();
    app.use(`${mountPath}`, server.app);

    //Serve the frontend
    // Serve the React app from the react-build folder
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    // Handle requests to the root URL
    app.get('/*', function (req, res) {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });

    const httpServer = http.createServer(app);
    httpServer.listen(port, function () {
      console.log(`Server running on port ${port}`);
    });
    //Enable liveQueries for realtime data.
    await ParseServer.createLiveQueryServer(httpServer);
  } catch (error) {
    console.log('🚀 ~ initializeParseServer ~ error:', error);
    throw new Error(error);
  }
}

function initializeParseDashboard() {
  return new Promise((resolve, reject) => {
    const initializeParseDash = spawn('parse-dashboard', [
      '--config',
      'parse-server-config.json',
      '--allowInsecureHTTP',
      'true',
    ]);

    let messageDetected = false;
    initializeParseDash.stdout.on('data', data => {
      console.log(`stdout: ${data}`);
      if (!messageDetected && data.includes('parse-dashboard is now running')) {
        messageDetected = true;
        resolve(); // Resolve the promise when the message is detected for the first time.
      }
    });

    initializeParseDash.stderr.on('data', data => {
      console.log(`stderr: ${data}`);
      reject(data.toString());
    });

    initializeParseDash.on('error', error => {
      console.log(`error: ${error}`);
      reject(error);
    });

    initializeParseDash.on('exit', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Parse Dashboard exited with code ${code}`));
      }
    });
  });
}

//Function to start the server
async function startServer() {
  await initializeParseServer();
  await initializeParseDashboard();
}

//Start the server
startServer();
