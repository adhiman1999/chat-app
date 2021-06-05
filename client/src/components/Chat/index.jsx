import React, { useState } from "react";
import { ChatBody } from "./common";
import Sidebar from "./Sidebar";
import ChatBox from "./ChatBox";
export default function Chat(props) {
  const [currentChat, setCurrentChat] = useState(null);
  return (
    <ChatBody>
      <Sidebar handler={setCurrentChat} />
      <ChatBox currentChat={currentChat} />
    </ChatBody>
  );
}
