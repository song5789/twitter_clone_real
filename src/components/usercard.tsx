import styled from "styled-components";
import { IUserInfo } from "../model/interface";
import { AvatarImg } from "./layout";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: space-around;
`;
const Avatar = styled.div`
  width: 60px;
  height: 60px;
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
  @media screen and (max-width: 700px) {
    width: 50px;
    height: 50px;
  }
`;
const Username = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;

  a {
    text-decoration: none;
    color: white;

    &:hover {
      text-decoration: underline;
    }
  }
`;
const Email = styled.span`
  font-size: 0.8rem;
  color: gray;
`;

export default function UserCard({ displayName, email, photoURL, uid }: IUserInfo) {
  return (
    <Wrapper>
      <Avatar>
        {photoURL ? (
          <AvatarImg src={photoURL} />
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
      <Column>
        <Username>
          <Link to={`/profile/${uid}`}>{displayName}</Link>
        </Username>
        <Email>{email}</Email>
      </Column>
    </Wrapper>
  );
}
