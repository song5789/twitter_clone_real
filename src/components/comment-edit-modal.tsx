import { Close, Container, Form, InputWrapper, LogoImg, Title, Wrapper } from "./auth-components";
import { useState } from "react";
import { CommentInput, CommentSubmit } from "./tweet-comment-form";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function CommentEditModal({
  commentId,
  tweetId,
  modalHandler,
  commentUser,
  comment,
}: {
  commentId: string;
  commentUser: string;
  tweetId: string;
  modalHandler: any;
  comment: string;
}) {
  const [editComment, setEditComment] = useState(comment);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditComment(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || user.uid !== commentUser) return;
    try {
      const targetDoc = doc(db, "tweets", tweetId, "comments", commentId);
      await updateDoc(targetDoc, {
        comment: editComment,
        updateAt: Date.now(),
      });
      modalHandler("commentEdit", false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Wrapper>
      <Container>
        <Close
          onClick={() => {
            modalHandler("commentEdit", false);
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Close>
        <LogoImg src="X_logo_2023_(white).png" />
        <Title>댓글 수정</Title>
        <Form onSubmit={onSubmit}>
          <InputWrapper>
            <CommentInput onChange={onChange} value={editComment} type="text" placeholder="댓글 작성" />
          </InputWrapper>
          <CommentSubmit type="submit" value={"수정"} />
        </Form>
      </Container>
    </Wrapper>
  );
}
