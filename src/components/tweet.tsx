import styled, { css } from "styled-components";
import { ITweet } from "../model/interface";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 4fr;
  gap: 15px;
  padding: 20px;
  border-bottom: 1px solid rgba(167, 168, 168, 0.4);
`;
const Row = styled.div``;
const Column = styled.div``;
const Avatar = styled.div`
  width: 45px;
  height: 45px;
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
const AvatarImg = styled.img`
  width: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;
const Username = styled.span`
  font-weight: 600;
  font-size: 18px;
`;
const Payload = styled.p`
  margin: 10px 0;
  font-size: 18px;
`;
const PhotoContainer = styled.div`
  width: 100%;
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid rgba(167, 168, 168, 0.5);
`;
const Photo = styled.img`
  width: 100%;
`;
const Timestamp = styled.span`
  color: gray;
`;
const MeatBallButton = styled.div`
  width: 40px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  cursor: pointer;
  right: 1%;
  svg {
    color: gray;
    width: 100%;
  }

  &:hover {
    svg {
      color: #00acee;
    }
    background-color: rgba(0, 171, 238, 0.2);
  }
`;
const TweetMenu = styled.div`
  display: flex;
  gap: 20px;
  color: gray;
  margin-top: 10px;
`;
const TweetMenuItem = styled.div<{ isReply?: boolean; isLike?: boolean }>`
  width: 40px;
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;

  ${(props) =>
    props.isReply &&
    css`
      &:hover {
        color: #00acee;
      }
    `}
  ${(props) =>
    props.isLike &&
    css`
      &:hover {
        color: #f52acc;
      }
    `}
`;
const TweetMenuIcon = styled.div<{ isReply?: boolean; isLike?: boolean }>`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 70%;
  }
  ${(props) =>
    props.isReply &&
    css`
      &:hover {
        background-color: rgba(0, 171, 238, 0.2);
      }
    `}
  ${(props) =>
    props.isLike &&
    css`
      &:hover {
        background-color: rgba(245, 42, 204, 0.2);
      }
    `}
`;

export default function Tweet({ username, photo, tweet, userAvatar, createAt }: ITweet) {
  const convertToLocaleDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };
  return (
    <Wrapper>
      <Avatar>
        {userAvatar ? (
          <AvatarImg src={userAvatar} />
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
        <Header>
          <Row>
            <Username>{username}</Username>
            <Timestamp>{` · ${convertToLocaleDate(createAt)}`}</Timestamp>
          </Row>
          <MeatBallButton>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path
                fillRule="evenodd"
                d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                clipRule="evenodd"
              />
            </svg>
          </MeatBallButton>
        </Header>
        <Payload>{tweet}</Payload>
        {photo ? (
          <PhotoContainer>
            <Photo src={photo} />
          </PhotoContainer>
        ) : null}
        <TweetMenu>
          <TweetMenuItem isReply>
            <TweetMenuIcon isReply>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                />
              </svg>
            </TweetMenuIcon>
          </TweetMenuItem>
          <TweetMenuItem isLike>
            <TweetMenuIcon isLike>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </TweetMenuIcon>
          </TweetMenuItem>
        </TweetMenu>
      </Column>
    </Wrapper>
  );
}
