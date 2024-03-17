import axios from "./customize-axios";

const login = async (username, password) => {
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  export { login };