import React from 'react';

export default function Rating({ rating, reviews }) {
    return (
        <div className="rating">
            {[1, 2, 3, 4, 5].map((num) => {
                return (
                    <span key={num} className="text-warning">
                        <i
                            className={
                                rating >= num
                                    ? 'fas fa-star'
                                    : rating >= num - 0.5
                                    ? 'fas fa-star-half-alt'
                                    : 'far fa-star'
                            }
                        />
                    </span>
                );
            })}
            {reviews && <span className="ms-2">{reviews} reviews</span>}
        </div>
    );
}
