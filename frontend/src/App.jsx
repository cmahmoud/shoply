import Footer from "components/Footer";
import Header from "components/Header";
import { Container } from "react-bootstrap";
import { HomePage, ProductPage, CartPage } from "pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import ProfilePage from "pages/ProfilePage";
import ShippingPage from "pages/ShippingPage";
import PaymentPage from "pages/PaymentPage";
import PlaceOrderPage from "pages/PlaceOrderPage";
import OrderPage from "pages/OrderPage";

export default function App() {
    return (
        <BrowserRouter>
            <div className="shoply__app">
                <Header />
                <main className="py-3 h-100">
                    <Container className="h-100">
                        <Routes>
                            <Route index path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/profile">
                                <Route path=":id" element={<ProfilePage />} />
                                <Route index element={<ProfilePage />} />
                            </Route>
                            <Route
                                path="/register"
                                element={<RegisterPage />}
                            />
                            <Route
                                path="/product/:id"
                                element={<ProductPage />}
                            />

                            <Route path="/cart">
                                <Route path=":id" element={<CartPage />} />
                                <Route index element={<CartPage />} />
                            </Route>
                            <Route
                                path="/shipping"
                                element={<ShippingPage />}
                            />
                            <Route path="/payment" element={<PaymentPage />} />
                            <Route
                                path="/placeorder"
                                element={<PlaceOrderPage />}
                            />
                            <Route path="/order/:id" element={<OrderPage />} />
                        </Routes>
                    </Container>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}
