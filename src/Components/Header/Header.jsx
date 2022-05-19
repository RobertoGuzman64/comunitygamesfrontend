import React, { } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import Button from 'react-bootstrap/Button'
// Redux
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/actions';


const Header = (props) => {
    let navigate = useNavigate();
    const { token, administrador } = props.credenciales.usuario;
    
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

    if (token === '') {
        return (
            <div className='Header'>
                <div className='containerLogo'>
                    <div className='logo'></div>
                    <h1>Comunity Games</h1>
                </div>
                <div className='botonesHeader'>
                    <Button onClick={() => cambiarPagina("/")} variant="secondary">Home</Button>{' '}&nbsp;
                    <Button onClick={() => cambiarPagina("/Comunidades")} variant="secondary">Comunidades</Button>{' '}&nbsp;
                    <Button onClick={() => cambiarPagina("/Buscar")} variant="secondary">Buscar Comunidad</Button>{' '}&nbsp;
                    <Button onClick={() => cambiarPagina("/Registro")} variant="secondary">Registro</Button>{' '}&nbsp;
                    <Button onClick={() => cambiarPagina("/Login")} variant="light">Login</Button>
                </div>
            </div>
        )
    }

    if (administrador) {
        return (
            <div className='Header'>
                <div className='containerLogo'>
                    <div className='logo'></div>
                    <h1>Comunity Games</h1>
                </div>
                <div className='nick'>{props.credenciales?.usuario.nombre}&nbsp;{props.credenciales?.usuario.apellidos}</div>
                <div className='botonesHeader'>
                    <Button onClick={() => cambiarPagina("/")} variant="secondary">Home</Button>{' '}&nbsp;
                    <Button onClick={() => cambiarPagina("/CrearComunidad")} variant="secondary">Crear Comunidad</Button>{' '}&nbsp;
                    <Button onClick={() => cambiarPagina("/Comunidades")} variant="secondary">Comunidades</Button>{' '}&nbsp;
                    <Button onClick={() => cambiarPagina("/Buscar")} variant="secondary">Buscar Comunidad</Button>{' '}&nbsp;
                    <Button onClick={() => cambiarPagina("/Perfil")} variant="secondary">Mi Perfil</Button>{' '}&nbsp;
                    <Button onClick={() => logOut()} variant="light">Logout</Button>
                </div>
            </div>
        )
    }

    if (!administrador) {
        return (
            <div className='Header'>
                <div className='containerLogo'>
                    <div className='logo'></div>
                    <h1>Comunity Games</h1>
                </div>
                <div className='nick'>{props.credenciales?.usuario.nick}</div>
                <div className='botonesHeader'>
                    <Button onClick={() => cambiarPagina("/")} variant="secondary">Home</Button>{' '}&nbsp;
                    <Button onClick={() => cambiarPagina("/Comunidades")} variant="secondary">Comunidades</Button>{' '}&nbsp;
                    <Button onClick={() => cambiarPagina("/Buscar")} variant="secondary">Buscar Comunidad</Button>{' '}&nbsp;
                    <Button onClick={() => cambiarPagina("/Perfil")} variant="secondary">Mi Perfil</Button>{' '}&nbsp;&nbsp;
                    <Button onClick={() => logOut()} variant="light">Logout</Button>
                </div>
            </div>
        )
    }

}
export default connect((state) => ({
    credenciales: state.credenciales
}))(Header);