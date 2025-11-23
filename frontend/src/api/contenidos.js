import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/contenidos/";

export const getContenidos = async (params = {}) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};