import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import profileDataAction from "app/actions/profileData.action";
import updateProfileAction from "app/actions/updateProfile.action";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            dispatch(profileDataAction());
        } else {
            navigate("/login");
        }
    }, [dispatch, navigate, user]);

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        dispatch(updateProfileAction(data));
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
            </Col>
        </Row>
    );
}
