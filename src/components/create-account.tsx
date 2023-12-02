import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Close, Container, DisabledButton, Error, Form, Input, InputWrapper, Title, Wrapper } from "./auth-components";

export default function CreateAccount({ onVisible }: { onVisible: any }) {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [check, setCheck] = useState(false);
  const [error, setError] = useState("");
  const { name, email, password } = accountInfo;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setAccountInfo({
      ...accountInfo,
      [name]: value,
    });
    if (accountInfo) {
      const { name, email, password } = accountInfo;
      if (name !== "" && email !== "" && password !== "") {
        setCheck(true);
      } else {
        setCheck(false);
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true);
      setError("");
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Container>
        <Close
          onClick={() => {
            onVisible("create");
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Close>
        <Title>계정을 생성하세요</Title>
        <Form onSubmit={onSubmit}>
          <InputWrapper>
            <Input onChange={onChange} name="name" value={name} type="text" placeholder="이름" required />
          </InputWrapper>
          <InputWrapper>
            <Input onChange={onChange} name="email" value={email} type="email" placeholder="이메일" required />
          </InputWrapper>
          <InputWrapper>
            <Input onChange={onChange} name="password" value={password} placeholder="비밀번호" type="password" required />
          </InputWrapper>
          {check ? <Input className="submit" type="submit" value={isLoading ? "생성중..." : "계정 생성"} /> : <DisabledButton>계정 생성</DisabledButton>}
        </Form>
        {error ? <Error>{error}</Error> : null}
      </Container>
    </Wrapper>
  );
}
