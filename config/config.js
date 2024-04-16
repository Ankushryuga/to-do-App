//
const ip=require("ip");
exports.configurations={
      // timeout maximum sockets
  timeOut: 120000,
  maxSockets: 1000000,
  serverConnection: false,
  //To enable https
  httpsEnable: false,
  redis: false,
  httpsOptions: {},

    To_Do_Application:{
        host:ip.address(),
        serverPort:5454
    },
};