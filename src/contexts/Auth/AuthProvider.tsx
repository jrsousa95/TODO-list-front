import { useEffect, useState } from "react";
import { userApi } from "../../hooks/userApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | null>(null);
  const api = userApi();

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem("AUTH_TOKEN");

      if (storageData) {
        const data = await api.validateToken(storageData);

        if (data.user) {
          setUser(data.user);
        }
      }
    };
    validateToken();
  }, [api]);

  const signIn = async (email: string, password: string) => {
    const data = await api.login(email, password);

    console.log(data);

    if (data.token) {
      localStorage.setItem("AUTH_TOKEN", data.token);
      // setUser(data.user);
      setToken(data.token);
      return true;
    }

    return false;
  };

  const signOut = async () => {
    await api.signOut();
    setUser(null);
    localStorage.removeItem("AUTH_TOKEN");
  };

  const setToken = async (token: string) => {
    localStorage.setItem("AUTH_TOKEN", token);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
