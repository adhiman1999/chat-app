import React from "react";
import { ChatBody } from "./common";
import Sidebar from "./Sidebar";
import ChatBox from "./ChatBox";
export default function Chat(props) {
  return (
    <ChatBody>
      <Sidebar />
      <ChatBox />
    </ChatBody>
  );
}
