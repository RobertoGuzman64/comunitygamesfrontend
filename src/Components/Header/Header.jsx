import React, { } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
// Redux
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/actions';

const Header = (props) => {
    let navigate = useNavigate();
    const cambiarPagina = (pagina) => {
        setTimeout(() => {
            navigate(pagina)
        }, 500);
    }

    const logOut = () => {
        props.dispatch({ type: LOGOUT });
        setTimeout(() => {
            navigate("/");
        }, 1500);
    }

    if (props.credenciales.token === '') {
        return (
            <div className='Header'>
                <div className='containerLogo'>
                    <div className='logo'></div>
                    <h1>Comunity Games</h1>
                </div>
                <div className='botonesHeader'>
                    <Button onClick={() => cambiarPagina("/")} variant="outline-secondary">Home</Button>{' '}
                    <Button onClick={() => cambiarPagina("/Comunidades")} variant="outline-secondary">Comunidades</Button>{' '}
                    <Button onClick={() => cambiarPagina("/Buscar")} variant="outline-secondary">Buscar Comunidad</Button>{' '}
                    <Button onClick={() => cambiarPagina("/Registro")} variant="outline-secondary">Registro</Button>{' '}
                    <Button onClick={() => cambiarPagina("/Login")} variant="light">Login</Button>
                </div>
            </div>
        )
    } else if (props.credenciales.usuario.administrador === true) {
        return (
            <div className='Header'>
                <div className='containerLogo'>
                    <div className='logo'></div>
                    <h1>Comunity Games</h1>
                </div>
                <div className='nick'>{props.credenciales?.usuario.nombre}{props.credenciales?.usuario.apellidos}</div>
                <div className='botonesHeader'>
                    <Button onClick={() => cambiarPagina("/")} variant="outline-secondary">Home</Button>{' '}
                    <Button onClick={() => cambiarPagina("/Comunidades")} variant="outline-secondary">Comunidades</Button>{' '}
                    <Button onClick={() => cambiarPagina("/Buscar")} variant="outline-secondary">Buscar Comunidad</Button>{' '}
                    <Button onClick={() => cambiarPagina("/Perfil")} variant="outline-secondary">Mi Perfil</Button>{' '}
                    <Button onClick={() => logOut()} variant="light">Logout</Button>
                </div>
            </div>
        )
    } else {
        return (
            <div className='Header'>
                <div className='containerLogo'>
                    <div className='logo'></div>
                    <h1>Comunity Games</h1>
                </div>
                <div className='nick'>{props.credenciales?.usuario.nick}</div>
                <div className='botonesHeader'>
                    {/* <DropdownButton variant="outline-secondary" as={ButtonGroup} title="Comunidades por Género" id="bg-nested-dropdown">
                        <Dropdown.Item eventKey="1">Guerra</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Construcción</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Estrategia</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Deporte</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Arcade</Dropdown.Item>
                    </DropdownButton> */}
                    <Button onClick={() => cambiarPagina("/")} variant="outline-secondary">Home</Button>{' '}
                    <Button onClick={() => cambiarPagina("/Comunidades")} variant="outline-secondary">Comunidades</Button>{' '}
                    <Button onClick={() => cambiarPagina("/Buscar")} variant="outline-secondary">Buscar Comunidad</Button>{' '}
                    <Button onClick={() => cambiarPagina("/Perfil")} variant="outline-secondary">Mi Perfil</Button>{' '}
                    <Button onClick={() => logOut()} variant="light">Logout</Button>
                </div>
            </div>
        )
    }

}
export default connect((state) => ({
    credenciales: state.credenciales
}))(Header);