import getOrder from "app/actions/order/getOrder";
import React, { useEffect } from "react";
import { Alert, Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "components/Loader";
import payOrder from "app/actions/order/payOrder";

export default function OrderPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const { order, error, loading } = useSelector((state) => state.orders);
    const { id } = useParams();

    useEffect(() => {
        if (!user) {
            navigate("/login", { state: { from: `/order/${id}` } });
        } else {
            dispatch(getOrder(id));
        }
    }, [dispatch, id, user, navigate]);

    const handleOrderPay = () => {
        dispatch(payOrder(order._id));
    };

    return loading ? (
        <Loader />
    ) : (
        order && (
            <div>
                <h1>Order: {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong>
                                    {order.user.name}
                                </p>
                                <p>
                                    <a href={`mailto:${order.user.email}`}>
                                        {order.user.email}
                                    </a>
                                </p>
                                <p>
                                    <strong>Address: </strong>
                                    {order.shippingAddress?.address},{" "}
                                    {order.shippingAddress?.city},{" "}
                                    {order.shippingAddress?.postalcode},{" "}
                                    {order.shippingAddress?.country}
                                </p>
                                {order.isDelivered ? (
                                    <Alert variant="success">
                                        Paid on {order.deliveredAt}
                                    </Alert>
                                ) : (
                                    <Alert variant="danger">
                                        Not Delivered
                                    </Alert>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ? (
                                    <Alert variant="success">
                                        Paid on {order.paidAt}
                                    </Alert>
                                ) : (
                                    <Alert variant="danger">Not paid</Alert>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? (
                                    <Alert variant="warning">
                                        Your Cart is Empty
                                    </Alert>
                                ) : (
                                    <ListGroup variant="flush">
                                        {order.orderItems.map((item) => {
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
                                                            {item.qty} x{" "}
                                                            {item.price} ={" "}
                                                            {item.price *
                                                                item.qty}
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
                        <ListGroup>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {error && (
                                <ListGroup.Item>
                                    <Alert variant="danger">
                                        {error.message}
                                    </Alert>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button
                                    variant="success"
                                    type="button"
                                    className="w-100"
                                    onClick={handleOrderPay}
                                    disabled={order.isPaid}
                                >
                                    Pay
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </div>
        )
    );
}
