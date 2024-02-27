import React, { useState } from 'react';

const ReviewForm = () => {
  const [review, setReview] = useState({
    rating: '',
    comment: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, possibly send review data to your backend
  };

  return (
    <div>
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            value={review.rating}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Comment:
          <textarea
            name="comment"
            value={review.comment}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
