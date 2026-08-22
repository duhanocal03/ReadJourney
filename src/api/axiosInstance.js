import axios from "axios";

const instance = axios.create({
  baseURL: "https://readjourney.b.goit.study/api",
});

export const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = "";
};

// If any request comes back unauthorized (expired/invalid token), clear the
// stale session and send the user to /login instead of leaving them stuck
// on a page that will keep failing every request.
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      clearAuthHeader();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;