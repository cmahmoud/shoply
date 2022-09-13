import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import getAllProducts from "app/actions/products/getAll";
import Loader from "components/Loader";

export default function Home() {
    const dispatch = useDispatch();
    const { list, loading } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getAllProducts());
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
