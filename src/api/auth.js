import axios from "axios";

const fetchData = async (page) => {
  try {
    const apiUrl = `/api/v1/fetchData?page=${page}`;
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
