import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import getOrders from 'app/actions/admin/getOrders';

import Loader from 'components/Loader';

export default function OrdersList() {
    const dispatch = useDispatch();
    const { orders, loading } = useSelector((state) => state.admin);
    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);
    return (
        <div>
            <h1>Orders</h1>
            {loading ? (
                <Loader />
            ) : (
                orders && (
                    <Table
                        striped
                        bordered
                        hover
                        responsive="sm"
                        className="table=sm"
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user.name}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <i className="fas fa-times text-danger" />
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelevered ? (
                                            order.deleverdAt.substring(0, 10)
                                        ) : (
                                            <i className="fas fa-times text-danger" />
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer
                                            to={`/order/${order._id}`}
                                        >
                                            <Button
                                                variant="light"
                                                className="btn-sm"
                                            >
                                                <i className="fas fa-edit" />
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
            )}
        </div>
    );
}
