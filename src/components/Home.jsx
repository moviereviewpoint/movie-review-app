import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { deletePost, fetchData } from "../api/auth";
import "./Home.css";
import { formatTimestamp } from "../utils/formatTimestamp";
import AdComponent from "./AdComponent";
import MovieDetail from "./MovieDetail";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import ShareButton from "./ShareButton";
import oneErrorImage from "../images/OneErrorImage.png"

const Home = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(null);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [showShareDialog, setShowShareDialog] = useState(false);

  const { postId } = useParams();
  const { deletepost } = useParams();
  const navigator = useNavigate();

  const shareButtonRef = useRef();

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

  const openMovieDetail = (item, index) => {
    if (!deletepost && !shareButtonRef.current?.isClicked()) {
      navigator(`/post/${item._id}`);
      setSelectedMovieIndex(index);
      window.scrollTo(0, 0);
      setShowShareDialog(false);
    } else {
      setShowShareDialog(true);
    }
  };

  // useEffect(() => {
  //   if (selectedMovieId) {
  //     navigator(`/post/${selectedMovieId}`);
  //   }
  // }, [selectedMovieId]);

  const closeMovieDetail = () => {
    setSelectedMovieId(null);
    setSelectedMovieIndex(null);
  };

  let count = 0;
  const handleDeleteClick = async (postId) => {
    console.log(postId);
    count++;
    const secureKey = count === 1 && prompt("Enter the secure key:");

    if (!secureKey) {
      count--;
      return;
    }
    const response = await deletePost(postId, secureKey);
    if (response.status === 200) {
      setItems((prevItems) => prevItems.filter((item) => item._id !== postId));
      console.log("Post deleted successfully");
    } else {
      console.log("Error deleting post");
      count--;
    }
  };

  useEffect(() => {
    // Fetch initial data when the component mounts
    fetchMoreData();
  }, []);

  const handleImageError = (event) => {
    event.target.src = oneErrorImage;
    event.target.alt = 'Default Poster'}

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
          <AdComponent adSlot={process.env.REACT_APP_ADS_SLOT} />

          {selectedMovieId && (
            <MovieDetail
              /* movieId={selectedMovieId}  */ onClose={closeMovieDetail}
            />
          )}

          {items.map((item, index) => (
            <div
              key={index}
              className={`movie-item ${
                selectedMovieIndex === index ? "activeItem" : ""
              }`}
              onClick={() => {
                !deletepost && openMovieDetail(item, index);
              }}
            >
              <img
                src={item?.imageUrl}
                loading="lazy"
                alt={`Poster for ${item.title}`}
                className="movie-image"
                onError={handleImageError}
              />
              <section>
                <div className="Warp">
                  <h2 className="movie-name">
                    <strong>Movie Name : </strong> {item.moviesName}
                  </h2>
                  <p>{formatTimestamp(item?.createdAt)}</p>
                </div>

                <div className="Warp">
                  <h3 className="movie-title">
                    <strong>Title:</strong> {item.title}
                  </h3>
                  {deletepost ? (
                    <FaTrashCan
                      className="delete-icon"
                      size={20}
                      onClick={() => handleDeleteClick(item._id)}
                    />
                  ) : (
                    postId && (
                      <ShareButton
                      className="share-icon"
                        ref={shareButtonRef}
                        itemId={item._id}
                        showShareDialog={showShareDialog}
                      />
                    )
                  )}
                </div>
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
