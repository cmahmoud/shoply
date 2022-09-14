import React, { useEffect } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import getById from 'app/actions/products/getById';
import updateProduct from 'app/actions/products/updateProduct';
import uploadImage from 'app/actions/products/uploadImage';

import Loader from 'components/Loader';

export default function ProductEdit() {
    const { id } = useParams();
    const user = useSelector((state) => state.auth.user);
    const { item, loading } = useSelector((state) => state.products);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(getById(id));
        } else {
            navigate('/');
        }
    }, [dispatch, id, navigate, user]);
    const handleProductUpdate = (e, itemId) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        dispatch(updateProduct({ ...data, id: itemId }));
    };
    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        dispatch(uploadImage(formData));
    };
    return loading ? (
        <Loader />
    ) : (
        <>
            <LinkContainer to="/admin/products">
                <Button variant="dark" className="mb-3">
                    Go Back
                </Button>
            </LinkContainer>
            {item && (
                <Form onSubmit={(e) => handleProductUpdate(e, item._id)}>
                    <Form.Group className="mb-3" controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            name="name"
                            autoComplete="off"
                            defaultValue={item.name}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Brand"
                            autoComplete="off"
                            name="brand"
                            defaultValue={item.brand}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Category"
                            autoComplete="off"
                            name="category"
                            defaultValue={item.category}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            defaultValue={item.description}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Price"
                            autoComplete="off"
                            name="price"
                            defaultValue={item.price}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CountInStock">
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Count In Stock"
                            autoComplete="off"
                            name="countInStock"
                            defaultValue={item.countInStock}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Image"
                            autoComplete="off"
                            name="image"
                            defaultValue={item.image}
                        />
                    </Form.Group>
                    <Form.Group controlId="file" className="mb-3">
                        <Form.Label>Upload New Image</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={handleUploadImage}
                        />
                    </Form.Group>
                    <Stack className="col-md-3 mx-auto mb-3">
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Stack>
                </Form>
            )}
        </>
    );
}
