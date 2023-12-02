import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(255, 255, 255, 0.3);
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  min-width: 400px;
  padding: 80px 100px;
  background-color: black;
  border-radius: 15px;
  position: relative;

  p {
    text-align: center;
    margin: 20px 0;
  }
`;
export const Form = styled.form`
  margin-top: 35px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;
export const Input = styled.input`
  padding: 25px 10px;
  border-radius: 10px;
  border: none;
  width: 100%;
  font-size: 16px;
  outline: none;
  background-color: black;

  &[type="text"],
  &[type="email"],
  &[type="password"] {
    color: white;
    &:focus {
      border: 2px solid #00acee;
    }
  }

  &[type="submit"] {
    margin-top: 20px;
    font-size: 20px;
    border-radius: 50px;
    background-color: #00acee;
    color: white;
    border: none;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;
export const InputWrapper = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  overflow: hidden;
`;
export const LogoImg = styled.img`
  position: absolute;
  width: 4%;
  top: 2%;
  left: 50%;
  transform: translateX(-50%);
`;
export const DisabledButton = styled.div`
  background-color: white;
  padding: 25px 10px;
  border-radius: 50px;
  opacity: 0.5;
  width: 100%;
  font-size: 20px;
  margin-top: 20x;
  color: black;
  text-align: center;
`;
export const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;
export const fadeIn = keyframes`
  0%{
   transform: translateY(20px);
   opacity: 0;
  }
  100%{
    transform: translateY(0px);
    opacity: 1;
  }
`;
export const Error = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  padding: 20px 10px;
  border-radius: 10px;
  animation: ${fadeIn} 500ms ease forwards;
  background-color: #fcc5d2;
  color: tomato;
`;
export const Close = styled.div`
  position: absolute;
  top: 2%;
  left: 2%;
  width: 30px;
  height: 30px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: black;
    opacity: 0.3;
  }
  svg {
    scale: 2;
  }
`;
export const Switcher = styled.span`
  margin-top: 20px;
  color: gray;
`;
