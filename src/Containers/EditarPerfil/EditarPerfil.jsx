import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditarPerfil.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Button from 'react-bootstrap/Button'
// Axios
import axios from 'axios';
import { baseURL } from '../../utiles';
// Redux
import { connect } from 'react-redux';
import { MODIFICAR_CREDENCIALES } from '../../redux/actions';


const EditarPerfil = (props) => {
    let navigate = useNavigate();
    const cambiarPagina = (pagina) => {
        setTimeout(() => {
            navigate(pagina)
        }, 500);
    }

    const [datosUsuario, setDatosUsuario] = useState({
        nick: props.credenciales.usuario.nick,
        nombre: props.credenciales.usuario.nombre,
        apellidos: props.credenciales.usuario.apellidos,
        edad: props.credenciales.usuario.edad,
        discord: props.credenciales.usuario.discord,
        juego: props.credenciales.usuario.juego,
    })

    const rellenarDatos = (e) => {
        setDatosUsuario({...datosUsuario,[e.target.name]: e.target.value})
    };

    useEffect(() => {
        if (props.credenciales.token === '') {
            navigate('/');
        };
    })

    const actualizaUsuario = async () => {
        let body = {
            id: props.credenciales.usuario.id,
            nick: datosUsuario.nick,
            nombre: datosUsuario.nombre,
            apellidos: datosUsuario.apellidos,
            edad: datosUsuario.edad,
            discord: datosUsuario.discord,
            juego: datosUsuario.juego,
        }
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            let resultado = await axios.put(`${baseURL}/usuarios/${props.credenciales.usuario.id}`, body, config);
            if (resultado) {
                props.dispatch({ type: MODIFICAR_CREDENCIALES, payload: datosUsuario });
                navigate('/Perfil');
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='paginaEditarPerfil'>
            <Header />
            <div className='contenidoEditarPerfil'>
                <div className='inputsEditarPerfil'>
                    <p className='titulo'>Editar Perfil !</p>
                    <input className='input' type="text" name="nick" id="nick" title="nick" placeholder={`Nick:  ${props.credenciales.usuario.nick}`} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="text" name="nombre" id="nombre" title="nombre" placeholder={`Nombre:  ${props.credenciales.usuario.nombre}`} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="text" name="apellidos" id="apellidos" title="apellidos" placeholder={`Apellidos:  ${props.credenciales.usuario.apellidos}`} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="date" name="edad" id="edad" title="edad" placeholder={`Fecha de Nacimiento:  ${props.credenciales.usuario.edad}`} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="text" name="discord" id="discord" title="discord" placeholder={`Cuenta de Discord:  ${props.credenciales.usuario.discord}`} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="text" name="juego" id="juego" title="juego" placeholder={`Juego Favorito:  ${props.credenciales.usuario.juego}`} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <div className='botonesEditarPerfil'>
                        <Button onClick={() => cambiarPagina("/EditarClave")} variant="outline-secondary" size="lg">
                            Editar Contraseña
                        </Button><br></br>
                        <Button onClick={() => cambiarPagina("/BorrarUsuario")} variant="outline-secondary" size="lg">
                            Eliminar Cuenta
                        </Button><br></br>
                        <Button onClick={() => actualizaUsuario()} variant="secondary" size="lg">
                            Guardar Cambios
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default connect((state) => ({
    credenciales: state.credenciales
}))(EditarPerfil);