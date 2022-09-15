import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Paginator({
    page,
    pages,
    isAdmin = false,
    keyword = '',
}) {
    return (
        pages > 1 && (
            <div className="d-flex justify-content-center">
                <Pagination>
                    {[...Array(pages).keys()].map((x) => (
                        <LinkContainer
                            key={x + 1}
                            to={
                                isAdmin
                                    ? `/admin/products?page=${x + 1}`
                                    : keyword
                                    ? `/search?keyword=${keyword}&page=${x + 1}`
                                    : `?page=${x + 1}`
                            }
                        >
                            <Pagination.Item active={x + 1 === page}>
                                {x + 1}
                            </Pagination.Item>
                        </LinkContainer>
                    ))}
                </Pagination>
            </div>
        )
    );
}
