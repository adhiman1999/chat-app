import React, { useContext, useState } from "react";
import { Marginer } from "../marginer";
//import validator from "validator";
/* import { useCookies } from "react-cookie"; */
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
  /* const [cookies, setCookie] = useCookies(['access_token']); */
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
    const login = {
      email_username: fields.email_username,
      password: fields.password,
    };

    await axios
      .post("https://morning-scrubland-01222.herokuapp.com/signin", login)
      .then((res) => {
        setError(res.data.message);
        if (res.data.status === "Success") {
          //switchtoVerifyOTP();
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
      <MutedLink>Don't have an account? </MutedLink>
      <BoldLink onClick={switchtoSignUp}>SignUp</BoldLink>
    </BoxContainer>
  );
}
