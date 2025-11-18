import React from 'react';
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar, Form } from 'react-bootstrap'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { RutaProtegida } from './routes/RutaProtegida';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext'; 

import Home from './pages/Home';
import Login from './pages/Login';
import Carrito from './pages/Carrito';
import AdminProductos from './pages/AdminProductos';

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

function App() {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <div className="app-root">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === 'dark' ? 'dark' : 'light'}
        toastClassName="neon-toast"
        bodyClassName="neon-toast-body"
      />

      <Navbar expand="lg" className="navbar-futuristic">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-container">
            <img src="/logo.png" className="logo-neon" alt="Logo" />
            <span className="brand-text">Gamer-Max</span>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={NavLink} to="/" end className="nav-item">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/carrito" className="nav-item">Carrito</Nav.Link>
              
              {isAuthenticated ? (
                <>
                  <Nav.Link as={NavLink} to="/admin" className="nav-item">Admin</Nav.Link> 
                  <Nav.Link onClick={logout} className="nav-item">Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link as={NavLink} to="/login" className="nav-item">Login</Nav.Link>
              )}
            </Nav>
            
            <Form.Check 
              type="switch"
              id="theme-switch"
              label={theme === 'dark' ? '🌙' : '☀️'}
              checked={theme === 'dark'}
              onChange={toggleTheme}
              className="theme-switcher"
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="main-container">
        <Container className="content-container fade-in">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route element={<RutaProtegida />}>
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/admin" element={<AdminProductos />} /> 
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;