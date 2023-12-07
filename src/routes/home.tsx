import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
  overflow-y: scroll;
`;
const Column = styled.div`
  display: grid;
  grid-template-rows: 0.1fr 0.1fr 5fr;
`;
const Header = styled.div`
  height: 50px;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 1px solid rgba(167, 168, 168, 0.5);
  position: sticky;
  top: 0;
  z-index: 1;
`;

export default function Home() {
  return (
    <Wrapper>
      <Column>
        <Header>타임라인</Header>
        <PostTweetForm />
        <Timeline />
      </Column>
    </Wrapper>
  );
}
