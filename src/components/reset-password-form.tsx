import styled from "styled-components";
import { Close, Container, DisabledButton, Input, InputWrapper, LogoImg, Switcher, Form, Title, Wrapper } from "./auth-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const Description = styled.span`
  color: gray;
  margin: 20px 0;
`;

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [check, setCheck] = useState(false);
  const [visible, setVisble] = useState(false);
  const navigate = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);

    if (email !== "") {
      setCheck(true);
    } else if (email === "") {
      setCheck(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setVisble(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Wrapper>
      <Container>
        <Close
          onClick={() => {
            navigate("/");
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Close>
        <LogoImg src="/X_logo_2023_(white).png" />
        <Title>내 X 계정 찾기</Title>
        <Description>비밀번호를 변경하려면 계정에 연결된 이메일을 입력해 주세요.</Description>
        <Form onSubmit={onSubmit}>
          <InputWrapper>
            <Input onChange={onChange} type="email" placeholder="이메일" value={email} required />
          </InputWrapper>
          {check ? <Input type="submit" value="비밀번호 초기화" /> : <DisabledButton>비밀번호 초기화</DisabledButton>}
        </Form>
        {visible ? <Switcher>이메일이 도착하지 않았다면 재전송하거나, 스팸함을 확인해주세요.</Switcher> : null}
        {visible ? (
          <Switcher>
            이메일을 받았습니다. <Link to={"/login"}>로그인 &rarr;</Link>
          </Switcher>
        ) : null}
      </Container>
    </Wrapper>
  );
}
