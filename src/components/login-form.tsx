import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Dash } from "./common-conponents";
import { Close, Container, DisabledButton, Error, Form, Input, InputWrapper, LogoImg, Switcher, Title, Wrapper } from "./auth-components";
import GithubButton from "./github-login";
import AuthSwither from "./auth-switcher";
import styled from "styled-components";

const ForgotPassword = styled.button`
  padding: 10px 10px;
  font-size: 16px;
  background-color: black;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50px;
  margin: 15px 0 30px 0;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export default function LoginForm({ onVisible }: { onVisible: any }) {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    email: "",
    password: "",
  });
  const [check, setCheck] = useState(false);
  const [error, setError] = useState("");
  const { email, password } = accountInfo;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setAccountInfo({
      ...accountInfo,
      [name]: value,
    });
    if (accountInfo) {
      const { email, password } = accountInfo;
      if (name !== "" && email !== "" && password !== "") {
        setCheck(true);
      } else if (name === "" || email === "" || password === "") {
        setCheck(false);
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      setError("");
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onClick = () => {
    navigate("/reset-password");
  };
  return (
    <>
      <Wrapper>
        <Container>
          <Close
            onClick={() => {
              onVisible("login", false);
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Close>
          <LogoImg src="/X_logo_2023_(white).png" />
          <Title marginValue={"20px"}>X 가입하기</Title>
          <GithubButton isLogin={true} widthValue={false} />
          <p>
            <Dash>―――――――――――</Dash> 또는 <Dash>―――――――――――</Dash>
          </p>
          <Form onSubmit={onSubmit}>
            <InputWrapper>
              <Input onChange={onChange} name="email" value={email} type="email" placeholder="이메일" required />
            </InputWrapper>
            <InputWrapper>
              <Input onChange={onChange} name="password" value={password} placeholder="비밀번호" type="password" required />
            </InputWrapper>
            {check ? <Input className="submit" type="submit" value={isLoading ? "로그인중..." : "로그인"} /> : <DisabledButton>로그인</DisabledButton>}
          </Form>
          <ForgotPassword onClick={onClick}>비밀번호를 잊으셨나요?</ForgotPassword>
          <Switcher>
            계정이 없으신가요? <AuthSwither onVisible={onVisible}>가입하기 &rarr;</AuthSwither>
          </Switcher>
          {error ? <Error>{error}</Error> : null}
        </Container>
      </Wrapper>
    </>
  );
}
