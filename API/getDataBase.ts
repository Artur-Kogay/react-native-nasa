import axios from "axios";

export const fetchData = async (URL: string) => {
    try {
        const response = await axios.get(URL)
        return response.data
    } catch (error) {
        throw error
    }
};
