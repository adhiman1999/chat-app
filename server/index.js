const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");
const db = require("./db");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const router = require("./router");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

db.connect(process.env.DB_HOST);

io.on("connection", (socket) => {
  console.log("We have a new connection");

  socket.on("disconnect", () => {
    console.log("User has left");
  });
});

app.use(express.json());
app.use(cors({ origin: true }));
app.use(router);

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));
