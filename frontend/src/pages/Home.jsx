import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import getAllProducts from 'app/actions/products/getAll';

import Loader from 'components/Loader';
import Meta from 'components/Meta';
import ProductCard from 'components/ProductCard';

export default function Home() {
    const dispatch = useDispatch();
    const { list, loading } = useSelector((state) => state.products);
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    useEffect(() => {
        if (keyword) {
            dispatch(getAllProducts(keyword));
        } else {
            dispatch(getAllProducts());
        }
    }, [dispatch, keyword]);

    return loading ? (
        <Loader />
    ) : (
        <>
            <Meta
                title="Welcome To Shoply"
                description="Shop that contain all products you dream"
                keywords="shop,products,product,store,ecommrce"
            />
            <h1>Latest Products</h1>
            <Container>
                <Row>
                    {list?.map((product) => {
                        return (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <ProductCard product={product} />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
}
