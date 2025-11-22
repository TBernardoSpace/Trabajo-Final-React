import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Row, Col, Breadcrumb, Container, Card, Button } from 'react-bootstrap';
import PageHead from '../components/PageHead/PageHead';
import { FaTrash, FaArrowLeft, FaCreditCard } from 'react-icons/fa';

import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Carrito = () => {
  const { cartItems, removeItem, clearCart, cartCount, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleFinalizarCompra = () => {
    if (!isAuthenticated) {
        toast.info("Debes iniciar sesión para finalizar tu compra.", {
            onClick: () => navigate('/login'),
        });
        navigate('/login');
        return;
    }
    
    toast.success('¡Gracias por tu compra! Tu pedido ha sido procesado.');
    clearCart();
    navigate('/');
  };

  return (
    <Container className="my-5">
      <PageHead title="Mi Carrito - Gamer-Max" />
      
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active>Carrito</Breadcrumb.Item>
      </Breadcrumb>

      <h1 className="text-center mb-4">🛒 Mi Carrito</h1>

      {cartItems.length === 0 ? (
        <Card className="p-4 text-center">
          <div className="empty-icon fs-1 text-muted"><FaCreditCard /></div>
          <div className="empty-title h4 mt-3">Tu carrito está vacío</div>
          <div className="empty-text text-muted">No tienes productos en tu carrito de compras.</div>
          <Button variant="primary" onClick={() => navigate('/')} className="mt-3">
            <FaArrowLeft /> Volver al Catálogo
          </Button>
        </Card>
      ) : (
        <Row>
          <Col lg={8}>
            <Card className="p-4">
              <Table responsive hover className="align-middle">
                <thead>
                  <tr>
                    <th style={{borderTop: 'none'}}>Producto</th>
                    <th style={{borderTop: 'none'}}>Precio</th>
                    <th style={{borderTop: 'none'}}>Cantidad</th>
                    <th style={{borderTop: 'none'}}>Subtotal</th>
                    <th style={{borderTop: 'none'}}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>${parseFloat(item.price).toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td style={{fontWeight: '700', color: 'var(--accent-primary)'}}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => removeItem(item.id)}>
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              
              <div className="d-flex justify-content-between align-items-center mt-3">
                <Button variant="danger" onClick={clearCart}>
                  Vaciar Carrito
                </Button>
                <Button variant="secondary" onClick={() => navigate('/')}>
                  <FaArrowLeft /> Seguir Comprando
                </Button>
              </div>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="p-4 mt-4 mt-lg-0">
              <h4>Resumen de Compra</h4>
              <hr style={{borderColor: 'var(--border-color)'}} />
              
              <div className="d-flex justify-content-between mb-2">
                <span>Productos:</span>
                <span>{cartCount}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-3">
                <span>Envío:</span>
                <span className="text-success">¡GRATIS!</span>
              </div>
              
              <hr style={{borderColor: 'var(--border-color)'}} />
              
              <h3 className="d-flex justify-content-between">
                <span>Total:</span>
                <span style={{color: 'var(--accent-primary)'}}>${cartTotal.toFixed(2)}</span>
              </h3>
              
              <div className="d-grid gap-2 mt-4">
                <Button variant="success" size="lg" onClick={handleFinalizarCompra}>
                  <FaCreditCard /> Finalizar Compra
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Carrito;