import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";

const initialState = {
  email: "",
  password: "",
};

export function Login() {
  const [userData, setUserData] = useState(initialState);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setUserData({ ...userData, [name]: value });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (userData.email && userData.password) {
      const isLogger = await auth.signIn(userData.email, userData.password);
      if (isLogger) {
        navigate("/");
      } else {
        alert("Não deu certo");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>TO-DO List</h2>

        <span style={{ fontSize: "16px" }}>Email</span>
        <input
          type="email"
          name="email"
          value={userData.email}
          placeholder="Digite seu email"
          onChange={handleChange}
          className="input"
          required
        />

        <span style={{ fontSize: "16px" }}>Senha</span>
        <input
          type="password"
          name="password"
          value={userData.password}
          placeholder="Digite sua senha"
          onChange={handleChange}
          className="input"
          required
        />

        <button type="submit">Entrar</button>

        <span>
          Não tem conta?{" "}
          <span
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => navigate("/sign-up")}
          >
            Cadastrar
          </span>
        </span>

        <span
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Voltar
        </span>
      </div>
    </form>
  );
}
