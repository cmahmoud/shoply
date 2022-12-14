import React from 'react';
import { Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Rating from './Rating';

export default function ProductCard({ product }) {
    const { pathname, search } = useLocation();
    return (
        <Card className="my-3 p-3 rounded">
            <Link
                to={`/product/${product._id}`}
                state={{ from: search ? `${pathname}${search}` : pathname }}
            >
                <Card.Img variant="top" src={product.image} />
            </Link>
            <Card.Body>
                <Link
                    to={`/product/${product._id}`}
                    state={{ from: search ? `${pathname}${search}` : pathname }}
                >
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <div className="my-3">
                        <Rating
                            rating={product.rating}
                            reviews={product.numReviews}
                        />
                    </div>
                </Card.Text>
                <Card.Text as="h3">${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
}
