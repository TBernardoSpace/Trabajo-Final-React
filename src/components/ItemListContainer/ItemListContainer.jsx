import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Form, Pagination, Spinner, Alert, Container } from 'react-bootstrap';
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css';

const ItemListContainer = () => {
    const { products, loading, error } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const PRODUCTS_PER_PAGE = 8;

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Cargando juegos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="mt-4">
                <strong>Error:</strong> {error}
            </Alert>
        );
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pageCount = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
                <h1 className="mb-3 mb-md-0">Catálogo de Juegos</h1>
                
                <Form className="search-container">
                    <Form.Control
                        type="text"
                        placeholder="Buscar juego..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </Form>
            </div>

            <ItemList products={currentProducts} />

            {pageCount > 1 && (
                <div className="d-flex justify-content-center pagination-container">
                    <Pagination>
                        {[...Array(pageCount).keys()].map(number => (
                            <Pagination.Item 
                                key={number + 1} 
                                active={number + 1 === currentPage} 
                                onClick={() => handlePageClick(number + 1)}
                            >
                                {number + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            )}
        </>
    );
};

export default ItemListContainer;