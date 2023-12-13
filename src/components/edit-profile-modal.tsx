import styled from "styled-components";
import { Close, Container, Form, Input, InputWrapper, LogoImg, Title, Wrapper } from "./auth-components";
import { AvatarImg } from "./layout";
import { useState } from "react";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, query, where, writeBatch } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const EditModalTitle = styled(Title)`
  text-align: center;
  margin-bottom: 10px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;
const AvatarUpload = styled.label`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #b3d6e3;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 100%;
    color: #7997a3;
  }
`;
const AvatarInput = styled.input`
  display: none;
`;
const StyledAvatarImg = styled(AvatarImg)``;

export function EditProfileModal({ setEditToggle }: { setEditToggle: any }) {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState<any>(user?.photoURL);
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editname, setEditname] = useState(user?.displayName);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const editModalToggle = () => {
    setEditToggle(false);
  };
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      if (files[0].size > 1024 * 1024) {
        alert("1MB 이하의 파일만 첨부할 수 있습니다.");
      } else {
        try {
          encodeFileToBase64(files[0]);
          setEditFile(files[0]);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  const encodeFileToBase64 = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setAvatar(reader.result);
        resolve();
      };
    });
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditname(e.target.value);
  };
  const updateTweetUserdata = async (editUrl?: any) => {
    if (!user) return;
    const batch = writeBatch(db);
    const targetCollection = collection(db, "tweets");
    const tweetsQuery = query(targetCollection, where("userId", "==", user.uid));
    const snapshot = await getDocs(tweetsQuery);
    try {
      if (editFile) {
        snapshot.docs.forEach(async (editdoc) => {
          batch.update(editdoc.ref, {
            userAvatar: editUrl,
          });
        });
      }
      snapshot.docs.forEach(async (editdoc) => {
        batch.update(editdoc.ref, {
          username: editname,
        });
      });
      await batch.commit();
    } catch (e) {
      console.log(e);
    }
  };
  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || editname == "") return;
    // 수정한 유저 데이터를 기반으로 정보 변경.
    try {
      setLoading(true);
      // 유저 이름 변경
      await updateProfile(user, {
        displayName: editname,
      });
      // 업로드한 아바타 사진이 있다면
      if (editFile) {
        // 사진을 스토리지에 저장 후 URL을 프로필에 업데이트
        const locationRef = ref(storage, `avatars/${user.uid}`);
        const result = await uploadBytes(locationRef, editFile);
        const avatarUrl = await getDownloadURL(result.ref);
        await updateProfile(user, {
          photoURL: avatarUrl,
        });
        // 사진을 업로드 했을경우 올린 트윗의 아바타 URL 변경
        updateTweetUserdata(avatarUrl);
      }
      // 사진 업로드 유무 관계없이 트윗의 유저정보 변경
      updateTweetUserdata();
      setLoading(false);
      navigate("/profile");
      setEditToggle(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Wrapper>
      <Container>
        <Close onClick={editModalToggle}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Close>
        <LogoImg src="X_logo_2023_(white).png" />
        <EditModalTitle>프로필 수정</EditModalTitle>
        <Column>
          <AvatarUpload htmlFor="avatar">
            {avatar ? (
              <StyledAvatarImg src={avatar} />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </AvatarUpload>
          <AvatarInput onChange={onAvatarChange} id="avatar" type="file" accept="image/*" />
          <Form onSubmit={onSubmit}>
            <InputWrapper>
              <Input required onChange={onChange} type="text" placeholder="이름" value={editname ?? "익명"} />
            </InputWrapper>
            <Input type="submit" value={isLoading ? "수정 중..." : "수정 하기"} />
          </Form>
        </Column>
      </Container>
    </Wrapper>
  );
}
