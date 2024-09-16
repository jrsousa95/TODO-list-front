import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  if (!auth.user) {
    navigate("/login");
  }

  return children;
}
