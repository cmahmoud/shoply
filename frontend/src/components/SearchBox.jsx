import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState();
    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search?keyword=${keyword}`);
        } else {
            navigate('/');
        }
    };
    return (
        <Form onSubmit={handleSearch} className="d-flex">
            <Form.Control
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search product..."
            ></Form.Control>
            <Button type="submit" variant="outline-success" className="p-2">
                Search
            </Button>
        </Form>
    );
}
