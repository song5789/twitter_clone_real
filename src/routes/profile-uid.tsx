import { useParams } from "react-router-dom";

export default function ProfileUid() {
  const { uid } = useParams();
  return <h1>파라미터로 넘어온 uid {uid}</h1>;
}
