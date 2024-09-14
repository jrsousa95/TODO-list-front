import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export function Private() {
  const auth = useContext(AuthContext);

  return (
    <>
      <h1>Página Privada</h1>
      <div>Olá {auth?.user?.name}</div>
    </>
  );
}
