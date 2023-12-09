import styled from "styled-components";
import { Input, InputWrapper } from "./auth-components";
import { useState } from "react";
import { auth, db } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const Wrapper = styled.div``;
const Form = styled.form`
  display: flex;
  gap: 10px;
`;
const CommentInputWrapper = styled(InputWrapper)`
  width: 100%;
`;
export const CommentInput = styled(Input)`
  padding: 5px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;
export const CommentSubmit = styled.input`
  padding: 5px 20px;
  background-color: #00acee;
  border: none;
  border-radius: 15px;
  color: white;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 171, 238, 0.8);
  }
`;

export default function TweetCommentForm({ tweetId }: { tweetId: string }) {
  const [comment, setComment] = useState("");
  const user = auth.currentUser;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || comment === "") return;
    try {
      const collectionRef = collection(db, "tweets", tweetId, "comments");
      const commentDocRef = doc(collectionRef);
      await setDoc(commentDocRef, {
        commentUser: user.uid,
        commentUsername: user.displayName,
        commentUserAvatar: user.photoURL,
        comment,
        createAt: Date.now(),
      });
      setComment("");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <CommentInputWrapper>
          <CommentInput onChange={onChange} value={comment} type="text" placeholder="댓글 작성" />
        </CommentInputWrapper>
        <CommentSubmit type="submit" value={"작성"} />
      </Form>
    </Wrapper>
  );
}
