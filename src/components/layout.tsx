import { Link, Outlet, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { auth } from "../firebase";
import { useState } from "react";
import PostTweetModal from "./post-tweet-modal";
import SideMenu from "./side-menu";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  padding: 0 10%;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 1000px) {
    display: flex;
  }
  @media screen and (max-width: 700px) {
    padding: 0;
  }
`;
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid rgba(167, 168, 168, 0.5);
  padding: 0px 10px 10px 10px;

  @media screen and (max-width: 1000px) {
    width: 40%;
  }

  @media screen and (max-width: 700px) {
    width: 20%;
    align-items: center;
  }
`;
const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 15px;
  @media screen and (max-width: 700px) {
    align-items: center;
  }
`;
const MenuItem = styled.div<{ isLogo?: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-radius: 100px;
  padding: 10px 15px;
  font-size: 20px;
  svg {
    width: 30px;
    &:focus {
      fill: white;
    }
  }
  a {
    color: white;
    display: flex;
    align-items: center;
    gap: 15px;
    text-decoration: none;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${(props) =>
    props.isLogo &&
    css`
      border-radius: 50%;
    `}
  @media screen and (max-width:700px) {
    width: 50px;
  }
`;
const LogoImage = styled.img`
  width: 25px;
`;

const CurrentUser = styled.div`
  width: 100%;
  border-radius: 50px;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media screen and (max-width: 700px) {
    width: 70px;
    justify-content: center;
    padding: 0;
    border-radius: 50%;
  }
`;
const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #b3d6e3;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    color: #7997a3;
  }
`;
export const AvatarImg = styled.img`
  width: 100%;
`;
const UserName = styled.span`
  width: 75px;
  font-size: 15px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media screen and (max-width: 700px) {
    display: none;
  }
`;
const MeatBallMenu = styled.div`
  width: 30px;

  svg {
    width: 100%;
  }
  @media screen and (max-width: 700px) {
    display: none;
  }
`;
const PostingButton = styled.button`
  width: 100%;
  background-color: #00acee;
  padding: 10px 15px;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 171, 238, 0.8);
  }
  @media screen and (max-width: 700px) {
    display: none;
  }
`;
const PostingSmallButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #00acee;
  svg {
    width: 30px;
    color: white;
  }
  &:hover {
    background-color: rgba(0, 171, 238, 0.8);
  }
  @media screen and (min-width: 700px) {
    display: none;
  }
`;
const UserExtraMenu = styled.div`
  width: 150%;
  padding: 20px 0;
  border-radius: 30px;
  box-shadow: 0px 0px 5px white;
  background-color: black;
  overflow: hidden;
  position: absolute;
  top: -100%;
  left: 0;
  transform: translateY(-50%);

  @media screen and (max-width: 700px) {
    width: 250px;
    z-index: 12;
  }
`;
const Logout = styled.button`
  width: 100%;
  border: none;
  font-size: 16px;
  background-color: inherit;
  color: white;
  padding: 10px;
  text-align: start;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
const Text = styled.span`
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export default function Layout() {
  const [toggle, setToggle] = useState(false);
  const [postTweet, setPostTweet] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;
  const onToggle = () => {
    setToggle(!toggle);
  };
  const moveToLogoutPage = () => {
    navigate("/logout");
  };
  const showPostModal = () => {
    setPostTweet(true);
  };

  return (
    <Wrapper>
      <Menu>
        <Column>
          <MenuItem isLogo>
            <Link to="/">
              <LogoImage src="/X_logo_2023_(white).png" />
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <Text>홈</Text>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/profile">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <Text>프로필</Text>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <Text>검색</Text>
            </Link>
          </MenuItem>
          <PostingButton onClick={showPostModal}>게시하기</PostingButton>
          <PostingSmallButton onClick={showPostModal}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </PostingSmallButton>
        </Column>
        <CurrentUser onClick={onToggle}>
          <Avatar>
            {user?.photoURL ? (
              <AvatarImg src={user.photoURL} />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </Avatar>
          <UserName>{user?.displayName ?? "익명"}</UserName>
          <MeatBallMenu>
            {toggle ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </MeatBallMenu>
          {toggle ? (
            <UserExtraMenu>
              <Logout onClick={moveToLogoutPage}>{`${user?.displayName ?? "익명"} 계정에서 로그아웃`}</Logout>
            </UserExtraMenu>
          ) : null}
        </CurrentUser>
      </Menu>
      <Outlet />
      <SideMenu />
      {postTweet ? <PostTweetModal setPostTweet={setPostTweet} /> : null}
    </Wrapper>
  );
}
