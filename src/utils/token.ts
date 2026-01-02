import api from "./api";

export const createToken = async (formData: FormData) => {
  try {
    const response = await api.post("/tokens", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating token:", error);
    throw error;
  }
};
