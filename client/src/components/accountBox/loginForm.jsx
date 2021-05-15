import React, { useContext, useState } from "react";
import { Marginer } from "../marginer";
import validator from "validator";
import axios from "axios";
import {
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
  MutedLink,
  BoldLink,
  ErrorText,
} from "./common";
import { AccountContext } from "./accountContext";
import history from "../../history";

export function LoginForm(props) {
  const { switchtoSignUp } = useContext(AccountContext);
  const [Error, setError] = useState("");
  const [fields, handleFieldChange] = useState({
    email_username: "",
    password: "",
  });
  const handleInput = (e) => {
    handleFieldChange({ ...fields, [e.target.id]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const login = {
      email_username: fields.email_username,
      password: fields.password,
    };

    await axios.post("http://localhost:5000/signin", login).then((res) => {
      console.log(res.data);
      setError(res.data.message);
      if (res.data.status === "Success") {
        //switchtoVerifyOTP();
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token, (err) => {
          console.log(err);
        });
        history.push("/Chat");
      }
    });
  };
  return (
    <BoxContainer>
      <FormContainer>
        <ErrorText>{Error}</ErrorText>
        <Input
          id="email_username"
          type="email"
          placeholder="Email / Username"
          value={fields.email_username}
          onChange={handleInput}
        />
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={fields.password}
          onChange={handleInput}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forgot your Password?</MutedLink>
      <Marginer direction="vertical" margin={30} />
      <SubmitButton type="submit" onClick={onSubmit}>
        Login
      </SubmitButton>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchtoSignUp}>
          SignUp
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
