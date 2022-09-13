import React, { useEffect } from 'react';
import { Alert, Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import createOrder from 'app/actions/order/createOrder';

import CheckoutSteps from 'components/CheckoutSteps';

export default function PlaceOrder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shippingAddress, payment, items } = useSelector(
        (state) => state.cart,
    );
    const { order, error } = useSelector((state) => state.orders);
    // price
    const addDecimal = (num) => {
        return Number((Math.round(num * 100) / 100).toFixed(2));
    };
    const itemsPrice = addDecimal(
        items.reduce((acc, item) => acc + item.price * item.qty, 0),
    );
    const shippingPrice = addDecimal(itemsPrice > 100 ? 25.5 : 50);
    const taxPrice = addDecimal(0.05 * itemsPrice);
    const totalPrice = Number(
        (taxPrice + shippingPrice + itemsPrice).toFixed(2),
    );

    useEffect(() => {
        if (order) {
            navigate(`/order/${order._id}`);
        }
    }, [navigate, order]);

    const handlePlaceOrder = () => {
        dispatch(
            createOrder({
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
                shippingAddress,
                orderItems: items,
                paymentMethod: payment.method,
            }),
        );
    };
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {shippingAddress?.address},{' '}
                                {shippingAddress?.city},{' '}
                                {shippingAddress?.postalcode},{' '}
                                {shippingAddress?.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {payment?.method}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {items.length === 0 ? (
                                <Alert variant="warning">
                                    Your Cart is Empty
                                </Alert>
                            ) : (
                                <ListGroup variant="flush">
                                    {items.map((item) => {
                                        return (
                                            <ListGroup.Item key={item._id}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fluid
                                                            rounded
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Link
                                                            to={`/product/${item.product}`}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x{' '}
                                                        {item.price} ={' '}
                                                        {item.price * item.qty}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        );
                                    })}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && (
                                <Alert variant="danger">{error.message}</Alert>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                typ="button"
                                className="w-100"
                                disabled={items.length === 0}
                                onClick={handlePlaceOrder}
                            >
                                Place Order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    );
}
