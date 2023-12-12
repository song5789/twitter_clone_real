import styled from "styled-components";

const Wrapper = styled.div`
  border-left: 1px solid rgba(167, 168, 168, 0.5);
  position: relative;
`;
const Background = styled.div`
  position: absolute;
  width: 400%;
  opacity: 0.2;
  bottom: 0;
`;
const BackImage = styled.img`
  width: 100%;
`;

export default function SideMenu() {
  return (
    <Wrapper>
      <Background>
        <BackImage src="/im_go_to_mars.png" />
      </Background>
    </Wrapper>
  );
}
