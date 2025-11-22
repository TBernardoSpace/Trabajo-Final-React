import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import './Item.css';

const Item = ({ product }) => {
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
        <Col>
            <Card className="h-100 product-card">
                <Card.Img 
                    variant="top" 
                    src={product.image || 'https://placehold.co/300x200?text=SIN+IMAGEN'}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/300x200?text=SIN+IMAGEN';
                    }}
                />
                <Card.Body className="d-flex flex-column">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="flex-grow-1">
                        {product.description?.substring(0, 80)}{product.description?.length > 80 ? '...' : ''}
                    </Card.Text>
                    <strong className="product-price mb-3">${parseFloat(product.price).toFixed(2)}</strong>
                    <div className="d-flex gap-2 mt-auto">
                        <Button 
                            as={Link} 
                            to={`/item/${product.id}`} 
                            className="flex-grow-1 btn-detail"
                        >
                            Ver Detalle
                        </Button>
                        <Button 
                            variant="primary" 
                            className="flex-grow-1"
                            onClick={handleAddItem}
                        >
                            Comprar
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Item;