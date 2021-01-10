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

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("buttonPress", () => {
    console.log("user pressed test button");
    io.emit("buttonPress");
  });
});
