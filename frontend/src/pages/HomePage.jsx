import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import fetchProducts from "app/actions/products.action";
import Loader from "components/Loader";

export default function HomePage() {
    const dispatch = useDispatch();
    const { list, loading } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : (
        <>
            <h1>Latest Products</h1>

            <Row>
                {list?.map((product) => {
                    return (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <ProductCard product={product} />
                        </Col>
                    );
                })}
            </Row>
        </>
    );
}
