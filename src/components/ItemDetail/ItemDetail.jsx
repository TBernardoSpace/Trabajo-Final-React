import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ItemDetail.css';

const ItemDetail = ({ product }) => {
    const { addItem } = useCart();
    const navigate = useNavigate();

    const handleAddItem = () => {
        addItem(product);
        toast.success(
            <div className="d-flex align-items-center gap-2">
                <img 
                    src={product.image || 'https://placehold.co/50x50?text=IMG'} 
                    alt={product.name} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <span>¡{product.name} agregado al carrito!</span>
            </div>, 
            {
                onClick: () => navigate('/carrito'),
                closeOnClick: true,
                autoClose: 3000,
            }
        );
    };

    return (
        <Card className="product-detail-card p-4">
            <Row>
                <Col md={6}>
            <Card.Img 
                variant="top" 
                src={product.image || 'https://placehold.co/600x400?text=SIN+IMAGEN'} 
                alt={product.name}
                className="detail-image"
                onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://placehold.co/600x400?text=SIN+IMAGEN';
                }}
            />
                </Col>
                <Col md={6} className="d-flex flex-column justify-content-center">
                    <h2 className="mb-3">{product.name}</h2>
                    <p className="lead mb-4">{product.description}</p>
                    <div className="detail-price mb-4">${parseFloat(product.price).toFixed(2)}</div>
                    
                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" onClick={handleAddItem}>
                            Agregar al Carrito
                        </Button>
                        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                            Volver
                        </Button>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default ItemDetail;
