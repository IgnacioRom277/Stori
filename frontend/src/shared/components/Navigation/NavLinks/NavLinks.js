import React, { useContext } from "react";
import './NavLinks.css';
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../../../context/auth-context";

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <React.Fragment>
    {auth.isLoggedIn && ( 
    <ul className="nav-links">
      <li><NavLink to="/recipients">Destinatarios</NavLink></li>
      <li><NavLink to="/newsletter">Crear Newsletter</NavLink></li>
      <li><NavLink to="/show-newsletter">Mostrar Newsletter</NavLink></li>
      <li><NavLink to="/send-newsletter">Enviar Newsletter</NavLink></li>
      <li><button onClick={auth.logout}>Cerrar Sesión</button></li>
    </ul>
    )}
    </React.Fragment>
  )
}

export default NavLinks;