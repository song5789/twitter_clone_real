import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Logout = styled.button`
  height: 50px;
`;

export default function Home() {
  const navigate = useNavigate();
  const onClick = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <>
      <h1>home</h1>
      <Logout onClick={onClick}>로그아웃</Logout>
    </>
  );
}
