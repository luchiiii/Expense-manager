import axios from "axios";

const API_URL = "http://localhost:5000/api/expenses";

export const getExpenses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createExpense = async (expense) => {
  const response = await axios.post(API_URL, expense);
  return response.data;
};

export const updateExpense = async (id, expense) => {
  const response = await axios.put(`${API_URL}/${id}`, expense);
  return response.data;
};

export const deleteExpense = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getSummary = async () => {
  const response = await axios.get(`${API_URL}/summary/total`);
  return response.data;
};
