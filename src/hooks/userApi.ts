import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const userApi = () => ({
  validateToken: async (token: string) => {
    const { data: validateToken } = await api.post("/validate-token", {
      token,
    });

    return validateToken;
  },

  login: async (email: string, password: string) => {
    const { data: signIn } = await api.post("/login", { email, password });

    return signIn;
  },

  signOut: async () => {
    localStorage.removeItem("AUTH_TOKEN");
  },

  register: async (name: string, email: string, password: string) => {
    const { data: register } = await api.post("/register", {
      name,
      email,
      password,
    });

    return register;
  },
});
