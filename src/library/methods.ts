import { UserCredential } from "firebase/auth";
import { CollectionReference, DocumentData, addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const convertToLocaleDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString();
};

export const handleUserInfoQuery = async (collections: CollectionReference<DocumentData, DocumentData>, credentials: UserCredential) => {
  // 소셜로그인시 유저 정보가 있는지 체크하고, DB에 중복 저장하지 않도록합니다.
  // 로그인 시 받아오는 인증 정보에서 유저 데이터 추출.
  const { uid, displayName, photoURL, email } = credentials.user;
  // 로그인한 유저의 uid 와 db 의 users 콜렉션에서 동일한 uid를 가진 것을 fetch
  const q = query(collections, where("uid", "==", uid));
  const userSnapShot = await getDocs(q);
  // 만약 있다면 함수 종료
  if (userSnapShot.docs.length !== 0) return;
  // 없다면 "users" 콜렉션에 유저정보 저장
  const collectionRef = collection(db, "users");
  await addDoc(collectionRef, {
    uid,
    displayName: displayName || null,
    photoURL: photoURL || null,
    email,
    createAt: Date.now(),
  });
};
