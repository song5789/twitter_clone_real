import styled from "styled-components";
import { ProfileHeader } from "../components/profile-components";
import SearchBar from "../components/search-bar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px 10px 10px;
  border-bottom: 1px solid rgba(167, 168, 168, 0.5);
`;
const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

export default function Search() {
  const { user } = useParams();

  return (
    <Wrapper>
      <ProfileHeader>검색</ProfileHeader>
      <SearchContainer>
        <SearchBar />
      </SearchContainer>
      <SearchResult>{user}</SearchResult>
    </Wrapper>
  );
}
