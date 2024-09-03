import React from 'react';
import './Navbar.css'; // Importa el CSS específico para el Navbar

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li><a href="#home">Inicio</a></li>
        <li><a href="#about">Acerca de</a></li>
        <li><a href="#services">Servicios</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
