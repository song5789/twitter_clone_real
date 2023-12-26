import styled from "styled-components";
import { Input, InputWrapper } from "./auth-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: #00acee;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  &:hover {
    background-color: rgba(0, 171, 238, 0.8);
  }
`;
// const DeleteValue = styled.label<{ userQuery: any }>`
//   position: absolute;
//   right: 2%;
//   top: 50%;
//   transform: translateY(-50%);
//   cursor: pointer;
//   display: none;

//   ${(props) =>
//     props.userQuery &&
//     css`
//       display: block;
//     `}
// `;

export default function SearchBar() {
  const [userQuery, setUserQuery] = useState("");
  const navigate = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserQuery(e.target.value);
  };
  // const deleteUserQuery = () => {
  //   setUserQuery("");
  // };
  const onKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      navigate(`/search?username=${userQuery}`);
      window.location.reload();
    }
  };
  const onClick = () => {
    navigate(`/search?username=${userQuery}`);
    window.location.reload();
  };
  return (
    <Wrapper>
      <SearchBarInputWrapper>
        <SearchBarInput type="text" placeholder="유저 검색..." value={userQuery} onChange={onChange} onKeyDown={onKeyPressed} />
        {/* <DeleteValue onClick={deleteUserQuery} userQuery={userQuery}>
          X
        </DeleteValue> */}
      </SearchBarInputWrapper>
      <SearchButton onClick={onClick}>검색</SearchButton>
    </Wrapper>
  );
}
