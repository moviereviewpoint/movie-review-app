import axios from "axios";
const backendOrigin = process.env.REACT_APP_BACKEND_ORIGIN
const fetchData = async (page) => {
  try {
    const apiUrl = `${backendOrigin}/api/v1/fetchData?page=${page}`;
    // console.log("Fetching data from:", apiUrl);

    const response = await axios.get(apiUrl);
    // console.log("Response from server:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


const uploadData = async (userData) => {
  console.log("Sending formData:", userData);

  try {

    const response = await axios.post(`${backendOrigin}/api/v1/uploadData`, userData);
    // console.log("Response from server:", response.data);
    return response.data;
  } catch (error) {
    // console.error("Error uploading data:", error);
    throw error;
  }
};


const getPostById = async (postId) => {
  try {
    const apiUrl = `${backendOrigin}/api/v1/getPostById/${postId}`;
    const response = await axios.get(apiUrl);
    return response;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw error;
  }
};

const deletePost = async (postId, adminKey) => {
  console.log(adminKey)

  try {
    const response = await axios.delete(`${backendOrigin}/api/v1/delete/${postId}`, {
      headers: {
        Authorization: adminKey, 
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}


export { fetchData, uploadData, getPostById, deletePost };
