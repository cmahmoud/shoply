import React, { useEffect } from 'react';
import {
    Alert,
    Button,
    Card,
    Col,
    Container,
    Form,
    Image,
    ListGroup,
    Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import addItem from 'app/actions/cart/addItem';
import { removeItemFromCart } from 'app/slices/cart';

export default function Cart() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    let [searchParams] = useSearchParams();
    const qty = Number(searchParams.get('qty'));
    const cart = useSelector((state) => state.cart.items);
    useEffect(() => {
        if (id) {
            dispatch(addItem({ id, qty }));
        }
    }, [dispatch, id, qty]);
    const removeItemHandler = (id) => {
        dispatch(removeItemFromCart(id));
    };
    const checkoutHandler = () => {
        if (user) {
            navigate('/shipping');
        } else {
            navigate('/login', { state: { from: '/shipping' } });
        }
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
                        <ListGroup>
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
                                                            addItem({
                                                                id: item.product,
                                                                qty: Number(
                                                                    e.target
                                                                        .value,
                                                                ),
                                                            }),
                                                        )
                                                    }
                                                >
                                                    {[
                                                        ...Array(
                                                            item.countInStock,
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
                                                            item.product,
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
                                        0,
                                    )}
                                    ) items
                                </h2>
                                $
                                {cart
                                    .reduce(
                                        (acc, item) =>
                                            acc + item.qty * item.price,
                                        0,
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
