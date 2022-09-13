import React, { useEffect } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

import getOrders from 'app/actions/user/getOrders';
import getProfile from 'app/actions/user/getProfile';
import updateProfile from 'app/actions/user/updateProfile';

import Loader from 'components/Loader';

export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile, user } = useSelector((state) => state.auth);
    const { items, loading } = useSelector((state) => state.orders);
    useEffect(() => {
        if (user) {
            dispatch(getProfile());
            dispatch(getOrders());
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, user]);

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        dispatch(updateProfile(data));
    };
    return (
        <Row>
            <Col md={3}>
                <Form onSubmit={handleUpdateProfile}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Name"
                            defaultValue={profile?.name}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            defaultValue={profile?.email}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h3>My Orders</h3>
                {loading ? (
                    <Loader />
                ) : (
                    items && (
                        <Table
                            striped
                            bordered
                            hover
                            responsive
                            className="table-sm"
                        >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delevired</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td>{item._id}</td>
                                            <td>
                                                {item.createdAt.substring(
                                                    0,
                                                    10,
                                                )}
                                            </td>
                                            <td>{item.totalPrice}</td>
                                            <td>
                                                {item.isPaid ? (
                                                    item.paidAt.substring(0, 10)
                                                ) : (
                                                    <i className="fas fa-times text-danger" />
                                                )}
                                            </td>
                                            <td>
                                                {item.isDelivered ? (
                                                    item.deliveredAt.substring(
                                                        0,
                                                        10,
                                                    )
                                                ) : (
                                                    <i className="fas fa-times text-danger" />
                                                )}
                                            </td>
                                            <td>
                                                <LinkContainer
                                                    to={`/order/${item._id}`}
                                                >
                                                    <Button
                                                        className="btn-sm"
                                                        variant="light"
                                                    >
                                                        Details
                                                    </Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    )
                )}
            </Col>
        </Row>
    );
}
