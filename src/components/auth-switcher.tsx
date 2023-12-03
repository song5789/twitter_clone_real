import styled from "styled-components";

const LinkText = styled.span`
  color: #00acee;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default function AuthSwither({ children, onVisible }: { children: React.ReactNode; onVisible: any }) {
  const onClick = () => {
    onVisible("login", false);
    onVisible("create", true);
  };
  return <LinkText onClick={onClick}>{children}</LinkText>;
}
