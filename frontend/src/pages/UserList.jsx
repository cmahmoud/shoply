import React, { useEffect } from 'react';
import { Alert, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

import deleteUser from 'app/actions/admin/deleteUser';
import getUsers from 'app/actions/admin/getUsers';

import Loader from 'components/Loader';

export default function UserList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const { users, loading, error } = useSelector((state) => state.admin);

    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(getUsers());
        } else {
            navigate('/');
        }
    }, [dispatch, navigate, user]);

    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id));
    };
    return (
        <div>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : users ? (
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <i className="fas fa-check text-success" />
                                    ) : (
                                        <i className="fas fa-times text-danger" />
                                    )}
                                </td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/user/${user._id}/edit`}
                                    >
                                        <Button
                                            variant="light"
                                            className="btn-sm"
                                        >
                                            <i className="fas fa-edit" />
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() =>
                                            handleDeleteUser(user._id)
                                        }
                                    >
                                        <i className="fas fa-trash" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert variant="danger">{error?.message}</Alert>
            )}
        </div>
    );
}
