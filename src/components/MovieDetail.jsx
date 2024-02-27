import React from "react";
import { formatTimestamp } from "../utils/formatTimestamp";
import "./MovieDetail.css";



const MovieDetail = ({ movie, onClose }) => {
  return (
    <div className="movie-detail-overlay" onClick={onClose}>
      <div className="movie-detail-container" onClick={(e) => e.stopPropagation()}>
        <img
          src={movie?.imageUrl}
          loading="lazy"
          alt={`Poster for ${movie.title}`}
          className="movie-detail-image"
        />
        <div className="movie-detail-content">
          <div className="titleDateWarp">
            <h2 className="movie-detail-name">
              <strong>Movie Name: </strong> {movie.moviesName}
            </h2>
            <p>{formatTimestamp(movie?.createdAt)}</p>
          </div>

          <h3 className="movie-detail-title">
            <strong>Title: </strong> {movie.title}
          </h3>
          <p className="movie-detail-description">{movie.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
