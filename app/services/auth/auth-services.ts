import axios from "@/app/libs/axios";

const authServices = {
  csrf: async () => await axios.get("/sanctum/csrf-cookie"),
  login: async (email: string, password: string) => {
    await authServices.csrf();

    try {
      const response = await axios.post("/login", {
        email: email,
        password: password,
      });
      return response;
    } catch (error: any) {
      console.log(error.response.data);
      return error.response.data;
    }
  },
  logout: async () => {
    const response = await axios.post("/logout");
    return response.data;
  },
  register: async (email: string, password: string) => {
    const response = await axios.post("/register", {
      email,
      password,
    });
    return response.data;
  },
  me: async () => {
    const response = await axios.get("/me");
    return response.data;
  },
};

export default authServices;
