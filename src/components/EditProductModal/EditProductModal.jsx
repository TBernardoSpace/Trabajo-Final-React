import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Spinner, Image } from 'react-bootstrap';
import { uploadToImgbb } from '../../services/uploadImage';
import { toast } from 'react-toastify';
import './EditProductModal.css';

const EditProductModal = ({ show, handleClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    image: ''
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || 0,
        description: product.description || '',
        image: product.image || ''
      });
      setFile(null);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let imageUrl = formData.image;

    if (file) {
      setUploading(true);
      try {
        imageUrl = await uploadToImgbb(file);
      } catch (error) {
        console.error("Error subiendo imagen:", error);
        toast.error(`Error al subir imagen: ${error.message}`);
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    const dataToSave = {
      ...formData,
      image: imageUrl,
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
            <Form.Label>Imagen (Seleccionar nueva para reemplazar)</Form.Label>
            
            <div className="mb-2">
                {formData.image && (
                    <Image 
                        src={formData.image} 
                        thumbnail 
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                        alt="Actual"
                    />
                )}
            </div>

            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
            
            {uploading && (
                 <div className="mt-2 text-info">
                     <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Subiendo a ImgBB...
                 </div>
            )}
          </Form.Group>

          <div className="d-flex gap-2 justify-content-end">
            <Button variant="secondary" onClick={handleClose} disabled={uploading}>Cancelar</Button>
            <Button variant="primary" type="submit" disabled={uploading}>
                 {uploading ? 'Procesando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;
