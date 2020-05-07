import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Header() {
   return(
      <div className="header">
         <Link to="/">Home</Link>
         <Link to="/login">Entrar</Link>
      </div>
   );
}