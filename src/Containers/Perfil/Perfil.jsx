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
                        <div className="flex1">Correo Electrónico:&nbsp;&nbsp;
                            <p>{props.credenciales.usuario.email}</p>
                        </div>
                        <div className="flex1">Fecha de nacimiento:&nbsp;&nbsp;
                            <p>{new Date(props.credenciales.usuario.edad).toLocaleDateString()}</p>
                        </div>
                        <div className="flex1">Cuenta de Discord:&nbsp;&nbsp;
                            <p>{props.credenciales.usuario.discord}</p>
                        </div>
                        <div className="flex1">Juego Favorito:&nbsp;&nbsp;
                            <p>{props.credenciales.usuario.juego}</p>
                        </div>
                    </div>
                    <div className='botonPerfil' >
                        <Button onClick={() => cambiarPagina("/EditarPerfil")} variant="secondary" size="lg">Editar Perfil</Button>
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