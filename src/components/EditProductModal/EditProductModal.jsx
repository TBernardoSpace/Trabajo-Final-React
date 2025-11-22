import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Image } from 'react-bootstrap';
import './EditProductModal.css';

const EditProductModal = ({ show, handleClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    image: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || 0,
        description: product.description || '',
        image: product.image || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dataToSave = {
      ...formData,
      price: parseFloat(formData.price)
    };
    onSave(product.id, dataToSave);
  };

  if (!product) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered contentClassName="modal-futuristic">
      <Modal.Header closeButton>
        <Modal.Title>Editar: {product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Producto *</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio *</Form.Label>
            <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required min="0.01" step="0.01" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción *</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control 
                type="url" 
                name="image" 
                value={formData.image} 
                onChange={handleChange} 
                placeholder="https://ejemplo.com/imagen.jpg"
                required
            />
            
            {formData.image && (
                <div className="mt-3 text-center p-2 border rounded bg-light">
                    <p className="text-muted small mb-2">Vista Previa:</p>
                    <Image 
                        src={formData.image} 
                        alt="Vista previa" 
                        thumbnail 
                        style={{ maxHeight: '150px', objectFit: 'contain' }}
                        onError={(e) => e.target.style.display = 'none'}
                    />
                </div>
            )}
          </Form.Group>

          <div className="d-flex gap-2 justify-content-end">
            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
            <Button variant="primary" type="submit">
                 Guardar Cambios
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;