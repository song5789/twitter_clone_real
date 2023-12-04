import styled, { css } from "styled-components";
import { Container, LogoImg, Title, Wrapper } from "../components/auth-components";
import { Description } from "../components/reset-password-form";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const LogoutFormBtn = styled.button<{ cancel?: boolean }>`
  border: none;
  background-color: white;
  padding: 15px 10px;
  font-size: 20px;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }

  ${(props) =>
    props.cancel &&
    css`
      background-color: transparent;
      border: 1px solid gray;
      color: white;
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    `}
`;
const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function Logout() {
  const navigate = useNavigate();

  const onLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };
  const onCancel = () => {
    navigate("/");
  };
  return (
    <Wrapper>
      <Container>
        <LogoImg src="/X_logo_2023_(white).png" />
        <Title>X 에서 로그아웃할까요?</Title>
        <Description>언제든지 다시 로그인할 수 있습니다.</Description>
        <Column>
          <LogoutFormBtn onClick={onLogout}>로그아웃</LogoutFormBtn>
          <LogoutFormBtn cancel onClick={onCancel}>
            취소
          </LogoutFormBtn>
        </Column>
      </Container>
    </Wrapper>
  );
}
