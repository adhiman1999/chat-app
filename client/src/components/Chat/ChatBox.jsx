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
  const [messages, setMessages] = useState([""]);
  const [newMessage, setNewMessage] = useState("");
  const [newInput, setNewInput] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [userFriend, setUserFriend] = useState("Open a Conversation");
  const socket = useRef();
  const scrollRef = useRef();
  useEffect(() => {
    socket.current = io("wss://morning-scrubland-01222.herokuapp.com");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      props.currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, props.currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.id);
  }, [user]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "https://morning-scrubland-01222.herokuapp.com/messages/" +
            props.currentChat?._id
        );
        setMessages(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    const friendId = props.currentChat?.members.find((m) => m !== user.id);
    const getUser = async () => {
      try {
        const res = await axios.get(
          "https://morning-scrubland-01222.herokuapp.com/user?userId_username=" +
            friendId
        );
        setUserFriend(res.data.data.fullName);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
    getMessages();
  }, [props.currentChat, user.id]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNewInput("");
    console.log("newMessage", newMessage);
    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: props.currentChat._id,
    };

    socket.current?.emit("sendMessage", {
      senderId: user.id,
      receiverId: props.currentChat.members.find(
        (member) => member !== user.id
      ),
      text: newMessage,
    });
    setMessages([...messages, newMessage]);
    try {
      const res = await axios.post(
        "https://morning-scrubland-01222.herokuapp.com/message",
        message
      );
      console.log(res);

      //to clear the input after sending message
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
          <h2>{userFriend}</h2>
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
              messages.map((m, index) => (
                <div key={index} ref={scrollRef}>
                  <Message message={m} own={m.sender === user.id} />
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
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  setNewInput(e.target.value);
                }}
                value={newInput}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={newMessage.trim() === ""}
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
