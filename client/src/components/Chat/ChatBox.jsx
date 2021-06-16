import { Avatar, IconButton, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import "./ChatBox.css";
import jwt from "jwt-decode";
import Message from "./Message";
import axios from "axios";

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
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/messages/" + props.currentChat?._id
        );
        setMessages(res.data.data);
        console.log(props.currentChat);
        console.log("HELLO", res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [props.currentChat]);

  console.log("YO", messages.length);
  const handleSubmit = (e) => {
    e.preventDefault();
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
              <span>No messsges</span>
            ) : (
              messages.map((m) => (
                <Message message={m} own={m.sender == user.id} />
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
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<SendIcon />}
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
