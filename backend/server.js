const express = require("express");
const socket = require("socket.io");

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
let paused = true;
let lastPlayTime = null;
let timeLeft = 600;

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
