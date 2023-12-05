import styled, { css } from "styled-components";
import { useState } from "react";
import CreateAccount from "../components/create-account";
import { Dash } from "../components/common-conponents";
import LoginForm from "../components/login-form";
import GithubButton from "../components/github-login";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-width: 1000px;
  place-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const LogoImage = styled.img`
  width: 85%;
`;
const MainTitle = styled.h1`
  font-size: 52px;
  font-weight: 600;
  margin-bottom: 70px;
`;
const SubTitle = styled.h4`
  font-size: 25px;
  margin-bottom: 15px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
const Text = styled.div<{ size?: string; align: string; weight: number }>`
  margin-bottom: 15px;
  font-size: ${(props) => props.size || "18px"};
  font-weight: ${(props) => props.weight || null};
`;

const AuthButton = styled.div<{ alt?: boolean }>`
  width: 60%;
  padding: 13px;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50px;
  background-color: #00acee;

  &:hover {
    opacity: 0.8;
  }

  ${(props) =>
    props.alt &&
    css`
      background-color: transparent;
      border: 2px solid gray;
      color: #00acee;

      &:hover {
        opacity: 1;
        background-color: rgba(0, 172, 238, 0.2);
      }
    `}
`;
const Terms = styled.div`
  font-size: 13px;
  opacity: 0.7;
  margin-bottom: 100px;
`;

export default function Login() {
  const [toggleLogin, setLogin] = useState(false);
  const [toggleCreate, setCreate] = useState(false);

  const onVisible = (target: string, value: boolean) => {
    switch (target) {
      case "login":
        setLogin(value);
        break;
      case "create":
        setCreate(value);
        break;
    }
  };

  return (
    <>
      <Wrapper>
        <Container>
          <LogoImage src="/X_logo_2023_(white).png" />
        </Container>
        <Container>
          <Column>
            <MainTitle>지금 일어나고 있는 일</MainTitle>
            <SubTitle>지금 가입하세요.</SubTitle>
            <GithubButton isLogin={false} widthValue={"60%"} />
            <Text size="16px" align="start" weight={400}>
              <Dash>――――――――</Dash> 또는 <Dash>――――――――</Dash>
            </Text>
            <AuthButton
              onClick={() => {
                onVisible("create", true);
              }}>
              계정 만들기
            </AuthButton>
            <Terms>학습을 위한 페이지입니다. 상업적으로 이용할 목적이 전혀 없음을 알려드립니다.</Terms>
            <Text align="start" weight={600}>
              이미 트위터에 가입하셨나요?
            </Text>
            <AuthButton
              alt
              onClick={() => {
                onVisible("login", true);
              }}>
              로그인
            </AuthButton>
          </Column>
        </Container>
      </Wrapper>
      {toggleCreate ? <CreateAccount onVisible={onVisible} /> : null}
      {toggleLogin ? <LoginForm onVisible={onVisible} /> : null}
    </>
  );
}
