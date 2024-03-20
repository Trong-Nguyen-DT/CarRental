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

export { getAllCustomer, createCustomer };
