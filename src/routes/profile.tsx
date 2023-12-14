import { AvatarImg } from "../components/layout";
import { auth, db } from "../firebase";
import { useState, useEffect } from "react";
import { EditProfileModal } from "../components/edit-profile-modal";
import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { ITweet, IUserInfo } from "../model/interface";
import Tweet from "../components/tweet";
import { Unsubscribe } from "firebase/auth";
import {
  ProfileAvatar,
  ProfileBanner,
  ProfileBannerImg,
  ProfileCenter,
  ProfileColumn,
  ProfileContainer,
  ProfileEditButton,
  ProfileHeader,
  ProfileInfo,
  ProfileRow,
  ProfileSubHeader,
  ProfileText,
  ProfileTweets,
  ProfileUsername,
  ProfileWrapper,
} from "../components/profile-components";
import { convertToLocaleDate, fetchUserInfo } from "../library/methods";

export default function Profile() {
  const [bannerUrl, setBannerUrl] = useState("");
  const [isEditToggle, setEditToggle] = useState(false);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [userSnapshot, setUserSnapshot] = useState<IUserInfo | null>(null);
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
    fetchUserInfo(user?.uid, setUserSnapshot);
    setBannerUrl("");
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <ProfileWrapper>
      <ProfileHeader>프로필</ProfileHeader>
      <ProfileContainer>
        <ProfileBanner>
          {bannerUrl ? (
            <ProfileBannerImg />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          )}
        </ProfileBanner>
        <ProfileInfo>
          <ProfileAvatar>
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
          </ProfileAvatar>
          <ProfileColumn>
            <ProfileUsername>{user?.displayName ?? "익명"}</ProfileUsername>
            <ProfileRow>
              <ProfileText>{user?.email}</ProfileText>
              <ProfileText>{`가입일: ${convertToLocaleDate(userSnapshot?.createAt ?? 1)}`}</ProfileText>
            </ProfileRow>
          </ProfileColumn>
          <ProfileEditButton onClick={editModalToggle}>프로필 수정</ProfileEditButton>
        </ProfileInfo>
        <ProfileSubHeader>게시글</ProfileSubHeader>
        {tweets.length !== 0 ? (
          <ProfileTweets>
            {tweets.map((tweet) => (
              <Tweet key={tweet.tweetId} {...tweet} />
            ))}
          </ProfileTweets>
        ) : (
          <ProfileCenter>게시한 글이 없습니다.</ProfileCenter>
        )}
      </ProfileContainer>
      {isEditToggle ? <EditProfileModal setEditToggle={setEditToggle} /> : null}
    </ProfileWrapper>
  );
}
