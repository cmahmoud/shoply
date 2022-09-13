import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addShippingAddress } from "app/slices/cart";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "components/CheckoutSteps";

export default function ShippingPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const shippingAddress = useSelector((state) => state.cart.shippingAddress);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        dispatch(addShippingAddress(data));
        navigate("/payment");
    };
    return (
        <div>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="Address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Address"
                        name="address"
                        defaultValue={shippingAddress.address}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="City">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="City"
                        name="city"
                        defaultValue={shippingAddress.city}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="PostalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Postal Code"
                        name="postalCode"
                        defaultValue={shippingAddress.postalCode}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Country"
                        name="country"
                        defaultValue={shippingAddress.country}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Continue
                </Button>
            </Form>
        </div>
    );
}
