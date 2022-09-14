import React, { useEffect } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

import createProduct from 'app/actions/products/createProduct';
import deleteProduct from 'app/actions/products/deleteProduct';
import getAllProducts from 'app/actions/products/getAll';

export default function ProductList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const products = useSelector((state) => state.products.list);
    const item = useSelector((state) => state.products.item);

    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(getAllProducts());
        } else {
            navigate('/');
        }
    }, [dispatch, user, navigate]);

    const handleDeleteProduct = (id) => {
        dispatch(deleteProduct(id));
    };
    const handleCreateProduct = () => {
        dispatch(createProduct());
        if (item) {
            navigate(`/admin/product/${item._id}/edit`);
        }
    };
    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-end">
                    <Button
                        className="my-3"
                        variant="dark"
                        onClick={handleCreateProduct}
                    >
                        <i className="fas fa-plus" /> Create Product
                    </Button>
                </Col>
            </Row>
            <Table striped bordered hover responsive="sm" className="table=sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Count</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>{product.countInStock}</td>
                            <td>
                                <LinkContainer
                                    to={`/admin/product/${product._id}/edit`}
                                >
                                    <Button variant="light" className="btn-sm">
                                        <i className="fas fa-edit" />
                                    </Button>
                                </LinkContainer>
                                <Button
                                    variant="danger"
                                    className="btn-sm"
                                    onClick={() =>
                                        handleDeleteProduct(product._id)
                                    }
                                >
                                    <i className="fas fa-trash" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
