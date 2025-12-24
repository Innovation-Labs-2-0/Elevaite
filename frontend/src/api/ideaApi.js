// import api from "./axios";
import api from "./api";


export const createIdea = (data) =>
  api.post("/ideas", data);

export const getIdeas = (params) =>
  api.get("/ideas", { params });

export const getIdeaById = (id) =>
  api.get(`/ideas/${id}`);

export const updateIdea = (id, data) =>
  api.put(`/ideas/${id}`, data);
