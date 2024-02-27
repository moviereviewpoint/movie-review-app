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

    const response = await axios.post("/api/v1/uploadData", userData);
    // console.log("Response from server:", response.data);
    return response.data;
  } catch (error) {
    // console.error("Error uploading data:", error);
    throw error;
  }
};


export { fetchData, uploadData };
