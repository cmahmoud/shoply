import loginAction from "app/actions/login.action";
import React, { useEffect } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Loader from "components/Loader";

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    useEffect(() => {
        if (auth.user) {
            navigate("/");
        }
    }, [auth.user, navigate]);
    const loginHandle = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        dispatch(loginAction(data));
    };
    return auth.loading ? (
        <Loader />
    ) : (
        <>
            <h1 className="text-center mb-3">Sign in</h1>
            {auth.error && (
                <Alert variant="danger" className="fw-bold rounded">
                    {auth.error?.message}
                </Alert>
            )}
            <Form onSubmit={loginHandle}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
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
                    />
                </Form.Group>
                <Stack className="col-md-3 mx-auto mb-3">
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Stack>
                <Row>
                    <Col>
                        New Customer? <Link to="/register">Register</Link>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
