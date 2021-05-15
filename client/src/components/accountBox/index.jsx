import React, { useState } from "react";
import styled from "styled-components";
import { LoginForm } from "./loginForm";
import { SignupForm } from "./signupForm";
import { OtpVerify } from "./otpVerify";
import { motion } from "framer-motion";
import { AccountContext } from "./accountContext";
const BoxContainer = styled.div`
  width: 300px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1 8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  top: -290px;
  left: -90px;
  background: rgb(34, 193, 195);
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
`;

const HeadContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 15%;
  left: 5%;
  /* box-shadow: 0 0 2px rgba(15, 15, 15, 0.28); */
  display: flex;
  flex-direction: column;
`;

const HeadText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.25;
  color: #fff;
  z-index: 10;
  margin: 0px;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0px;
  margin-top: 10px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.8em;
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    // transform: "rotate(50deg)"
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 1,
  stiffness: 30,
};

export function AccountBox(props) {
  const [email, setEmail] = useState("");
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signup");
  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 600);
  };

  const switchtoSignIn = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };
  const switchtoSignUp = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchtoVerifyOTP = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("verifyOTP");
    }, 400);
  };

  const contextValue = {
    switchtoSignUp,
    switchtoSignIn,
    switchtoVerifyOTP,
  };

  return (
    <AccountContext.Provider value={contextValue}>
      <BoxContainer>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          {active === "signin" && (
            <HeadContainer>
              <HeadText>Welcome</HeadText>
              <HeadText>Back</HeadText>
              <SmallText>Please Sign In to continue</SmallText>
            </HeadContainer>
          )}
          {active === "signup" && (
            <HeadContainer>
              <HeadText>Hello</HeadText>
              <SmallText>Please Sign up to register</SmallText>
            </HeadContainer>
          )}
          {active === "verifyOTP" && (
            <HeadContainer>
              <HeadText>One More Step</HeadText>
              <SmallText>
                Please enter the OTP sent to you on the registered email.
              </SmallText>
            </HeadContainer>
          )}
        </TopContainer>
        <InnerContainer>
          {active === "verifyOTP" && <OtpVerify email={email} />}
          {active === "signup" && <SignupForm handler={setEmail} />}
          {active === "signin" && <LoginForm />}
        </InnerContainer>
      </BoxContainer>
    </AccountContext.Provider>
  );
}
