const express = require('express');
const app = express();
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { configurations } = require("../config/config");
let https = require("https");
const socket = require("socket.io");
let protocol = require("http");


var protocolName = "http";
var options = {};

// Check for valid port
function normalize(val) {
  let port = parseInt(val);
  if (isNaN(port)) {
    return val;
  }
  if (port > 0) {
    return port;
  }
  return false;
}

let port = normalize(process.env.SERVRE_PORT || configurations.To_Do_Application.serverPort);

// Checking for protocol configurations (http/https)
// var protocol = http;
if (configurations.httpsEnable === true) {
  protocol = https;
  protocolName = "https";
  options = {
    key: fs.readFileSync(path.join(__dirname, '../cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../cert', 'cert.pem'))
  };
}

protocol.globalAgent.maxSockets = configurations.maxSockets;
protocol.globalAgent.keepAlive = true;

var server = protocol.createServer(options, app);
try {
  server.listen(port, configurations.To_Do_Application.host, function () {
    server.timeout = configurations.timeOut;
    console.log("Server is running on: " + configurations.To_Do_Application.host + ":" + port);
  });

  const io = socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true
    }
  });
  exports.io = io;
} catch (error) {
  console.error("FROM www.js: " + error);
}
