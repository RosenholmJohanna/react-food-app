import React, { useState, useEffect } from "react";
import styled from "styled-components";

const RateMeal = ({ dishId }) => {
  const [dishRatings, setDishRatings] = useState({});
  const [currentRating, setCurrentRating] = useState(0); // current user's rating
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
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

    setDishRatings(updatedRatings);
    localStorage.setItem("ratings", JSON.stringify(updatedRatings));
    setCurrentRating(selectedRating);
  };

  // use reduce methos  // show 0 if no ratings yet
  const calculateAverageRating = () => {
    const ratings = dishRatings[dishId] || [];
    const sumOfRatings = ratings.reduce((sum, rating) => sum + rating, 0);
    const totalRatings = ratings.length + (currentRating !== 0 ? 1 : 0);

    const averageRating = totalRatings === 0 ? 0 : sumOfRatings / totalRatings;
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
            >
              &#9733;
            </StarSymbol>
          </label>
        );
      })}

      <p>Your rating: {currentRating}</p>
      <p>Average rating: {calculateAverageRating().toFixed(1)}</p>
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

// Note fr myself for further development. Fix the rating NOT to show value N/A when no ratings yet (0 not a number in JS)

// N/A - not applicable
// 0 / 2 = !!
//  0 / 0 = !!
// reduce


