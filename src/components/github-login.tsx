import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { handleUserInfoQuery } from "../library/methods";

const Button = styled.span<{ width: any }>`
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
  width: ${(props) => props.width || "100%"};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  & b {
    font-weight: 600;
  }
`;
const Logo = styled.img`
  height: 25px;
`;

export default function GithubButton({ isLogin, widthValue }: { isLogin: boolean; widthValue: any }) {
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
    <Button width={widthValue} onClick={onClick}>
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
