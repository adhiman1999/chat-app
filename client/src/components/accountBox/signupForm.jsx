import React, { useContext, useState } from "react";
import { Marginer } from "../marginer";
import axios from "axios";
import validator from "validator";
import { AccountContext } from "./accountContext";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  ErrorText,
  MutedLink,
  SubmitButton,
} from "./common";

export function SignupForm(props) {
  const [fields, handleFieldChange] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  var [Error, setError] = useState("");
  //const [passwordError, setPasswordError] = useState("");
  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setError("");
    } else {
      setError("Enter valid Email!");
    }
  };

  const validatePassword = (e) => {
    var password = e.target.value;
    if (fields.password === password) {
      setError("");
    } else {
      setError("Passwords don't match :(");
    }
  };
  const handleInput = (e) => {
    handleFieldChange({ ...fields, [e.target.id]: e.target.value });
    if (e.target.id === "email") {
      validateEmail(e);
    }
    if (e.target.id === "confirmPassword") {
      validatePassword(e);
    }
  };
  const validateForm = () => {
    return (
      fields.email.length > 0 &&
      validator.isEmail(fields.email) &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    props.handler(fields.email);
    const registered = {
      fullName: fields.fullName,
      username: fields.username,
      email: fields.email,
      password: fields.password,
    };

    if (validateForm()) {
      await axios
        .post("http://localhost:5000/signup", registered)
        .then((res) => {
          setError(res.data.message);
          if (res.data.status === "Success") {
            switchtoVerifyOTP();
          }
        });
    } else {
      setError("Credentials not valid!");
    }
  };
  const { switchtoSignIn, switchtoVerifyOTP } = useContext(AccountContext);
  return (
    <BoxContainer>
      <FormContainer>
        <ErrorText>{Error}</ErrorText>
        <Input
          id="fullName"
          type="text"
          placeholder="Full Name"
          value={fields.fullName}
          onChange={handleInput}
        />
        <Input
          id="username"
          type="text"
          placeholder="Username"
          value={fields.username}
          onChange={handleInput}
        />
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={fields.email}
          onChange={handleInput}
        />
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={fields.password}
          onChange={handleInput}
        />
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={fields.confirmPassword}
          onChange={handleInput}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <Marginer direction="vertical" margin={30} />
      <SubmitButton
        type="submit"
        value="Submit"
        disabled={!validateForm}
        onClick={onSubmit}
      >
        Register
      </SubmitButton>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Already have an account? </MutedLink>
      <BoldLink href="#" onClick={switchtoSignIn}>
        SignIn
      </BoldLink>
    </BoxContainer>
  );
}
