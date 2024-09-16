import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
  },
});

export const taskApi = () => ({
  createTask: async (title: string) => {
    const { data: createTask } = await api.post("/task", { title });

    return createTask;
  },

  getTasks: async () => {
    const { data: getTasks } = await api.get("/tasks");

    return getTasks;
  },

  updateTask: async (id: number, title: string) => {
    const { data: updateTask } = await api.put(`/tasks/${id}`, { title });

    return updateTask;
  },

  deleteTask: async (id: number) => {
    await api.delete(`/tasks/${id}`);
  },
});
