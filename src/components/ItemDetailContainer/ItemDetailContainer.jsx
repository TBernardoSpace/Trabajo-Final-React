import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { Spinner, Alert, Container } from 'react-bootstrap';
import ItemDetail from '../ItemDetail/ItemDetail';
import PageHead from '../PageHead/PageHead';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
    const { id } = useParams();
    const { getProductById } = useProducts();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            const data = await getProductById(id);
            if (data) {
                setProduct(data);
            } else {
                setError("Producto no encontrado.");
            }
            setLoading(false);
        };

        if (id) {
            fetchProduct();
        }
    }, [id, getProductById]);

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Cargando detalles...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <Container className="my-5">
                <Alert variant="danger">
                    <strong>Error:</strong> {error || "Producto no encontrado"}
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="detail-container-wrapper">
            <PageHead title={`${product.name} - Gamer-Max`} description={product.description} />
            <ItemDetail product={product} />
        </Container>
    );
};

export default ItemDetailContainer;