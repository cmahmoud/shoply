import React, { useEffect } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';

import getUser from 'app/actions/admin/getUser';
import updateUser from 'app/actions/admin/updateUser';

import Loader from 'components/Loader';

export default function UserEdit() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { user, loading } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getUser(id));
    }, [dispatch, id]);

    const handleUserEdit = (e, userId) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        dispatch(
            updateUser({
                ...data,
                isAdmin: e.target.admin.checked,
                id: userId,
            }),
        );
    };
    return loading ? (
        <Loader />
    ) : (
        <>
            <LinkContainer to="/admin/users">
                <Button variant="dark" className="mb-3">
                    Go Back
                </Button>
            </LinkContainer>
            {user && (
                <Form onSubmit={(e) => handleUserEdit(e, user._id)}>
                    <Form.Group className="mb-3" controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            name="name"
                            autoComplete="off"
                            defaultValue={user.name}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            autoComplete="off"
                            name="email"
                            defaultValue={user.email}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Admin">
                        <Form.Check
                            type="checkbox"
                            id="Admin"
                            label="Is Admin"
                            name="admin"
                            value={user.isAdmin}
                            defaultChecked={user.isAdmin}
                        />
                    </Form.Group>
                    <Stack className="col-md-3 mx-auto mb-3">
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Stack>
                </Form>
            )}
        </>
    );
}
