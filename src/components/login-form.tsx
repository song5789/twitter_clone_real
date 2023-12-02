import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Dash } from "./text-style-conponents";
import { Close, Container, DisabledButton, Error, Form, Input, InputWrapper, LogoImg, Switcher, Title, Wrapper } from "./auth-components";

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
      } else {
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

  return (
    <Wrapper>
      <Container>
        <Close
          onClick={() => {
            onVisible("login");
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Close>
        <LogoImg src="/X_logo_2023_(white).png" />
        <Title>X 가입하기</Title>
        <button>Github 로그인</button>
        <p>
          <Dash>――――――――――</Dash> 또는 <Dash>――――――――――</Dash>
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
        {error ? <Error>{error}</Error> : null}
        <Switcher>계정이 없으신가요? 가입하기</Switcher>
      </Container>
    </Wrapper>
  );
}
