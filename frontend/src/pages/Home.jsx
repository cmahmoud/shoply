import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import getAllProducts from 'app/actions/products/getAll';

import Loader from 'components/Loader';
import Meta from 'components/Meta';
import Paginator from 'components/Paginator';
import ProductCard from 'components/ProductCard';

export default function Home() {
    const dispatch = useDispatch();
    const {
        list,
        loading,
        pages,
        page: pageIndex,
    } = useSelector((state) => state.products);
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    const page = searchParams.get('page');
    useEffect(() => {
        if (keyword && page) {
            dispatch(getAllProducts({ keyword, page }));
        } else if (keyword && !page) {
            dispatch(getAllProducts({ keyword, page: '' }));
        } else if (!keyword && page) {
            dispatch(getAllProducts({ page, keyword: '' }));
        } else {
            dispatch(getAllProducts({ keyword: '', page: '' }));
        }
    }, [dispatch, keyword, page]);
    return loading ? (
        <Loader />
    ) : (
        <>
            <Meta
                title="Welcome To Shoply"
                description="Shop that contain all products you dream"
                keywords="shop,products,product,store,ecommrce"
            />
            <h1>{keyword ? 'Search Results' : 'Latest Products'}</h1>
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
                <Paginator page={pageIndex} pages={pages} keyword={keyword} />
            </Container>
        </>
    );
}
