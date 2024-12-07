import axios from 'axios';
import BASE_URL from '../config/BackendURL';

// get blogs from backend
export const GetBlogs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/blog/get`);
    return response.data;
  } catch (error) {
    return { message: "Internal Server Error!" };
  }
}