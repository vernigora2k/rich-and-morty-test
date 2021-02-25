import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.scss';

export const Navbar = () => (
    <nav className="navbar navbar-dark navbar-expand-lg bg-secondary">
        <div className="navbar-logo">
            Rick and Morty app
        </div>
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink className="nav-link" to="/" exact>Characters</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/locations">Locations</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/episodes">Episodes</NavLink>
            </li>
        </ul>
    </nav>
)