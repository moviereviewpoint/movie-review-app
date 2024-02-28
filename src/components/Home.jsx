import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchData } from "../api/auth";
import "./Home.css";
import { formatTimestamp } from "../utils/formatTimestamp";
import AdComponent from "./AdComponent";
import MovieDetail from "./MovieDetail";


const Home = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(null);

  const fetchMoreData = async () => {
    try {
      if (loading || !hasMore) {
        return;
      }

      setLoading(true);
      setError(null);

      const newData = await fetchData(page);

      if (newData && Array.isArray(newData) && newData.length > 0) {
        setItems((prevItems) => [...prevItems, ...newData]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again.");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const openMovieDetail = (movie, index) => {
    setSelectedMovie(movie);
    setSelectedMovieIndex(index);
    window.scrollTo(0, 0);
  };

  const closeMovieDetail = () => {
    setSelectedMovie(null);
    setSelectedMovieIndex(null);
  };

  useEffect(() => {
    // Fetch initial data when the component mounts
    fetchMoreData();
  }, []);

  return (
    <>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 className="loading-message">Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center", padding: "20px", color: "#555" }}>
            <strong>Yay! You have seen it all</strong>
          </p>
        }
      >
        <div className="InfiniteScrollContainer">
          <AdComponent adSlot={process.env.REACT_APP_ADS_SLOT}/>

          {selectedMovie && (
            <MovieDetail movie={selectedMovie} onClose={closeMovieDetail} />
          )}
          {items.map((item, index) => (
            <div
              key={index}
              className={`movie-item ${selectedMovieIndex === index ? 'activeItem' : ''}`}
              onClick={() => openMovieDetail(item, index)}
            >
              <img
                src={item?.imageUrl}
                loading="lazy"
                alt={`Poster for ${item.title}`}
                className="movie-image"
              />
              <section>
                <div className="titleDateWarp">
                  <h2 className="movie-name">
                    <strong>Movie Name : </strong> {item.moviesName}
                  </h2>
                  <p>{formatTimestamp(item?.createdAt)}</p>
                </div>

                <h3 className="movie-title">
                  <strong>Title:</strong> {item.title}
                </h3>
                <p className="movie-description">
                  {item.description?.length > 200
                    ? `${item.description.substring(0, 200)}...`
                    : item.description}
                </p>
              </section>
            </div>
          ))}
        </div>
        {error && <p className="error-message">{error}</p>}
      </InfiniteScroll>
    </>
  );
};

export default Home;
