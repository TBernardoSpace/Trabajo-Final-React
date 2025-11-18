import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const ProductForm = ({ onSubmitForm }) => {
    
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        description: '',
        image: '', 
    });
    
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es obligatorio.';
        }
        if (parseFloat(formData.price) <= 0) {
            newErrors.price = 'El precio debe ser mayor a 0.';
        }
        if (formData.description.length < 10) {
            newErrors.description = 'La descripción debe tener al menos 10 caracteres.';
        }
        
        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return; 
        }

        const success = await onSubmitForm(formData);
        
        if (success) {
            setFormData({ name: '', price: 0, description: '', image: '' });
            setErrors({});
        }
    };

    return (
        <Form onSubmit={handleSubmit} noValidate>
            
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name} 
                />
                
                <Form.Control.Feedback type="invalid">
                    {errors.name}
                </Form.Control.Feedback>
            </Form.Group>

            
            <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.price}
                </Form.Control.Feedback>
            </Form.Group>

            
            <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.description}
                </Form.Control.Feedback>
            </Form.Group>
            
            
            <Form.Group className="mb-3" controlId="formImage">
                <Form.Label>URL de Imagen</Form.Label>
                <Form.Control
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Guardar Producto
            </Button>
        </Form>
    );
};

export default ProductForm;