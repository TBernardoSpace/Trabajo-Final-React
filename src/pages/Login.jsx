import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PageHead from '../components/PageHead';
import { Alert, Container, Form, Button } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('usuario@ejemplo.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    login({ email });
    navigate('/carrito');
  };

  return (
    <>
      <PageHead title="Iniciar Sesión - Gamer-Max" />
      
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="p-4 border rounded shadow-lg" style={{ maxWidth: '400px', width: '100%', backgroundColor: 'var(--bg-card)' }}>
          <h2 className="text-center mb-4"><FaUser /> ACCESO GAMER</h2>
          
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError('')}>
              {error}
            </Alert>
          )}
          
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>
                <FaUser className="me-2" /> Email
              </Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>
                <FaLock className="me-2" /> Contraseña
              </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </Form.Group>
            
            <div className="d-grid">
              <Button variant="primary" type="submit">
                INGRESAR
              </Button>
            </div>
            
            <div className="text-center mt-3">
              <small className="text-muted">
                Demo: usuario@ejemplo.com / 123456
              </small>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Login;