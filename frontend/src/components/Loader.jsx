import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Loader() {
    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <Spinner animation="grow" role="status" />
        </div>
    );
}
