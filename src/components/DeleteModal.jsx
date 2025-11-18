import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ show, handleClose, handleConfirm, productName }) => {
  return (
    <Modal show={show} onHide={handleClose} centered contentClassName="modal-futuristic">
      <Modal.Header closeButton>
        <Modal.Title>⚠️ Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro de eliminar el producto?</p>
        <div className="text-center my-3">
          <strong style={{color: 'var(--accent-danger)', fontSize: '1.2rem'}}>
            {productName}
          </strong>
        </div>
        <p className="text-muted small">Esta acción no se puede deshacer.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="danger" onClick={handleConfirm}>Eliminar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;