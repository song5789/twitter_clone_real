import styled from "styled-components";
import TweetCommentForm from "./tweet-comment-form";
import { useState, useEffect } from "react";
import { IComment } from "../model/interface";
import { Unsubscribe } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Comment from "./comment";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
  border-top: 1px solid rgba(167, 168, 168, 0.5);
  width: 100%;
`;
const Comments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const AlertBox = styled.div`
  display: flex;
  justify-content: center;
  color: gray;
  font-style: italic;
`;
export default function TweetComment({ tweetId }: { tweetId: string }) {
  const [comments, setComments] = useState<IComment[]>([]);
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchComments = async () => {
      const commentsRef = collection(db, "tweets", tweetId, "comments");
      const commentQuery = query(commentsRef, orderBy("createAt", "asc"));
      unsubscribe = await onSnapshot(commentQuery, (snapshot) => {
        const comments = snapshot.docs.map((doc) => {
          const { commentUser, commentUsername, commentUserAvatar, comment, createAt, updateAt } = doc.data();
          return {
            commentId: doc.id,
            commentUser,
            commentUsername: commentUsername || "익명",
            commentUserAvatar: commentUserAvatar || null,
            comment,
            createAt,
            updateAt: updateAt || null,
            tweetId,
          };
        });
        setComments(comments);
      });
    };
    fetchComments();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <>
      <div></div>
      <Wrapper>
        {comments.length !== 0 ? (
          <Comments>
            {comments.map((comment) => (
              <Comment key={comment.commentId} {...comment} tweetId={tweetId} />
            ))}
          </Comments>
        ) : (
          <AlertBox>작성된 댓글이 없어요.</AlertBox>
        )}
        <TweetCommentForm tweetId={tweetId} />
      </Wrapper>
    </>
  );
}
