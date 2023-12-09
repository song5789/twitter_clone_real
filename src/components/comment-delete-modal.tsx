import styled from "styled-components";
import { Container, LogoImg, Title, Wrapper } from "./auth-components";
import { Description } from "./reset-password-form";
import { ConfirmButton } from "./common-conponents";
import { auth, db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";

const StyeldDesc = styled(Description)`
  font-size: 16px;
`;
const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default function CommentDeleteModal({
  commentId,
  tweetId,
  modalHandler,
  commentUser,
}: {
  commentId: string;
  commentUser: string;
  tweetId: string;
  modalHandler: any;
}) {
  const onDelete = async () => {
    const user = auth.currentUser;
    if (!user || user.uid !== commentUser) return;
    try {
      const targetDoc = doc(db, "tweets", tweetId, "comments", commentId);
      await deleteDoc(targetDoc);
      modalHandler("commentDelete", false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Wrapper>
      <Container>
        <LogoImg src="X_logo_2023_(white).png" />
        <Title>댓글을 삭제하시겠습니까?</Title>
        <StyeldDesc>삭제된 댓글은 복구할 수 없습니다!</StyeldDesc>
        <Column>
          <ConfirmButton onClick={onDelete}>삭제</ConfirmButton>
          <ConfirmButton
            cancel
            onClick={() => {
              modalHandler("commentDelete", false);
            }}>
            취소
          </ConfirmButton>
        </Column>
      </Container>
    </Wrapper>
  );
}
