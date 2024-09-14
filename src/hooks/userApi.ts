import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
  // },
});

export const userApi = () => ({
  validateToken: async (token: string) => {
    // backend retorna um objeto user com o id, nome e email
    // return {
    //   user: { id: 1, name: "Junior", email: "juniorsousa_343@hotmail.com" },
    // };

    const { data: validateToken } = await api.post("/validate-token", {
      token,
    });

    return validateToken;
  },

  login: async (email: string, password: string) => {
    // backend retorna um objeto user com o id, nome, email e token
    // return {
    //   user: { id: 1, name: "Junior", email: "juniorsousa_343@hotmail.com" },
    //   token: "sdfaSDFA2S1DF5S4DF51SDF1241SA2F",
    // };

    const { data: signIn } = await api.post("/login", { email, password });

    return signIn;
  },

  signOut: async () => {
    // backend retorna um objeto status com o status
    // return { status: true };

    const { data: signOut } = await api.post("/sign-out");

    return signOut;
  },
});
