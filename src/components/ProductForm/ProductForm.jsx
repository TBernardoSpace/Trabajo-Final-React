import React, { useState } from 'react';
import { Form, Button, Spinner, Image } from 'react-bootstrap';
import { uploadToImgbb } from '../../services/uploadImage';
import { toast } from 'react-toastify';
import './ProductForm.css';

const ProductForm = ({ onSubmitForm }) => {
    
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        description: '',
        image: '', 
    });
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setErrors(prev => ({ ...prev, image: null })); // Clear image error
        }
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
        // Require file only if no existing image (for edit scenarios, though this is add form)
        // For Add form, file is required.
        if (!file) {
            newErrors.image = 'Debes seleccionar una imagen.';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return; 
        }

        let imageUrl = '';
        setUploading(true);

        try {
            if (file) {
                imageUrl = await uploadToImgbb(file);
            }
        } catch (error) {
            console.error("Error subiendo imagen:", error);
            toast.error(`Error al subir imagen: ${error.message}`);
            setUploading(false);
            return; // Stop submission if upload fails
        }

        const success = await onSubmitForm({ ...formData, image: imageUrl });
        setUploading(false);
        
        if (success) {
            setFormData({ name: '', price: 0, description: '', image: '' });
            setFile(null);
            setErrors({});
            const fileInput = document.getElementById('formImage');
            if (fileInput) fileInput.value = '';
        }
    };

    return (
        <Form onSubmit={handleSubmit} noValidate>
            
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    placeholder="Ej: Cyberpunk 2077"
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
                    placeholder="Breve descripción del juego..."
                    value={formData.description}
                    onChange={handleChange}
                    isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.description}
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-4" controlId="formImage">
                <Form.Label>Imagen del Producto</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    isInvalid={!!errors.image}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.image}
                </Form.Control.Feedback>
                
                {uploading && (
                    <div className="mt-2 text-info">
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Subiendo a ImgBB...
                    </div>
                )}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={uploading}>
                {uploading ? 'Procesando...' : 'Guardar Producto'}
            </Button>
        </Form>
    );
};

export default ProductForm;
