import styled from "styled-components";
import { Container, LogoImg, Title, Wrapper } from "./auth-components";
import { Description } from "./reset-password-form";
import { ConfirmButton } from "./common-conponents";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export function DeleteTweetModal({ showModal, userId, tweetId, photo }: { showModal: any; userId: string; tweetId: string; photo?: string }) {
  const user = auth.currentUser;
  const onDelete = async () => {
    if (user?.uid !== userId || !user) return;
    try {
      const docRef = doc(db, "tweets", tweetId);
      await deleteDoc(docRef);
      if (photo) {
        const photoRef = ref(storage, `tweets/${user?.uid}/${tweetId}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Wrapper>
      <Container>
        <LogoImg src="/X_logo_2023_(white).png" />
        <Title>게시글을 정말로 삭제하시겠습니까?</Title>
        <Description>삭제된 게시글은 복구할 수 없습니다!</Description>
        <Column>
          <ConfirmButton onClick={onDelete}>삭제</ConfirmButton>
          <ConfirmButton
            cancel
            onClick={() => {
              showModal("deleteModal", false);
            }}>
            취소
          </ConfirmButton>
        </Column>
      </Container>
    </Wrapper>
  );
}
