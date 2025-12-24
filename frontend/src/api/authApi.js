// import api from "./axios";
import api from "./api";

export const login = (data) =>
  api.post("/auth/login", data);

export const logout = () =>
  api.post("/auth/logout");

export const getCurrentUser = () =>
  api.get("/auth/me");
