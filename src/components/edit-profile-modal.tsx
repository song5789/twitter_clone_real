import styled from "styled-components";
import { Close, Container, Form, Input, InputWrapper, LogoImg, Title, Wrapper } from "./auth-components";
import { AvatarImg } from "./layout";
import { useState } from "react";
import { auth, db, storage } from "../firebase";
import { Description } from "./reset-password-form";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const EditModalTitle = styled(Title)`
  text-align: center;
`;
const EditModalDesc = styled(Description)`
  text-align: center;
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

export function EditProfileModal({ setEditToggle }: { setEditToggle: any }) {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
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
          const locationRef = ref(storage, `avatars/${user?.uid}`);
          const result = await uploadBytes(locationRef, files[0]);
          const avatarUrl = await getDownloadURL(result.ref);
          setAvatar(avatarUrl);
          await updateProfile(user, {
            photoURL: avatarUrl,
          });
          const targetCollection = collection(db, "tweets");
          const tweetsQuery = query(targetCollection, where("userId", "==", user.uid));
          const snapshot = await getDocs(tweetsQuery);
          snapshot.docs.forEach(async (editDoc) => {
            const targetDoc = doc(db, "tweets", editDoc.id);
            await updateDoc(targetDoc, {
              userAvatar: avatarUrl,
            });
          });
          navigate("/profile");
          setEditToggle(false);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditname(e.target.value);
  };
  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || editname == "") return;
    try {
      setLoading(true);
      await updateProfile(user, {
        displayName: editname,
      });
      const targetCollection = collection(db, "tweets");
      const tweetsQuery = query(targetCollection, where("userId", "==", user.uid));
      const snapshot = await getDocs(tweetsQuery);
      snapshot.docs.forEach(async (editDoc) => {
        const targetDoc = doc(db, "tweets", editDoc.id);
        await updateDoc(targetDoc, {
          username: editname,
        });
      });
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
        <EditModalDesc>아바타는 업로드 즉시 수정됩니다.</EditModalDesc>
        <Column>
          <AvatarUpload htmlFor="avatar">
            {avatar ? (
              <AvatarImg src={avatar} />
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
