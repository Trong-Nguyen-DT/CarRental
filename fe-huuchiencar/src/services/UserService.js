import axios from "./customize-axios";

const getAllCustomer = async (accessToken) => {
    try {
        if (!accessToken) {
            throw new Error('Missing accessToken');
        }

        const response = await axios.get('user/customers', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        // Xử lý lỗi
        console.error('Error in getAllCustomer:', error);
        throw error;
    }
};


const createCustomer = async (accessToken, formData) => {
    try {
        if (!accessToken) {
            throw new Error('Missing accessToken');
        }

        const response = await axios.post('user/customers', formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        // Xử lý lỗi
        console.error('Error in createCustomer:', error);
        throw error;
    }
};

const updateCustomer = async (accessToken, body) => {
    try {
        if (!accessToken) {
            throw new Error('Missing accessToken');
        }

        const response = await axios.put('user/customers', body, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });

        return response.data;
    } catch (error) {
        // Xử lý lỗi
        console.error('Error in createCustomer:', error);
        throw error;
    }
};

const deleteCustomer = async (accessToken, customerId) => {
    try {
        if (!accessToken) {
            throw new Error('Missing accessToken');
        }

        const response = await axios.delete(`user/customers/${customerId}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });

        return response.data;
    } catch (error) {
        // Xử lý lỗi
        console.error('Error in createCustomer:', error);
        throw error;
    }
};

const getAllCar = async (accessToken) => {
    try {
        if (!accessToken) {
            throw new Error('Missing accessToken');
        }

        const response = await axios.get('user/cars', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        // Xử lý lỗi
        console.error('Error in getAllCar:', error);
        throw error;
    }
};

const createCar = async (accessToken, formData) => {
    try {
        if (!accessToken) {
            throw new Error('Missing accessToken');
        }

        const response = await axios.post('user/cars', formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        // Xử lý lỗi
        console.error('Error in createCustomer:', error);
        throw error;
    }
};

const updateCar = async (accessToken, body) => {
    try {
        if (!accessToken) {
            throw new Error('Missing accessToken');
        }

        const response = await axios.put('admin/cars', body, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });

        return response.data;
    } catch (error) {
        // Xử lý lỗi
        console.error('Error in createCar:', error);
        throw error;
    }
};

const deleteCar = async (accessToken, carId) => {
    try {
        if (!accessToken) {
            throw new Error('Missing accessToken');
        }

        const response = await axios.delete(`admin/cars/${carId}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });

        return response.data;
    } catch (error) {
        // Xử lý lỗi
        console.error('Error in createCar:', error);
        throw error;
    }
};

const getInfoDashboards = async (accessToken, day, month, year) => {
    try {
        const response = await axios.get('admin/dashboard', {
            params: {
                year: year,
                month: month,
                day: day
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        // Xử lý lỗi
        console.error('Error calling getInfoDashboard API:', error);
        throw error;
    }
};

const getAllHistory = async (accessToken) => {
    try {
        const response = await axios.get('admin/history', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        // Xử lý lỗi
        console.error('Error calling getInfoDashboard API:', error);
        throw error;
    }
};

export { getAllCustomer, createCustomer, updateCustomer, deleteCustomer, getAllCar, createCar, deleteCar, updateCar, getInfoDashboards, getAllHistory };
