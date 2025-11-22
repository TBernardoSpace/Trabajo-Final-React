import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar as BootstrapNavbar, Form, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext'; 
import mysteryBox from '../../assets/mystery_box.gif';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const { products } = useProducts(); 
  const navigate = useNavigate();

  const handleRandomGame = () => {
    if (products.length > 0) {
      const randomIndex = Math.floor(Math.random() * products.length);
      const randomProduct = products[randomIndex];
      navigate(`/item/${randomProduct.id}`);
    }
  };

  return (
    <BootstrapNavbar expand="lg" className="navbar-futuristic">
      <Container>
        <div className="d-flex align-items-center">
          <BootstrapNavbar.Brand as={Link} to="/" className="brand-container me-2">
            <img src={`${import.meta.env.BASE_URL}logo.png`} className="logo-neon" alt="Logo" />
            <span className="brand-text">Gamer-Max</span>
          </BootstrapNavbar.Brand>

          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip className="custom-tooltip">Haga click para elegir un juego al azar</Tooltip>}
          >
            <img 
              src={mysteryBox} 
              alt="Mystery Box" 
              onClick={handleRandomGame}
              className="mystery-box-icon"
            />
          </OverlayTrigger>
        </div>
        
        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" end className="nav-item">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/carrito" className="nav-item position-relative">
              Carrito
              {cartCount > 0 && (
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle badge-custom">
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>
            
            {isAuthenticated ? (
              <>
                <Nav.Link as={NavLink} to="/admin/alta-productos" className="nav-item">Admin</Nav.Link> 
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
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
