import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import {StarRatingProps} from "../../types/props/lessons/StarRatingProps";

const StarRating = ({ rating, setReviewRating }: StarRatingProps) => {
    const [currentRating, setCurrentRating] = useState<number | null>(rating);
    const [hover, setHover] = useState<number | null>(null);

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label key={i}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => {
                                setCurrentRating(ratingValue);
                                setReviewRating(ratingValue);
                            }}
                            style={{ display: 'none' }}
                        />
                        <FaStar
                            className="star"
                            color={ratingValue <= ((hover || currentRating) || 1) ? '#ffc107' : '#e4e5e9'}
                            size={30}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
};
export default StarRating;
