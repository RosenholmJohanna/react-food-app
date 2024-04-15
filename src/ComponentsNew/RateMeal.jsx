import React, { useState, useEffect } from "react";
import styled from "styled-components";

// N/A - not applicable
// 0 / 2 = !!
//  0 / 0 = !!

const RateMeal = ({ dishId }) => {
  const [dishRatings, setDishRatings] = useState({}); // average, NaN if no ratings yet... // 0 ?
  const [currentRating, setCurrentRating] = useState(0); // my rating
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem("ratings")) || {}; // 0 ?
    setDishRatings(storedRatings);
  }, [dishId]);

  useEffect(() => {
    setCurrentRating(0);
  }, [dishId]);

  const handleRatingChange = (selectedRating) => {
    const updatedRatings = { ...dishRatings };
    updatedRatings[dishId] = [
      ...(updatedRatings[dishId] || []),
      selectedRating,
    ];

    setDishRatings(updatedRatings); // updatde state with new ratings

    localStorage.setItem("ratings", JSON.stringify(updatedRatings));

    setCurrentRating(selectedRating); // my rate // update current rating
  };

  const calculateAverageRating = () => {
    const ratings = dishRatings[dishId] || [];
    const sumOfRatings = ratings.reduce((sum, rating) => sum + rating, 0);
    const totalRatings = ratings.length + (currentRating !== 0 ? 1 : 0); // include currentRating only if it's not zero
    //  const averageRating = sumOfRatings / totalRatings;

    const averageRating =
      sumOfRatings === 0 || totalRatings === 0
        ? "N/A"
        : sumOfRatings / totalRatings;
    return averageRating;
  };

  return (
    <div>
      <h3>Rate this dish</h3>

      {[...Array(5)].map((star, index) => {
        const displayedRating = index + 1;

        return (
          <label key={index}>
            <input
              key={star}
              type="radio"
              name="rating"
              value={displayedRating}
              onChange={() => handleRatingChange(displayedRating)}
            />
            <StarSymbol
              className={
                displayedRating <= (hover || currentRating) ? "active" : ""
              }
              onMouseEnter={() => setHover(displayedRating)}
              // onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </StarSymbol>
          </label>
        );
      })}

      <p>Your rating: {currentRating}</p>
      <p>
        Average rating:
        {calculateAverageRating() === "N/A"
          ? " N/A"
          : calculateAverageRating().toFixed(1)}
      </p>
    </div>
  );
};

export default RateMeal;

const StarSymbol = styled.span`
  color: #000000;
  &:hover,
  &.active {
    color: #ffc107;
  }
`;
