import styled from "styled-components";

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
`;
export const ProfileCenter = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
  color: gray;
`;
export const ProfileHeader = styled.div`
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
export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const ProfileColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export const ProfileBanner = styled.div`
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
export const ProfileBannerImg = styled.img`
  width: 100%;
  object-fit: cover;
`;
export const ProfileAvatar = styled.div`
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
export const ProfileInfo = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  position: relative;
  border-bottom: 1px solid rgba(167, 168, 168, 0.5);
`;
export const ProfileUsername = styled.span`
  font-size: 25px;
  font-weight: 600;
`;
export const ProfileText = styled.span`
  font-size: 16px;
  color: gray;
`;
export const ProfileEditButton = styled.button`
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
export const ProfileSubHeader = styled(ProfileHeader)`
  position: static;
`;
export const ProfileTweets = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const ProfileRow = styled.div`
  display: flex;
  gap: 10px;
`;
