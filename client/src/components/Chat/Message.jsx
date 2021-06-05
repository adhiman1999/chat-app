import React from "react";
import "./Message.css";
function Message({ message, own }) {
  console.log(message);
  return (
    <div className={own ? "message__own" : "message"}>
      <p className="message__text">{message.text}</p>
      <div className="message__time">{message.createdAt}</div>
    </div>
  );
}

export default Message;
