import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { RutaProtegida } from './routes/RutaProtegida';
import { useTheme } from './context/ThemeContext'; 

import Home from './pages/Home';
import Login from './pages/Login';
import Carrito from './pages/Carrito';
import AdminProductos from './pages/AdminProductos';
import Navbar from './components/Navbar/Navbar';
import Error404 from './pages/Error404';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';

function App() {
  const { theme } = useTheme();
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

      <Navbar />

      <main className="main-container">
        <Container className="content-container fade-in">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            
            <Route path="/admin" element={<RutaProtegida />}>
               <Route path="alta-productos" element={<AdminProductos />} />
            </Route>

            <Route path="*" element={<Error404 />} />
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;