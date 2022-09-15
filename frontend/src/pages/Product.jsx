import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Card,
    Col,
    Form,
    Image,
    ListGroup,
    Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import addReview from 'app/actions/products/addReview';
import getProductById from 'app/actions/products/getById';

import Loader from 'components/Loader';
import Meta from 'components/Meta';
import Rating from 'components/Rating';

export default function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);
    const product = useSelector((state) => state.products.item);
    const { loading, error } = useSelector((state) => state.products);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(getProductById(id));
    }, [id, dispatch]);

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
    };
    const handleAddReview = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        dispatch(addReview({ ...data, id: product._id }));
    };

    return loading ? (
        <Loader />
    ) : (
        <div>
            <Link to="/" className="btn btn-dark my-3">
                Go Back
            </Link>
            {product && (
                <>
                    <Meta
                        title={product.name}
                        description={product.description}
                        keywords={product.category}
                    />
                    <Row className="mb-3">
                        <Col md={4}>
                            <Image
                                alt={product.name}
                                src={product.image}
                                fluid
                            />
                        </Col>
                        <Col md={4}>
                            <ListGroup>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        rating={product.rating}
                                        reviews={product.numReviews}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>
                                                    ${product.price}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock > 0
                                                    ? 'In Stock'
                                                    : 'Out Of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty:</Col>
                                                <Col>
                                                    <Form.Select
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(
                                                                e.target.value,
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.countInStock,
                                                            ).keys(),
                                                        ].map((x, i) => (
                                                            <option key={i}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            className="w-100"
                                            type="button"
                                            disabled={
                                                product.countInStock === 0
                                            }
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2 className="mb-3">Reviews</h2>
                            {product.reviews?.length === 0 && (
                                <Alert variant="warning" className="fw-bold">
                                    No Reviews
                                </Alert>
                            )}
                            <ListGroup>
                                {product.reviews?.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating rating={review.rating} />
                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2 className="mb-3">
                                        Write Customer Review
                                    </h2>
                                    {error && (
                                        <Alert variant="danger">
                                            {error.message}
                                        </Alert>
                                    )}
                                    {user ? (
                                        <Form onSubmit={handleAddReview}>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="Rating"
                                            >
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Select
                                                    aria-label="Rating"
                                                    name="rating"
                                                >
                                                    <option value="1">
                                                        1- Poor
                                                    </option>
                                                    <option value="2">
                                                        2- Fair
                                                    </option>
                                                    <option value="3">
                                                        3- Good
                                                    </option>
                                                    <option value="4">
                                                        4- Very Good
                                                    </option>
                                                    <option value="5">
                                                        5- Excellent
                                                    </option>
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="Comment"
                                            >
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    name="comment"
                                                    rows={3}
                                                />
                                            </Form.Group>
                                            <div className="w-100 text-center">
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                >
                                                    Add Review
                                                </Button>
                                            </div>
                                        </Form>
                                    ) : (
                                        <Alert variant="info">
                                            Please{' '}
                                            <Link
                                                to="/login"
                                                className="fw-bold"
                                            >
                                                sign in
                                            </Link>{' '}
                                            to write a review
                                        </Alert>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
}
