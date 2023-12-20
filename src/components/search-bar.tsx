import styled, { css } from "styled-components";
import { Input, InputWrapper } from "./auth-components";
import { useState } from "react";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
`;
const SearchBarInputWrapper = styled(InputWrapper)`
  width: 100%;
  position: relative;
`;
const SearchBarInput = styled(Input)`
  padding: 15px;
`;
const SearchButton = styled.div`
  width: 10%;
  cursor: pointer;
  padding: 5px;
  background-color: #00acee;
  border-radius: 10px;
  font-weight: 600;
  &:hover {
    background-color: rgba(0, 171, 238, 0.8);
  }

  a {
    color: white;
    text-decoration: none;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const DeleteValue = styled.label<{ userQuery: any }>`
  position: absolute;
  right: 2%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: none;

  ${(props) =>
    props.userQuery &&
    css`
      display: block;
    `}
`;

export default function SearchBar() {
  const [userQuery, setUserQuery] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserQuery(e.target.value);
  };
  const deleteUserQuery = () => {
    setUserQuery("");
  };
  return (
    <Wrapper>
      <SearchBarInputWrapper>
        <SearchBarInput type="text" placeholder="유저 검색..." value={userQuery} onChange={onChange} />
        <DeleteValue onClick={deleteUserQuery} userQuery={userQuery}>
          X
        </DeleteValue>
      </SearchBarInputWrapper>
      <SearchButton>
        <Link to={`/search/${userQuery}`}>검색</Link>
      </SearchButton>
    </Wrapper>
  );
}
