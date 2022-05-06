import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import Button from 'react-bootstrap/Button'

const Header = () => {
    let navigate = useNavigate();
    const cambiarPagina = (pagina) => {
        setTimeout(() => {
            navigate(pagina)
        }, 500);
    }
    return (
        <div className='Header'>
            <div className='containerLogo'>
                <div className='logo'></div>
                <h1>Comunity Games</h1>
            </div>
            <div className='botonesHeader'>
                <Button onClick={() => cambiarPagina("/")}variant="outline-secondary">Home</Button>{' '}
                <Button onClick={() => cambiarPagina("/Comunidades")}variant="outline-secondary">Comunidades</Button>{' '}
                <Button onClick={() => cambiarPagina("/Buscar")} variant="outline-secondary">Buscar Comunidad</Button>{' '}
                <Button variant="outline-secondary">Mi Perfil</Button>{' '}
                <Button variant="outline-secondary">Secondary</Button>{' '}
                <Button onClick={() => cambiarPagina("/Registro")}variant="outline-secondary">Registro</Button>{' '}
                <Button onClick={() => cambiarPagina("/Login")}variant="light">Login</Button>
            </div>
        </div>
    )
}
export default Header;