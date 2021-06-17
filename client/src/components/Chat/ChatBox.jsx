import { Avatar, IconButton, makeStyles } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import "./ChatBox.css";
import jwt from "jwt-decode";
import Message from "./Message";
import axios from "axios";
import { io } from "socket.io-client";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  chatMessage: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
}));
const ChatBox = (props) => {
  const token = localStorage.getItem("token");
  const user = jwt(token);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  //const [socket, setSocket] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:5000");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => {
      console.log("USERS", users);
    });
  }, [user]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/messages/" + props.currentChat?._id
        );
        setMessages(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [props.currentChat]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: props.currentChat._id,
    };

    try {
      const res = await axios.post("http://localhost:5000/message", message);
      setMessages([...messages, res.data.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  const classes = useStyles();
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__header__info">
          <h2>Room name</h2>
          <p>Last Seen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      {props.currentChat ? (
        <>
          <div className="chat__body">
            {messages.length === 0 ? (
              <span className="noConversationText">No Messages</span>
            ) : (
              messages.map((m) => (
                <div ref={scrollRef}>
                  <Message message={m} own={m.sender == user.id} />
                </div>
              ))
            )}
          </div>
          <div className="chat__footer">
            <form
              className={classes.chatMessage}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                id="standard-full-width"
                style={{ margin: 8 }}
                placeholder="Your message here"
                helperText="Send a message :)"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<SendIcon />}
                onClick={handleSubmit}
              >
                Send
              </Button>
            </form>
          </div>
        </>
      ) : (
        <span className="noConversationText">
          Open a conversation to start a chat
        </span>
      )}
    </div>
  );
};

export default ChatBox;
