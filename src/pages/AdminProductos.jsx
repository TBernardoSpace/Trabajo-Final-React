import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Table, Breadcrumb, Spinner, Alert, Container, Card, Button } from 'react-bootstrap';
import PageHead from '../components/PageHead';
import ProductForm from '../components/ProductForm';
import DeleteModal from '../components/DeleteModal';
import EditProductModal from '../components/EditProductModal';
import { FaEdit, FaTrash, FaGamepad } from 'react-icons/fa';

const AdminProductos = () => {
  const { products, loading, error, addProduct, updateProduct, deleteProduct, fetchProducts } = useProducts();
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [isDeduplicating, setIsDeduplicating] = useState(false);

  const handleAddProduct = async (productData) => {
    const dataToSubmit = { ...productData, price: parseFloat(productData.price) };
    const success = await addProduct(dataToSubmit);
    if (success) {
      toast.success('¡Producto agregado con éxito!');
    }
    return success;
  };

  const handleEditProduct = async (id, updatedData) => {
    const success = await updateProduct(id, updatedData);
    if (success) {
      toast.success('¡Producto actualizado con éxito!');
      setProductToEdit(null);
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    const success = await deleteProduct(productToDelete.id);
    if (success) {
      toast.success(`Producto eliminado: ${productToDelete.name}`);
      setProductToDelete(null);
    }
  };

  const handleDeDuplicate = async () => {
    setIsDeduplicating(true);
    toast.info("Iniciando limpieza de duplicados...", { autoClose: false });

    const productsByName = products.reduce((acc, product) => {
        acc[product.name] = acc[product.name] || [];
        acc[product.name].push(product);
        return acc;
    }, {});

    const productsToDelete = [];
    for (const name in productsByName) {
        const group = productsByName[name];
        if (group.length > 1) {
            productsToDelete.push(...group.slice(1));
        }
    }

    if (productsToDelete.length === 0) {
        toast.dismiss();
        toast.success("No se encontraron duplicados.");
        setIsDeduplicating(false);
        return;
    }

    toast.dismiss();
    toast.info(`Se eliminarán ${productsToDelete.length} productos duplicados.`);

    let successCount = 0;
    for (const product of productsToDelete) {
        const success = await deleteProduct(product.id);
        if (success) {
            successCount++;
        }
        await new Promise(res => setTimeout(res, 300));
    }
    
    toast.success(`Limpieza completada. Se eliminaron ${successCount} duplicados.`);
    fetchProducts();
    setIsDeduplicating(false);
  };

  return (
    <Container className="my-5">
      <PageHead title="Panel Administrativo - Gamer-Max" />
      
      <h1 className="text-center mb-4"><FaGamepad /> Panel de Administración</h1>

      <Card className="mb-5 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Agregar Nuevo Producto</h3>
          <span className="badge bg-primary">Nuevo</span>
        </div>
        <ProductForm onSubmitForm={handleAddProduct} />
      </Card>

      <hr className="my-5" style={{borderColor: 'var(--border-color)'}} />

      <Card className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Productos Existentes</h3>
          <div className="d-flex align-items-center gap-3">
            <Button 
              variant="danger" 
              size="sm"
              onClick={handleDeDuplicate}
              disabled={isDeduplicating}
            >
              {isDeduplicating ? 'Limpiando...' : 'Eliminar Duplicados'}
            </Button>
            <div className="text-muted">
              Total: {products.length} productos
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Cargando productos...</p>
          </div>
        )}

        {error && !loading && (
          <Alert variant="danger">
            <strong>Error:</strong> {error}
          </Alert>
        )}

        {!loading && !error && (
          <>
            {products.length === 0 ? (
              <div className="text-center py-5">
                <div className="empty-icon fs-1 text-muted"><FaGamepad /></div>
                <div className="empty-title h4 mt-3">No hay productos</div>
                <div className="empty-text text-muted">Crea tu primer producto usando el formulario de arriba.</div>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id}>
                        <td style={{fontFamily: 'monospace', fontSize: '0.85rem'}}>
                          {String(product.id).slice(0, 8)}{String(product.id).length > 8 ? '...' : ''}
                        </td>
                        <td>{product.name}</td>
                        <td style={{fontWeight: 700, color: 'var(--accent-primary)'}}>
                          ${parseFloat(product.price).toFixed(2)}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="primary"
                              size="sm"
                              onClick={() => setProductToEdit(product)}
                            >
                              <FaEdit /> Editar
                            </Button>
                            <Button 
                              variant="danger"
                              size="sm"
                              onClick={() => setProductToDelete(product)}
                            >
                              <FaTrash /> Eliminar
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </Card>

      {productToDelete && (
        <DeleteModal
          show={!!productToDelete}
          handleClose={() => setProductToDelete(null)}
          handleConfirm={handleDeleteProduct}
          productName={productToDelete?.name}
        />
      )}
      
      {productToEdit && (
        <EditProductModal
          show={!!productToEdit}
          handleClose={() => setProductToEdit(null)}
          onSave={handleEditProduct}
          product={productToEdit}
        />
      )}
    </Container>
  );
};

export default AdminProductos;