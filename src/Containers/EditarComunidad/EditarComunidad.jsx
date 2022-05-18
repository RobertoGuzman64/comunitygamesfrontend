import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditarComunidad.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Button from 'react-bootstrap/Button'
// Axios
import axios from 'axios';
import { baseURL } from '../../utiles';
// Redux
import { connect } from 'react-redux';
import { MODIFICAR_COMUNIDAD } from '../../redux/actions';



const EditarComunidad = (props) => {
    let navigate = useNavigate();

    const [msgError, setMsgError] = useState('');
    const [datosUsuario, setDatosUsuario] = useState({
        titulo: props.datosComunidad.titulo,
        imagen: props.datosComunidad.imagen,
        genero: props.datosComunidad.genero,
        fecha: props.datosComunidad.fecha,
        popularidad: props.datosComunidad.popularidad,
        descripcion: props.datosComunidad.descripcion,
    })

    const rellenarDatos = (e) => {
        setDatosUsuario({...datosUsuario,[e.target.name]: e.target.value})
    };

    useEffect(() => {
        if (props.credenciales.usuario.administrador === false) {
            navigate('/');
        };
    })

    const modificarComunidad = async () => {
        let body = {
            id: props.datosComunidad.comunidad.id,
            titulo: datosUsuario.titulo,
            imagen: datosUsuario.imagen,
            genero: datosUsuario.genero,
            fecha: datosUsuario.fecha,
            popularidad: datosUsuario.popularidad,
            descripcion: datosUsuario.descripcion,
        }
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            let resultado = await axios.put(`${baseURL}/comunidades/${props.datosComunidad.comunidad.id}`, body, config);
            if (resultado) {
                props.dispatch({ type: MODIFICAR_COMUNIDAD, payload: datosUsuario });
                navigate('/Comunidades');
            }
        } catch (error) {
            setMsgError(error);
        }
    }

    return (
        <div className='paginaEditarComunidad'>
            <Header />
            <div className="contenidoEditarComunidad">
                <div className="inputsEditarComunidad">
                    <h1>Comunidad {props.datosComunidad.comunidad.titulo}</h1>
                    <input className='input' type="text" name="titulo" id="titulo" title="titulo" placeholder={`Nombre del Juego : ${props.datosComunidad.comunidad.titulo}`} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="text" name="imagen" id="imagen" title="imagen" placeholder={`URL de la imagen de la portada del Juego : ${props.datosComunidad.comunidad.imagen}`} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="text" name="genero" id="genero" title="genero" placeholder={`Género del Juego ejemplos : (guerra) (estrategia)etc... : ${props.datosComunidad.comunidad.genero}`} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="date" name="fecha" id="fecha" title="fecha" placeholder="Fecha de Lanzamiento del Juego" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="float" name="popularidad" id="popularidad" title="popularidad" placeholder={`Popularidad del Juego : ${props.datosComunidad.comunidad.popularidad}`} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="text" name="descripcion" id="descripcion" title="descripcion" placeholder={`Descripción completa del Juego : ${props.datosComunidad.comunidad.descripcion}`} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    &nbsp;
                    <Button onClick={() => modificarComunidad()} variant="secondary" size="lg">
                        Actualizar Comunidad
                    </Button>
                    {msgError}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default connect((state) => ({
    credenciales: state.credenciales,
    datosComunidad: state.datosComunidad
}))(EditarComunidad);