import styled, { css } from "styled-components";
import { IComment } from "../model/interface";
import { AvatarImg } from "./layout";
import { convertToLocaleDate } from "../library/methods";
import { auth } from "../firebase";
import { useState } from "react";
import CommentDeleteModal from "./comment-delete-modal";
import CommentEditModal from "./comment-edit-modal";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-size: 12px;
`;
const Avatar = styled.div`
  width: 20px;
  height: 20px;
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
const Username = styled.span<{ userId: string | null; commentUser: string }>`
  padding: 5px;
  font-weight: 600;
  opacity: 0.8;
  white-space: nowrap;
  ${(props) =>
    props.userId === props.commentUser &&
    css`
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 15px;
      color: white;
    `}

  @media screen and (max-width:700px) {
    width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const CommentTime = styled.div`
  color: gray;

  @media screen and (max-width: 700px) {
    display: none;
  }
`;
const Payload = styled.p`
  display: block;
  width: 50%;
  word-wrap: break-word;
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
  padding: 0 5px;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
`;
const Button = styled.button<{ deleteComment?: boolean }>`
  border: none;
  background-color: transparent;
  color: gray;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  ${(props) =>
    props.deleteComment &&
    css`
      &:hover {
        color: tomato;
      }
    `}
`;

export default function Comment({ commentId, commentUser, commentUsername, commentUserAvatar, comment, createAt, updateAt, tweetId }: IComment) {
  const user = auth.currentUser;
  const [handleModal, setHandleMadal] = useState({
    commentDelete: false,
    commentEdit: false,
  });
  const { commentDelete, commentEdit } = handleModal;
  const modalHandler = (target: string, value: boolean) => {
    setHandleMadal({
      ...handleModal,
      [target]: value,
    });
  };
  return (
    <Wrapper>
      <Avatar>
        {commentUserAvatar ? (
          <AvatarImg src={commentUserAvatar} />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </Avatar>
      <Username userId={user?.uid ?? null} commentUser={commentUser}>
        {commentUsername}
      </Username>
      <Payload>{comment}</Payload>
      <CommentTime>{` · ${updateAt ? `${convertToLocaleDate(updateAt)} (수정됨)` : convertToLocaleDate(createAt)}`}</CommentTime>
      {user?.uid === commentUser ? (
        <ButtonContainer>
          <Button
            onClick={() => {
              modalHandler("commentEdit", true);
            }}>
            수정
          </Button>
          <Button
            deleteComment
            onClick={() => {
              modalHandler("commentDelete", true);
            }}>
            삭제
          </Button>
        </ButtonContainer>
      ) : null}
      {commentDelete ? <CommentDeleteModal commentUser={commentUser} modalHandler={modalHandler} commentId={commentId} tweetId={tweetId} /> : null}
      {commentEdit ? (
        <CommentEditModal commentUser={commentUser} modalHandler={modalHandler} commentId={commentId} tweetId={tweetId} comment={comment} />
      ) : null}
    </Wrapper>
  );
}
