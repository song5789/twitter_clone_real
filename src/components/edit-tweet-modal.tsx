import styled, { css } from "styled-components";
import { auth, db, storage } from "../firebase";
import { Close, Container, LogoImg, Title, Wrapper } from "./auth-components";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Description } from "./reset-password-form";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;
const TextArea = styled.textarea`
  border: none;
  background-color: black;
  font-size: 20px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  resize: none;
  color: white;
  outline: none;
  width: 100%;
  border-bottom: 1px solid rgba(167, 168, 168, 0.5);
  &::placeholder {
    font-size: 20px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const AttachFileButton = styled.label`
  width: 30px;
  cursor: pointer;
  svg {
    width: 100%;
    color: #00acee;
  }
`;
const AttachFileInput = styled.input`
  display: none;
`;
const SubmitButton = styled.input`
  width: 120px;
  padding: 10px 0;
  border: none;
  border-radius: 50px;
  background-color: #00acee;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 171, 238, 0.8);
  }
`;

const ImageContainer = styled.div<{ editFile: any }>`
  display: flex;
  justify-content: center;
  border: 1px solid rgba(167, 168, 168, 0.5);
  border-radius: 15px;
  overflow: hidden;
  position: relative;

  ${(props) =>
    props.editFile &&
    css`
      img {
        opacity: 0.8;
      }
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: 600;
        font-size: 18px;
        color: white;
      }
    `}
`;
const DeleteImage = styled.img`
  width: 100%;
`;

export default function EditTweetModal({
  showModal,
  userId,
  tweetId,
  photo,
  tweet,
}: {
  showModal: any;
  userId: string;
  tweetId: string;
  photo?: string;
  tweet: string;
}) {
  const [editTweet, setEditTweet] = useState(tweet);
  const [editFile, setEditFile] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);
  const user = auth.currentUser;
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size > 1024 * 1024) {
        alert("1MB 이하의 파일만 첨부할 수 있습니다.");
      } else {
        setEditFile(files[0]);
      }
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user?.uid !== userId || !user) return;
    try {
      setLoading(true);
      const targetDoc = doc(db, "tweets", tweetId);
      await updateDoc(targetDoc, {
        tweet: editTweet,
        updateAt: Date.now(),
      });
      if (editFile) {
        const targetLocation = ref(storage, `tweets/${user?.uid}/${tweetId}`);
        const uploadResult = await uploadBytes(targetLocation, editFile);
        const editUrl = await getDownloadURL(uploadResult.ref);
        await updateDoc(targetDoc, {
          photo: editUrl,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      showModal("editModal", false);
    }
  };

  return (
    <Wrapper>
      <Container>
        <Close
          onClick={() => {
            showModal("editModal", false);
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Close>
        <LogoImg src="/X_logo_2023_(white).png" />
        <Title>게시글 수정 하기</Title>
        <Form onSubmit={onSubmit}>
          <TextArea onChange={onChange} value={editTweet} maxLength={180} placeholder="무슨 일이 일어나고 있나요?" />
          <ButtonContainer>
            <AttachFileButton htmlFor="editfile">
              {editFile ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              )}
            </AttachFileButton>
            <AttachFileInput onChange={onFileChange} id="editfile" type="file" accept="image/*" />
            <SubmitButton type="submit" value={isLoading ? "게시 중..." : "수정 하기"} />
          </ButtonContainer>
          <ImageContainer editFile={editFile}>
            {photo ? <DeleteImage src={photo} /> : null}
            {editFile ? <span>이미지가 교체됩니다.</span> : null}
          </ImageContainer>
          <Description>이미지는 변경할 이미지를 업로드 후 수정을 눌러야 반영됩니다.</Description>
        </Form>
      </Container>
    </Wrapper>
  );
}
