import instance from "./axiosInstance";

export const registerUser = async (payload) => {
  const { data } = await instance.post("/users/signup", payload);
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await instance.post("/users/signin", payload);
  return data;
};

export const logoutUser = async () => {
  const { data } = await instance.post("/users/signout");
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await instance.get("/users/current");
  return data;
};

export const refreshUser = async () => {
  const { data } = await instance.get("/users/current/refresh");
  return data;
};