import React from "react";
import { Button, Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod } from "app/slices/cart";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "components/CheckoutSteps";

export default function PaymentPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingAddress, payment } = useSelector((state) => state.cart);
    if (!shippingAddress) {
        navigate("/shipping", { state: { from: "/payment" } });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        dispatch(addPaymentMethod(data));
        navigate("/placeorder");
    };
    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>

                    <Col>
                        <Form.Check
                            type="radio"
                            label="Paypal or Credit Card"
                            id="Paypal"
                            defaultValue="Paypal"
                            name="method"
                            defaultChecked={payment.method === "Paypal"}
                        ></Form.Check>
                        <Form.Check
                            type="radio"
                            label="Stripe"
                            id="Stripe"
                            defaultValue="Stripe"
                            name="method"
                            defaultChecked={payment.method === "Stripe"}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Continue
                </Button>
            </Form>
        </div>
    );
}
