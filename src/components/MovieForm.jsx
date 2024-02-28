// MovieForm.js

import React, { useState } from "react";
import "./MovieForm.css"; // Import the CSS file for styling
import { FaCircleNotch, FaImages } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { uploadData } from "../api/auth";

const MovieForm = ({ onSubmit }) => {
  const [movieName, setMovieName] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadStatusButton, setUploadStatusButton] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [protectKey, setProtectKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigator = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      setErrorMessage("please wait...");
      const formData = new FormData();
      formData.append("movieTitle", movieTitle);
      formData.append("description", description);
      formData.append("movieName", movieName);
      formData.append("adminKey", protectKey);
  
      // Append the image file only if it exists
      if (imageFile) {
        formData.append("image", imageFile);
      }
  
      await uploadData(formData);
  
      // console.log(response);
  
      // Reset form fields if needed
      setMovieName("");
      setMovieTitle("");
      setDescription("");
      setImageFile(null);
      setLoading(false);
      setSelectedImage(null);
      setErrorMessage("uploaded successfully on server ! :) ");
      setTimeout(() => {
        navigator('/')
      }, 1500);
    } catch (error) {
      // console.error("Error uploading data:", error);
      // console.log(error);
      setLoading(false);
      setUploadStatusButton(true);
  
      // Check if the error message is related to an incorrect admin key
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "Please provide correct password"
      ) {
        setErrorMessage("Incorrect protect key. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
      setImageFile(file);
    } else {
      setSelectedImage(null);
      setImageFile(null);
    }
  };
  
  return (
    <div className="register">
      <section>
        <Link className="websitehomelink" to="/">
        moviereviewpoint
        </Link>
        <form onSubmit={handleSubmit}>
          <label htmlFor="adminKey">protect key:</label>
          <input
            maxLength={35}
            type="password"
            id="adminKey"
            value={protectKey}
            onChange={(e) => setProtectKey(e.target.value)}
            placeholder="protect key ..."
            autoFocus
            required
          />

          <label htmlFor="name">Movie Name:</label>
          <input
            maxLength={35}
            type="text"
            id="name"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            placeholder="Movie Name"
            required
          />

          <label htmlFor="username">Movie Title:</label>
          <input
            maxLength={40}
            type="text"
            id="username"
            className="usernameField"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            placeholder="Movie Title"
            required
          />

          <label htmlFor="email">Description:</label>
          <textarea
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Movie Description"
            translate="no"
            required
          />

          <label htmlFor="imageInput" className="imageInput" >
            {selectedImage !== null ? (
              <img
                src={selectedImage}
                loading="lazy"
                alt=""
              />
            ) : (
              <FaImages  className="icon" />
            )}
          </label>

          <input
            style={{ display: "none" }}
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <span className="error-message">{errorMessage}</span>
          <button type="submit">
            {uploadStatusButton ? (
              "Saved"
            ) : !loading ? (
              "Save"
            ) : (
              <FaCircleNotch className="circle" />
            )}
          </button>
        </form>
      </section>
    </div>
  );
};

export default MovieForm;
