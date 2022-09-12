import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function Footer() {
    return (
        <footer className="mt-auto">
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; Shoply
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
