import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;
export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const MutedLink = styled.a`
  font-size: 12px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
  text-decoration: none;
  align-items: center;
`;
export const BoldLink = styled.a`
  font-size: 12px;
  color: rgb(34, 193, 195);
`;

export const ErrorText = styled.h2`
  font-size: 11px;
  font-weight: 200;
  line-height: 1.25;
  color: #b00020;
  z-index: 10;
  margin: 0px;
`;

export const Input = styled.input`
  height: 42px;
  width: 100%;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 250ms ease-in-out;
  &:placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:last-of-type {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &:focus {
    outline: none;
    border-bottom: 3px solid rgb(34, 193, 195);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 11px 40%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border-radius: 100px 100px 100px 100px;
  border: 1px solid rgba(200, 200, 200, 0.3);
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(67, 192, 172);

  &:hover {
    filter: brightness(1.05);
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  }
  &:focus {
    outline: none;
  }
`;
