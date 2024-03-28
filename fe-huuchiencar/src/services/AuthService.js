import axios from "./customize-axios";

const login = async (username, password) => {
    try {
      const response = await axios.post('auth/login', { username, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post('auth/logout');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export { login, logout };