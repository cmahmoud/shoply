import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "components/Rating";
import fetchProductById from "app/actions/product.action";
import { useDispatch, useSelector } from "react-redux";
import Loader from "components/Loader";

export default function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);
    const product = useSelector((state) => state.products.item);
    const loading = useSelector((state) => state.products.loading);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [id, dispatch]);

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
    };

    return loading ? (
        <Loader />
    ) : (
        <div>
            <Link to="/" className="btn btn-dark my-3">
                Go Back
            </Link>
            {product && (
                <Row>
                    <Col md={4}>
                        <Image alt={product.name} src={product.image} fluid />
                    </Col>
                    <Col md={4}>
                        <ListGroup variant="flush">
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
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0
                                                ? "In Stock"
                                                : "Out Of Stock"}
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
                                                        setQty(e.target.value)
                                                    }
                                                >
                                                    {[
                                                        ...Array(
                                                            product.countInStock
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
                                        disabled={product.countInStock === 0}
                                    >
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    );
}
