import Footer from "components/Footer";
import Header from "components/Header";
import { Container } from "react-bootstrap";
import { HomePage, ProductPage, CartPage } from "pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <div className="shoply__app">
                <Header />
                <main className="py-3">
                    <Container>
                        <Routes>
                            <Route index path="/" element={<HomePage />} />
                            <Route
                                path="/product/:id"
                                element={<ProductPage />}
                            />
                            <Route path="/cart">
                                <Route path=":id" element={<CartPage />} />
                                <Route index element={<CartPage />} />
                            </Route>
                        </Routes>
                    </Container>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}