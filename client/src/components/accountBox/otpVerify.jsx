import React, { useContext, useState } from "react";
import { Marginer } from "../marginer";
import axios from "axios";
import {
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
  ErrorText,
} from "./common";
import { AccountContext } from "./accountContext";

export function OtpVerify(props) {
  const [fields, handleFieldChange] = useState({
    otp: "",
  });

  const [Error, setError] = useState("");
  const { switchtoSignIn } = useContext(AccountContext);
  const onSubmit = async (e) => {
    e.preventDefault();
    const otp = {
      OTP: fields.otp,
      email: props.email,
    };
    await axios
      .post("https://morning-scrubland-01222.herokuapp.com/verify-otp", otp)
      .then((res) => {
        setError(res.data.message);
        if (res.data.status === "Success") {
          switchtoSignIn();
        } else {
          setError("OTP not verified.");
        }
      });
  };
  const handleInput = (e) => {
    handleFieldChange({ ...fields, [e.target.id]: e.target.value });
  };
  return (
    <BoxContainer>
      <FormContainer>
        <ErrorText>{Error}</ErrorText>
        <Input id="otp" type="code" placeholder="OTP" onChange={handleInput} />
      </FormContainer>
      {/*       <Marginer direction="vertical" margin={10} />
    <MutedLink href="#">Forgot your Password?</MutedLink>*/}
      <Marginer direction="vertical" margin={30} />
      <SubmitButton type="submit" onClick={onSubmit}>
        Verify
      </SubmitButton>
      {/* <Marginer direction="vertical" margin={10} /> */}
      {/* <MutedLink href="#">
      Don't have an account?{" "}
      <BoldLink href="#" onClick={switchtoSignIn}>
        Verify
      </BoldLink>
    </MutedLink> */}
    </BoxContainer>
  );
}
