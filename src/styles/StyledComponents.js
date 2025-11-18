// src/styles/StyledComponents.js

import styled from 'styled-components';

// Títulos de página con efecto de gradiente animado
export const TituloPagina = styled.h2`
  font-size: clamp(2rem, 5vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 2rem;
  padding-bottom: 0.75rem;
  color: var(--accent-primary);
  position: relative;
  font-family: var(--font-accent);
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 3px;
    background: var(--rgb-gradient);
    background-size: 400% 100%;
    animation: seamless-pan 10s linear infinite;
  }
  
  text-shadow: 0 0 10px var(--shadow-color);
`;

// Tarjetas de producto con efecto 3D al hover
export const TarjetaProductoEstilizada = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 0;
  overflow: hidden;
  transition: all var(--transition-medium);
  height: 100%;
  position: relative;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px) rotateX(2deg);
    border-color: var(--accent-primary);
    box-shadow: 0 15px 30px var(--shadow-color);
    
    .card-img {
      transform: scale(1.05);
    }
    
    .card-title {
      color: var(--accent-primary);
      text-shadow: 0 0 10px var(--shadow-color);
    }
  }
  
  .card-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform var(--transition-medium);
  }
  
  .card-body {
    padding: 1.5rem;
  }
  
  .card-title {
    font-family: var(--font-accent);
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    transition: color var(--transition-fast);
  }
  
  .card-text {
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }
  
  .price {
    color: var(--accent-primary);
    font-size: 1.3rem;
    font-weight: 900;
    display: block;
    margin: 0.75rem 0;
    font-family: var(--font-accent);
  }
  
  .btn-container {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }
`;

// Botón universal RGB con múltiples variantes
export const RGBButton = styled.button`
  padding: 10px 24px;
  font-family: var(--font-accent);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-primary);
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: 0;
  position: relative;
  overflow: hidden;
  transition: all var(--transition-medium);
  cursor: pointer;
  
  &:hover {
    color: var(--accent-primary);
    border-color: var(--accent-primary);
    box-shadow: var(--shadow-neon) var(--shadow-color);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  ${props => props.$primary && `
    background: var(--accent-primary);
    border-color: var(--accent-primary);
    color: var(--bg-primary);
    
    &:hover {
      background: var(--accent-hover);
      border-color: var(--accent-hover);
      color: ${props => (props.theme.accent === '#00f3ff' ? '#e0e0ff' : '#0a0a0f')}; /* Lógica de color corregida */
      box-shadow: var(--shadow-glow) var(--shadow-color);
    }
  `}
  
  ${props => props.danger && `
    border-color: var(--accent-danger);
    color: var(--accent-danger);
    
    &:hover {
      background: var(--accent-danger);
      color: white;
      border-color: var(--accent-danger);
    }
  `}
  
  ${props => props.success && `
    border-color: var(--accent-success);
    color: var(--accent-success);
    
    &:hover {
      background: var(--accent-success);
      color: white;
      border-color: var(--accent-success);
    }
  `}
  
  ${props => props.sm && `
    padding: 6px 12px;
    font-size: 0.75rem;
  `}
  
  ${props => props.lg && `
    padding: 12px 32px;
    font-size: 0.95rem;
  `}
`;

// Badge RGB animado
export const RGBBadge = styled.span`
  display: inline-block;
  padding: 0.3em 0.8em;
  font-size: 0.75rem;
  font-weight: 700;
  font-family: var(--font-accent);
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 0;
  background: var(--rgb-gradient);
  background-size: 400% 100%;
  color: var(--bg-primary);
  animation: seamless-pan 10s linear infinite;
  box-shadow: 0 2px 8px var(--shadow-color);
`;

// Contenedor para formularios
export const FormWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 2.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  .form-title {
    font-family: var(--font-accent);
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--accent-primary);
    text-shadow: 0 0 10px var(--shadow-color);
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-label {
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
  }
  
  .form-control {
    background: var(--bg-input);
    border-color: var(--border-color);
    color: var(--text-primary);
    padding: 12px;
    border-radius: 0;
    transition: all var(--transition-fast);
    
    &:focus {
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 0.2rem var(--shadow-color);
    }
  }
`;

// Contenedor principal de páginas
export const PageContainer = styled.div`
  padding: 2rem 0;
  animation: fade-in 0.5s ease;
  
  .page-header {
    margin-bottom: 2rem;
  }
`;

// Contenedor de cards
export const CardContainer = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 0;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

// Estado vacío
export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    color: var(--accent-primary);
    opacity: 0.5;
  }
  
  .empty-title {
    font-family: var(--font-accent);
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .empty-text {
    margin-bottom: 2rem;
  }
`;