require("dotenv").config();
const express = require("express");
const firebase = require("firebase");
require("firebase/auth");
require("firebase/database");
const socket = require("socket.io");

// firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSENGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

// initialize firebase
// firebase.initializeApp(firebaseConfig);
// const db = firebase.database();

const app = express();
const port = 3000;

const server = app.listen(port, () => {
  console.log("server is running on port: " + port);
});

const io = socket(server, {
  cors: {
    origin: "*",
  },
});

// temp in memory data
const room1db = {
  paused: true,
  lastPlayTime: null,
  timeLeft: 600,
};

const room2db = {
  paused: true,
  lastPlayTime: null,
  timeLeft: 600,
};

const buttonPressHelper = (roomId) => {
  let db = room1db;
  if (roomId === 2) {
    db = room2db;
  }

  db.paused = !db.paused;
  if (!db.paused) {
    db.lastPlayTime = Date.now();
  } else {
    db.timeLeft -= Math.floor((Date.now() - db.lastPlayTime) / 1000);
  }
  io.to(roomId).emit("buttonPress", {
    paused: db.paused,
  });
};

io.on("connection", (socket) => {
  socket.on("connectionStart", (initialClientState) => {
    // join specified room
    socket.join(initialClientState.roomId);
    console.log("client joined room: " + initialClientState.roomId);

    let db = room1db;
    if (initialClientState.roomId === 2) {
      db = room2db;
    }

    let timeAdjustment = 0;
    if (!db.paused) {
      timeAdjustment = Math.floor((Date.now() - db.lastPlayTime) / 1000);
    }

    io.to(socket.id).emit("connectionStart", {
      paused: db.paused,
      timeLeft: db.timeLeft - timeAdjustment,
    });
  });

  socket.on("buttonPress", (clientState) => {
    console.log("user in room: " + clientState.roomId + " pressed test button");
    buttonPressHelper(clientState.roomId);
  });
});
