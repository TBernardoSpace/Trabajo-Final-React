import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => (
  <div className="error-container fade-in">
    <div className="glitch-wrapper">
      <h1 className="glitch-text" data-text="404">404</h1>
    </div>
    <p className="text-center mb-4" style={{fontSize: '1.2rem', color: 'var(--text-secondary)'}}>
      Página no encontrada en el sistema
    </p>
    <div className="text-center">
      <Link to="/" className="btn btn-primary btn-scan">
        Volver al Inicio
      </Link>
    </div>
  </div>
);

export default Error404;