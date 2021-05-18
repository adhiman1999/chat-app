import React from "react";
//import { Link } from "react-router-dom";
import styled from "styled-components";
import { AccountBox } from "./accountBox";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  justify-content: center;
`;

export default function Join() {
  return (
    <AppContainer>
      <AccountBox />
    </AppContainer>
  );
}
