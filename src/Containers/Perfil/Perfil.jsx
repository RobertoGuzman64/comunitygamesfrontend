import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Perfil.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Button from 'react-bootstrap/Button'
// Redux
import { connect } from 'react-redux';

const Perfil = (props) => {
    let navigate = useNavigate();

    const cambiarPagina = (pagina) => {
        setTimeout(() => {
            navigate(pagina)
        }, 500);
    }

    useEffect(() => {
        if (props.credenciales.token === '') {
            navigate('/');
        };
    })

    return (
        <div className='paginaPerfil'>
            <Header />
            <div className='contenidoPerfil'>
                <div className="datosUsuario">
                    <div className="datosUsuario_nombre">
                        <h1 className='flex'>{props.credenciales.usuario.nombre} {props.credenciales.usuario.apellidos}</h1>
                        <img className='imagenUsuario' src={
                            props.credenciales.usuario.foto === undefined ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : props.credenciales.usuario.foto
                        } />
                    </div>
                    <div className='camposUsuario'>
                        <div className="flex">Correo Electrónico:&nbsp;&nbsp;
                            {props.credenciales.usuario.email}
                        </div>
                        <div className="flex1">Fecha de nacimiento:&nbsp;&nbsp;
                            {new Date(props.credenciales.usuario.edad).toLocaleDateString()}
                        </div>
                        <div className="flex2">Cuenta de Discord:&nbsp;&nbsp;
                            {props.credenciales.usuario.discord}
                        </div>
                        <div className="flex3">Juego Favorito:&nbsp;&nbsp;
                            {props.credenciales.usuario.juego}
                        </div>
                    </div>
                    <div className='botonPerfil'>
                        <Button onClick={() => cambiarPagina("/EditarPerfil")} variant="secondary">Editar Perfil</Button>{' '}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default connect((state) => ({
    credenciales: state.credenciales
}))(Perfil);