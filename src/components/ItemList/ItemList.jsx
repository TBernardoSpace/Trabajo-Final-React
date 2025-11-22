import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FaGamepad } from 'react-icons/fa';
import Item from '../Item/Item';
import './ItemList.css';

const ItemList = ({ products }) => {
    if (products.length === 0) {
        return (
            <Col xs={12}>
                <div className="text-center py-5">
                    <div className="empty-icon fs-1 text-muted"><FaGamepad /></div>
                    <div className="empty-title h4 mt-3">
                        No hay productos
                    </div>
                    <div className="empty-text text-muted">
                        No encontramos juegos que coincidan con tu búsqueda.
                    </div>
                </div>
            </Col>
        );
    }

    return (
        <Row xs={1} md={2} lg={4} className="g-4 item-list-row">
            {products.map(product => (
                <Item key={product.id} product={product} />
            ))}
        </Row>
    );
};

export default ItemList;