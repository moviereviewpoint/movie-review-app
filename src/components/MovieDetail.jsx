import React, { useEffect, useState } from 'react';
import { formatTimestamp } from '../utils/formatTimestamp';
import { getPostById } from '../api/auth';
import { useParams } from 'react-router-dom';

import './MovieDetail.css'; // Import the MovieDetail styles
import Home from './Home';
import { useLoading } from './context/LoadingContext';
import ShareButton from './ShareButton';
import oneErrorImage from "../images/OneErrorImage.png"

function MovieDetail({ onClose }) {
  const [postDetails, setPostDetails] = useState(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [error, setError] = useState(null);
const  {setProgress} = useLoading();
  const { postId } = useParams();


  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setProgress(50); 
        const response = await getPostById(postId);
        const details = response?.data;
        setPostDetails(details);
      } catch (error) {
        console.error("Error fetching post details:", error);
        setError("Error fetching post details. Please try again.");
      } finally {
        setProgress(100); 
      }
    };
  
    fetchPostDetails();
  }, [postId]);
  
const handleShareClick = () => {
  setShowShareDialog(true)
}
const handleImageError = (event) => {
  event.target.src = oneErrorImage;
  event.target.alt = 'Default Poster'}

  return (
    <>
      {postDetails ? (
        <div className="movie-detail-overlay" onClick={onClose}>
          
          <div className="movie-detail-container" onClick={(e) => e.stopPropagation()}>
            <img
              src={postDetails.imageUrl}
              loading="lazy"
              alt={`Poster for ${postDetails.title}`}
              className="movie-detail-image"
              onError={handleImageError}
            />
            <hr style={{marginBottom: "10px"}}/>
            <div className="movie-detail-content">
              <div className="wrap">
                <h2 className="movie-detail-name">
                  <strong>Movie Name: </strong> {postDetails.moviesName || ''}
                </h2>
                <p>{formatTimestamp(postDetails.createdAt) || ''}</p>
              </div>

            <div className="wrap">
              <h3 className="movie-detail-title">
                <strong>Title: </strong> {postDetails.title || ''}
              </h3>
              <ShareButton 
                        itemId={postDetails._id}
                        showShareDialog={showShareDialog}
                        onClick={handleShareClick}
                      />
              </div>
              <p className="movie-detail-description">{postDetails.description || ''}</p>
            </div>
          </div>
          {postId && <Home />}
        </div>
      ) : <p>{error}</p>}
    </>
  );
}

export default MovieDetail;
