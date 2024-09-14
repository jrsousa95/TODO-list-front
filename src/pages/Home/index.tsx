import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Página Inicial</h1>

      <div>Olá Mundo</div>

      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
}
