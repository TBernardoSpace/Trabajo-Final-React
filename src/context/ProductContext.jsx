import React, { createContext, useState, useContext, useEffect } from 'react';
import { productsAPI } from '../services/api';

export const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProducts debe usarse dentro de un ProductProvider");
    }
    return context;
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await productsAPI.getAll();
            setProducts(response.data);
        } catch (err) {
            console.error("Error al cargar productos:", err);
            setError("Error al cargar productos. Intente más tarde.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (newProduct) => {
        try {
            const response = await productsAPI.create(newProduct);
            setProducts(prevProducts => [...prevProducts, response.data]);
            return true;
        } catch (err) {
            console.error("Error al crear producto:", err);
            setError("Error al crear el producto.");
            return false;
        }
    };

    const updateProduct = async (id, updatedData) => {
        try {
            const response = await productsAPI.update(id, updatedData);
            setProducts(prevProducts => 
                prevProducts.map(product => 
                    product.id === id ? response.data : product
                )
            );
            return true;
        } catch (err) {
            console.error("Error al actualizar producto:", err);
            setError("Error al actualizar el producto.");
            return false;
        }
    };

    const deleteProduct = async (id) => {
        try {
            await productsAPI.delete(id);
            setProducts(prevProducts => 
                prevProducts.filter(product => product.id !== id)
            );
            return true;
        } catch (err) {
            console.error("Error al eliminar producto:", err);
            setError("Error al eliminar el producto.");
            return false;
        }
    };

    const value = {
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};