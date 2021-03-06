const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const db = require("./db");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const router = require("./router");
const cors = require("cors");

const app = express();
//const server = http.createServer(app);

db.connect(process.env.DB_HOST);

app.use(express.json());
app.use(cors({ origin: true }));
app.use(router);

//<------------------HTTP Server------------------------------->
const server = app.listen(PORT, () =>
  console.log(`server has started on port ${PORT}`)
);

//<------------------socket.io (WebSocket) Server-------------->
const io = require("socket.io")(server, {
  cors: {
    origin: "https://stupefied-shockley-9c27be.netlify.app",
  },
});

//<--------------------users----------------------------------->
let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
//<------------------------------------------------------------>
io.on("connection", (socket) => {
  //<-------------on new connection------>
  console.log("We have a new connection");
  //<-------------on disconnection------->
  socket.on("disconnect", () => {
    console.log("User has left");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  //<------------messages--------------->
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    try {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    } catch (err) {
      console.log(err);
    }
  });
  io.emit("welcome", "Greetings from the sockets");
});
