import React from "react";
import "./Message.css";
import { format } from "timeago.js";
function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <p className="message__text">{message.text}</p>
      <div className="message__time">{format(message.createdAt)}</div>
    </div>
  );
}

export default Message;
