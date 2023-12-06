import styled, { css } from "styled-components";

export const Dash = styled.span`
  color: gray;
  opacity: 0.8;
`;

export const ConfirmButton = styled.button<{ cancel?: boolean }>`
  border: none;
  background-color: white;
  padding: 15px 10px;
  font-size: 20px;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }

  ${(props) =>
    props.cancel &&
    css`
      background-color: transparent;
      border: 1px solid gray;
      color: white;
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    `}
`;
