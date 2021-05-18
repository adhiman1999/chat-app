import React from "react";
//import { Link } from "react-router-dom";
import styled from "styled-components";
import Chat from "./Chat";

const ChatContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: #f9fbe7;
`;

export default function ChatApp() {
  return (
    <ChatContainer>
      <Chat />
    </ChatContainer>
  );
}
