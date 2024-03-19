import axios from "./customize-axios";

const getAllCustomer = async (accessToken) => {
    try {
        if (!accessToken) {
            throw new Error('Missing accessToken');
        }

        const response = await axios.get('/api/user/customers', {
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

export { getAllCustomer };
