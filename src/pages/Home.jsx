import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Row, Col, Form, Pagination, Carousel, Spinner, Alert, Container, Card, Button } from 'react-bootstrap';
import PageHead from '../components/PageHead';
import { FaGamepad } from 'react-icons/fa';

const ToastWithImage = ({ product }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <img 
      src={product.image} 
      alt={product.name} 
      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} 
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://via.placeholder.com/50x50?text=IMG';
      }}
    />
    <div>
      <strong>¡Agregado al carrito!</strong>
      <div style={{ fontSize: '0.9em', opacity: 0.8 }}>{product.name}</div>
    </div>
  </div>
);

const Home = () => {
  const { products, loading, error } = useProducts();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 8;

  const handleAddItem = (product) => {
    addItem(product);
    toast.success(<ToastWithImage product={product} />, {
      onClick: () => navigate('/carrito'),
      closeOnClick: true,
      autoClose: 3000,
    });
  };

  if (loading) {
    return (
      <Container className="my-5">
        <PageHead title="Cargando - Gamer-Max" />
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Cargando juegos...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <PageHead title="Error - Gamer-Max" />
        <Alert variant="danger" className="mt-4">
          <strong>Error:</strong> {error}
        </Alert>
      </Container>
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
    <Container className="my-5">
      <PageHead 
        title="Inicio - Gamer-Max" 
        description="La mejor tienda de videojuegos con estilo gamer futurista."
      />

      {!searchTerm && (
        <Carousel className="mb-5" style={{ maxHeight: '400px', overflow: 'hidden' }}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/img-carrusel-1.jpg"
              alt="Nuevo Lanzamiento"
              style={{ height: '400px', objectFit: 'cover' }}
              onError={(e) => e.target.src = 'https://via.placeholder.com/1200x400?text=LANZAMIENTO'}
            />
            <Carousel.Caption>
              <h3>¡Nuevo Lanzamiento!</h3>
              <p>Descubre el juego del año.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/img-carrusel-2.jpg"
              alt="Ofertas"
              style={{ height: '400px', objectFit: 'cover' }}
              onError={(e) => e.target.src = 'https://via.placeholder.com/1200x400?text=OFERTAS'}
            />
            <Carousel.Caption>
              <h3>Ofertas Imperdibles</h3>
              <p>Hasta 50% de descuento en títulos seleccionados.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/img-carrusel-3.jpg"
              alt="Exclusivos"
              style={{ height: '400px', objectFit: 'cover' }}
              onError={(e) => e.target.src = 'https://via.placeholder.com/1200x400?text=EXCLUSIVOS'}
            />
            <Carousel.Caption>
              <h3>Solo en Gamer-Max</h3>
              <p>Contenido exclusivo y pre-ventas.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      )}

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h1 className="mb-3 mb-md-0">Catálogo de Juegos</h1>
        
        <Form style={{ minWidth: '250px' }}>
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

      <Row xs={1} md={2} lg={4} className="g-4">
        {currentProducts.length === 0 ? (
          <Col xs={12}>
            <div className="text-center py-5">
              <div className="empty-icon fs-1 text-muted"><FaGamepad /></div>
              <div className="empty-title h4 mt-3">
                {searchTerm ? 'Sin resultados' : 'No hay productos'}
              </div>
              <div className="empty-text text-muted">
                {searchTerm ? `No encontramos juegos que coincidan con "${searchTerm}"` : 'El catálogo está vacío.'}
              </div>
              {searchTerm && (
                <Button variant="primary" onClick={() => setSearchTerm('')} className="mt-3">
                  Limpiar búsqueda
                </Button>
              )}
            </div>
          </Col>
        ) : (
          currentProducts.map(product => (
            <Col key={product.id}>
              <Card className="h-100 product-card">
                <Card.Img 
                  variant="top" 
                  src={product.image || 'https://via.placeholder.com/300x200?text=SIN+IMAGEN'}
                  alt={product.name}
                  style={{height: '180px', objectFit: 'cover'}}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=SIN+IMAGEN';
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="flex-grow-1">
                    {product.description?.substring(0, 80)}{product.description?.length > 80 ? '...' : ''}
                  </Card.Text>
                  <strong className="price fs-5 mb-3">${parseFloat(product.price).toFixed(2)}</strong>
                  <Button variant="primary" onClick={() => handleAddItem(product)} className="mt-auto">
                    Agregar al Carrito
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {pageCount > 1 && (
        <div className="d-flex justify-content-center mt-5">
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
    </Container>
  );
};

export default Home;