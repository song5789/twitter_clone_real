import styled from "styled-components";
import { Close, Container, LogoImg, Title, Wrapper } from "./auth-components";
import { useState } from "react";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

export default function PostTweetModal({ setPostTweet }: { setPostTweet: any }) {
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);
  const visbleHandler = () => {
    setPostTweet(false);
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size > 1024 * 1024) {
        alert("1MB 이하의 파일만 첨부할 수 있습니다.");
      } else {
        setFile(files[0]);
      }
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;
    try {
      setLoading(true);
      const collectionRef = collection(db, "tweets");
      const docRef = await addDoc(collectionRef, {
        tweet,
        createAt: Date.now(),
        username: user.displayName || "익명",
        userAvatar: user.photoURL ?? null,
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${docRef.id}`);
        const uploadResult = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(uploadResult.ref);
        await updateDoc(docRef, {
          photo: url,
        });
      }
      setTweet("");
      setFile(null);
      setPostTweet(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <Container>
        <Close onClick={visbleHandler}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Close>
        <LogoImg src="/X_logo_2023_(white).png" />
        <Title>트윗 작성 하기</Title>
        <Form onSubmit={onSubmit}>
          <TextArea onChange={onChange} maxLength={180} value={tweet} placeholder="무슨 일이 일어나고 있나요?" />
          <ButtonContainer>
            <AttachFileButton htmlFor="postmodalfile">
              {file ? (
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
            <AttachFileInput onChange={onFileChange} id="postmodalfile" type="file" accept="image/*" />
            <SubmitButton type="submit" value={isLoading ? "게시 중..." : "게시 하기"} />
          </ButtonContainer>
        </Form>
      </Container>
    </Wrapper>
  );
}
