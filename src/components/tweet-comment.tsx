import styled from "styled-components";
import TweetCommentForm from "./tweet-comment-form";
import { IComment } from "../model/interface";
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
  gap: 10px;
`;
const AlertBox = styled.div`
  display: flex;
  justify-content: center;
  color: gray;
  font-style: italic;
`;
export default function TweetComment({ tweetId, comments }: { tweetId: string; comments: IComment[] }) {
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
