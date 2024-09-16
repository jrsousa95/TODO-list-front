import { useState } from "react";
import { userApi } from "../../hooks/userApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | null>(null);
  const api = userApi();

  // useEffect(() => {
  //   const validateToken = async () => {
  //     const storageData = localStorage.getItem("AUTH_TOKEN");

  //     if (storageData) {
  //       try {
  //         await api.validateToken(storageData);
  //       } catch (error) {
  //         localStorage.removeItem("AUTH_TOKEN");

  //         setUser(null);

  //         toast({
  //           title: "Token inválido",
  //           description: `${error}`,
  //           status: "error",
  //           duration: 3000,
  //           isClosable: true,
  //         });
  //       }
  //     }
  //   };
  //   validateToken();
  // }, [api, toast]);

  const signIn = async (email: string, password: string) => {
    const { user } = await api.login(email, password);

    if (user) {
      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      setToken(user.token);
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
