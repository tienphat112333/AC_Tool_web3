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

export const getTokens = async (page: number, limit: number) => {
    try{
        const response = await api.get(`/tokens?page=${page}&limit=${limit}`)
        return response.data
    }catch(error){
        console.error('Error fetching tokens:', error)
        throw error
    }
}