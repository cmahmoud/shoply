import {
    Cart,
    Home,
    Login,
    Order,
    Payment,
    PlaceOrder,
    Product,
    ProductList,
    Profile,
    Register,
    Shipping,
    UserEdit,
    UserList,
} from 'pages';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from 'components/Footer';
import Header from 'components/Header';

export default function App() {
    return (
        <BrowserRouter>
            <div className="shoply__app">
                <Header />
                <main className="py-3 h-100">
                    <Container className="h-100">
                        <Routes>
                            <Route index path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/profile">
                                <Route path=":id" element={<Profile />} />
                                <Route index element={<Profile />} />
                            </Route>
                            <Route path="/register" element={<Register />} />
                            <Route path="/product/:id" element={<Product />} />

                            <Route path="/cart">
                                <Route path=":id" element={<Cart />} />
                                <Route index element={<Cart />} />
                            </Route>
                            <Route path="/shipping" element={<Shipping />} />
                            <Route path="/payment" element={<Payment />} />
                            <Route
                                path="/placeorder"
                                element={<PlaceOrder />}
                            />
                            <Route path="/order/:id" element={<Order />} />
                            <Route path="/admin/users" element={<UserList />} />
                            <Route
                                path="/admin/user/:id/edit"
                                element={<UserEdit />}
                            />
                            <Route
                                path="/admin/products"
                                element={<ProductList />}
                            />
                        </Routes>
                    </Container>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}
