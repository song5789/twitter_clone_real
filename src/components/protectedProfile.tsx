import { useParams } from "react-router-dom";
import { auth } from "../firebase";
import Profile from "../routes/profile";

export default function ProtectedProfile({ children }: { children: React.ReactNode }) {
  const { uid } = useParams();
  const user = auth.currentUser;
  if (!user) return;
  if (user.uid === uid) return <Profile />;
  return children;
}
