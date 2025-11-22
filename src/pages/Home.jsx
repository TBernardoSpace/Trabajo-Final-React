import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import PageHead from '../components/PageHead/PageHead';
import ItemListContainer from '../components/ItemListContainer/ItemListContainer';
import img1 from '../assets/img-carrusel-1.jpg';
import img2 from '../assets/img-carrusel-2.jpg';
import img3 from '../assets/img-carrusel-3.jpg';

const Home = () => {
  return (
    <Container className="my-5">
      <PageHead 
        title="Inicio - Gamer-Max" 
        description="La mejor tienda de videojuegos con estilo gamer futurista."
      />

      <Carousel className="mb-5" style={{ maxHeight: '400px', overflow: 'hidden' }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img1}
            alt="Nuevo Lanzamiento"
            style={{ height: '400px', objectFit: 'cover' }}
            onError={(e) => e.target.src = 'https://placehold.co/1200x400?text=LANZAMIENTO'}
          />
          <Carousel.Caption>
            <h3>¡Nuevo Lanzamiento!</h3>
            <p>Descubre la consola del año.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2}
            alt="Ofertas"
            style={{ height: '400px', objectFit: 'cover' }}
            onError={(e) => e.target.src = 'https://placehold.co/1200x400?text=OFERTAS'}
          />
          <Carousel.Caption>
            <h3>Ofertas Imperdibles</h3>
            <p>Hasta 50% de descuento en títulos seleccionados.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img3}
            alt="Exclusivos"
            style={{ height: '400px', objectFit: 'cover' }}
            onError={(e) => e.target.src = 'https://placehold.co/1200x400?text=EXCLUSIVOS'}
          />
          <Carousel.Caption>
            <h3>Solo en Gamer-Max</h3>
            <p>Contenido exclusivo y pre-ventas.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <ItemListContainer />
    </Container>
  );
};

export default Home;