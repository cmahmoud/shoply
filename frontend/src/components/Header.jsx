import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "app/slices/auth.slice";

export default function Header() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    return (
        <header>
            <Navbar
                bg="dark"
                variant="dark"
                expand="lg"
                collapseOnSelect
                className="py-2"
            >
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Shoply</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart" />
                                    Cart
                                </Nav.Link>
                            </LinkContainer>
                            {auth.user ? (
                                <NavDropdown
                                    title={auth.user.name}
                                    id="username"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item
                                        onClick={() => dispatch(logout())}
                                    >
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className="fas fa-user" />
                                        Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
