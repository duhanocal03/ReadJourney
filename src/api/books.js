import instance from "./axiosInstance";

export const getRecommendedBooks = async (params) => {
  const { data } = await instance.get("/books/recommend", { params });
  return data;
};

export const getOwnBooks = async (params) => {
  const { data } = await instance.get("/books/own", { params });
  return data;
};

export const addBook = async (payload) => {
  const { data } = await instance.post("/books/add", payload);
  return data;
};

export const addRecommendedBookToLibrary = async (id) => {
  const { data } = await instance.post(`/books/add/${id}`);
  return data;
};

export const removeBook = async (id) => {
  const { data } = await instance.delete(`/books/remove/${id}`);
  return data;
};

export const getBookById = async (id) => {
  const { data } = await instance.get(`/books/${id}`);
  return data;
};

export const startReading = async (payload) => {
  const { data } = await instance.post("/books/reading/start", payload);
  return data;
};

export const finishReading = async (payload) => {
  const { data } = await instance.post("/books/reading/finish", payload);
  return data;
};

export const deleteReading = async (payload) => {
  const { data } = await instance.delete("/books/reading", { data: payload });
  return data;
};
