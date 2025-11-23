import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/contenidos/";

export const getContenidos = async (params = {}) => {
  const token = localStorage.getItem("access");

  const response = await axios.get(API_URL, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getContenido = async (id) => {
  const token = localStorage.getItem("access");

  const response = await axios.get(`${API_URL}${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
