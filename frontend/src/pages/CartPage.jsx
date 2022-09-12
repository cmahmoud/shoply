import React, { useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import addToCartAction from "app/actions/addToCart.action";
import { removeItemFromCart } from "app/slices/cart.slice";
import {
    Col,
    Row,
    Alert,
    ListGroup,
    Image,
    Form,
    Button,
    Card,
    Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CartPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    let [searchParams] = useSearchParams();
    const qty = Number(searchParams.get("qty"));
    const cart = useSelector((state) => state.cart.items);
    useEffect(() => {
        if (id) {
            dispatch(addToCartAction({ id, qty }));
        }
    }, [dispatch, id, qty]);
    const removeItemHandler = (id) => {
        dispatch(removeItemFromCart(id));
    };
    const checkoutHandler = () => {
        console.log("checkout handler");
    };
    return (
        <Container>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cart?.length === 0 ? (
                        <Alert variant="info" className="fw-bold">
                            Your cart is empty <Link to="/">Go Back</Link>
                        </Alert>
                    ) : (
                        <ListGroup variant="flush">
                            {cart?.map((item) => {
                                return (
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fluid
                                                    rounded
                                                />
                                            </Col>
                                            <Col md={3}>
                                                <Link
                                                    to={`/product/${item.product}`}
                                                >
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={2}>{item.price}</Col>
                                            <Col md={3}>
                                                <Form.Select
                                                    value={item.qty}
                                                    onChange={(e) =>
                                                        dispatch(
                                                            addToCartAction({
                                                                id: item.product,
                                                                qty: Number(
                                                                    e.target
                                                                        .value
                                                                ),
                                                            })
                                                        )
                                                    }
                                                >
                                                    {[
                                                        ...Array(
                                                            item.countInStock
                                                        ).keys(),
                                                    ].map((x, i) => (
                                                        <option key={i}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Col>
                                            <Col md={2}>
                                                <Button
                                                    type="button"
                                                    variant="light"
                                                    className="w-100"
                                                    onClick={() =>
                                                        removeItemHandler(
                                                            item.product
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-trash" />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>
                                    Subtotal (
                                    {cart.reduce(
                                        (acc, item) => acc + item.qty,
                                        0
                                    )}
                                    ) items
                                </h2>
                                $
                                {cart
                                    .reduce(
                                        (acc, item) =>
                                            acc + item.qty * item.price,
                                        0
                                    )
                                    .toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="w-100"
                                    disabled={cart.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Proceed To Checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}