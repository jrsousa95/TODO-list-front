import { Route, Routes } from "react-router-dom";
import "./App.css";
import { RequireAuth } from "./contexts/Auth/RequireAuth";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Private } from "./pages/Private";
import { Register } from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/private"
        element={
          <RequireAuth>
            <Private />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
