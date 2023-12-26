import styled from "styled-components";
import { ProfileHeader } from "../components/profile-components";
import SearchBar from "../components/search-bar";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { IUserInfo } from "../model/interface";
import UserCard from "../components/usercard";

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
  align-items: center;
  gap: 10px;
  padding: 10px;
`;
const UserCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 5px;
`;
const ReasultHeader = styled.div`
  width: 100%;
  padding: 10px;
  text-align: center;
  font-size: 20px;
`;

export default function Search() {
  const [searchParams] = useSearchParams();
  const [searchUser, setSearchUser] = useState<string | null>("");
  const [searchResult, setSearchResult] = useState<IUserInfo[]>([]);

  useEffect(() => {
    const queryUser = searchParams.get("username");
    setSearchUser(queryUser);
    const fetchUser = async () => {
      const target = collection(db, "users");
      const userInfoQuery = query(target, where("displayName", "==", queryUser));
      const snapshot = await getDocs(userInfoQuery);

      const userSnapshot = snapshot.docs.map((doc) => {
        const { createAt, displayName, email, photoURL, uid } = doc.data();
        return {
          docId: doc.id,
          createAt,
          displayName,
          email,
          photoURL,
          uid,
        };
      });
      setSearchResult(userSnapshot);
    };
    fetchUser();
  }, []);
  return (
    <Wrapper>
      <ProfileHeader>검색</ProfileHeader>
      <SearchContainer>
        <SearchBar />
      </SearchContainer>
      <SearchResult>
        <ReasultHeader>{searchUser ? `'${searchUser}' 검색결과` : "검색어를 입력 후 검색을 해주세요."}</ReasultHeader>
        {searchResult.length != 0 ? (
          <UserCards>
            {searchResult.map((user) => (
              <UserCard key={user.docId} {...user} />
            ))}
          </UserCards>
        ) : (
          <span>검색결과가 없습니다.</span>
        )}
      </SearchResult>
    </Wrapper>
  );
}
