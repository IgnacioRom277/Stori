import React from "react";
import './NavLinks.css';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  return (
    <ul className="nav-links">
      <li><NavLink to="/">Usuarios</NavLink></li>
      <li><NavLink to="/">Campañas</NavLink></li>
      <li><NavLink to="/">Destinatarios</NavLink></li>
      <li><NavLink to="/">Cerrar Sesión</NavLink></li>
      <li><NavLink to="/">Iniciar Sesión</NavLink></li>
    </ul>
  )
}

export default NavLinks;