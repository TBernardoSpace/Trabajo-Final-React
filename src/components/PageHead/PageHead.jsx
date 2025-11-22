import React from 'react';
import { Helmet } from 'react-helmet-async';
import './PageHead.css';

const PageHead = ({ title, description }) => {
  return (
    <Helmet>
        <title>{title ? `${title} - MiTienda` : 'MiTienda'}</title>
        
        <meta 
            name="description" 
            content={description || 'Bienvenidos a la tienda virtual de prueba.'} 
        />
        
    </Helmet>
  );
};

export default PageHead;