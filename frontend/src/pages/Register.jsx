import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import registerAction from 'app/actions/auth/register';

import Loader from 'components/Loader';

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect');
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (auth.user) {
            navigate('/');
        }
    }, [auth.user, navigate]);

    const handleRegister = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        if (data.password !== data.passwordConfirm) {
            return setMessage("Passwords didn't match");
        }
        dispatch(registerAction(data));
        setMessage(null);
        if (!auth.error.message) {
            navigate(redirect ? redirect : '/');
        }
    };
    return auth.loading ? (
        <Loader />
    ) : (
        <>
            <h1 className="text-center mb-3">Sign up</h1>
            {auth.error && (
                <Alert variant="danger" className="fw-bold rounded">
                    {auth.error.message}
                </Alert>
            )}
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        name="name"
                        autoComplete="off"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        autoComplete="off"
                        name="email"
                        required
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        isInvalid={!!message}
                        required
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="formBasicConfirmPassword"
                >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="passwordConfirm"
                        isInvalid={!!message}
                        required
                    />
                </Form.Group>
                <Stack className="col-md-3 mx-auto mb-3">
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Stack>
                <Row>
                    <Col>
                        Have an account? <Link to="/login">Login Now</Link>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
