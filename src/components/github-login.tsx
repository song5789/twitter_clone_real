import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import styled, { css } from "styled-components";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { collection } from "firebase/firestore";
import { handleUserInfoQuery } from "../library/methods";

const Button = styled.span<{ isLogin?: boolean }>`
  background-color: white;
  color: black;
  padding: 10px 10px;
  font-size: 16px;
  border-radius: 50px;
  border: none;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
  width: 70%;
  cursor: pointer;

  ${(props) =>
    props.isLogin &&
    css`
      width: 100%;
    `}
  &:hover {
    opacity: 0.8;
  }

  & b {
    font-weight: 600;
  }
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }

  @media screen and (max-width: 350px) {
    width: 100%;
  }
`;
const Logo = styled.img`
  height: 25px;
`;

export default function GithubButton({ isLogin }: { isLogin: boolean }) {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      const credentials = await signInWithPopup(auth, provider);
      const collectionRef = collection(db, "users");
      handleUserInfoQuery(collectionRef, credentials);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button onClick={onClick} isLogin={isLogin}>
      <Logo src="/github-logo.svg" />
      {isLogin ? (
        <span>
          <b>Github</b> 로 로그인하기
        </span>
      ) : (
        <span>
          <b>Github</b> 에서 가입하기
        </span>
      )}
    </Button>
  );
}
