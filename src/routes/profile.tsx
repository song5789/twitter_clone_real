import styled from "styled-components";
import { AvatarImg } from "../components/layout";
import { auth, db } from "../firebase";
import { useState, useEffect } from "react";
import { EditProfileModal } from "../components/edit-profile-modal";
import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { ITweet } from "../model/interface";
import Tweet from "../components/tweet";
import { Unsubscribe } from "firebase/auth";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
`;
const Header = styled.div`
  height: 50px;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14.5px;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 1px solid rgba(167, 168, 168, 0.5);
  position: sticky;
  top: 0;
  z-index: 1;
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const Banner = styled.div`
  width: 100%;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.5);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 10%;
    color: rgba(0, 0, 0, 0.5);
  }
`;
const BannerImg = styled.img`
  width: 100%;
  object-fit: cover;
`;
const Avatar = styled.div`
  width: 100px;
  height: 100px;
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
const Info = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  position: relative;
  border-bottom: 1px solid rgba(167, 168, 168, 0.5);
`;
const Username = styled.span`
  font-size: 25px;
  font-weight: 600;
`;
const UserEmail = styled.span`
  font-size: 16px;
  color: gray;
`;
const EditProfile = styled.button`
  padding: 20px;
  position: absolute;
  right: 5%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  font-size: 18px;
  font-weight: 600;
  background-color: black;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
const ProfileHeader = styled(Header)`
  position: static;
`;
const Tweets = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export default function Profile() {
  const [bannerUrl, setBannerUrl] = useState("");
  const [isEditToggle, setEditToggle] = useState(false);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const user = auth.currentUser;
  const editModalToggle = () => {
    setEditToggle(true);
  };

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const target = collection(db, "tweets");
      const tweetsQuery = query(target, where("userId", "==", user?.uid), orderBy("createAt", "desc"), limit(25));
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { tweet, username, userAvatar, userId, createAt, photo, updateAt } = doc.data();

          return {
            tweetId: doc.id,
            tweet,
            username,
            userAvatar,
            userId,
            createAt,
            updateAt,
            photo,
          };
        });
        setTweets(tweets);
      });
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <Wrapper>
      <Header>프로필</Header>
      <ProfileContainer>
        <Banner>
          {bannerUrl ? (
            <BannerImg />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          )}
        </Banner>
        <Info>
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
          <Column>
            <Username>{user?.displayName ?? "익명"}</Username>
            <UserEmail>{user?.email}</UserEmail>
          </Column>
          <EditProfile onClick={editModalToggle}>프로필 수정</EditProfile>
        </Info>
        <ProfileHeader>내 게시물</ProfileHeader>
        <Tweets>
          {tweets.map((tweet) => (
            <Tweet key={tweet.tweetId} {...tweet} />
          ))}
        </Tweets>
      </ProfileContainer>
      {isEditToggle ? <EditProfileModal setEditToggle={setEditToggle} /> : null}
    </Wrapper>
  );
}
