import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/expenses`;

// Fetch all expenses from the backend
export const getExpenses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Send a new expense to the backend to be saved
export const createExpense = async (expense) => {
  const response = await axios.post(API_URL, expense);
  return response.data;
};

// Send updated fields for an existing expense
// id is the expense to update
// expense is an object with the fields to update
export const updateExpense = async (id, expense) => {
  const response = await axios.put(`${API_URL}/${id}`, expense);
  return response.data;
};


export const deleteExpense = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

// Fetch the total amount and category breakdown from the backend
export const getSummary = async () => {
  const response = await axios.get(`${API_URL}/summary/total`);
  return response.data;
};
