import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrearComunidad.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Button from 'react-bootstrap/Button'
// Axios
import axios from 'axios';
import { baseURL } from '../../utiles';
// Redux
import { connect } from 'react-redux';


const CrearComunidad = (props) => {
    let navigate = useNavigate();

    const [datosUsuario, setDatosUsuario] = useState({
        titulo: "",
        imagen: "",
        genero: "",
        fecha: "",
        popularidad: "",
        descripcion: "",
    });

    useEffect(() => {
        if (props.credenciales.usuario.administrador === false) {
            navigate('/');
        }
    })

    const rellenarDatos = (e) => {
        setDatosUsuario({
            ...datosUsuario,
            [e.target.name]: e.target.value
        })
    };

    const crearNuevaComunidad = async () => {
        let body = {
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
            let resultado = await axios.post(`${baseURL}/comunidades`, body, config);
            console.log(resultado.data);
            navigate("/Comunidades");
        } catch (error) {
            console.log(error, 'error');
        }
    }

    return (
        <div className='paginaCrearComunidad'>
            <Header />
            <div className="contenidoCrearComunidad">
                <div className="inputsCrearComunidad">
                    <input className='input' type="text" name="titulo" id="titulo" title="titulo" placeholder="Nombre del Juego" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="text" name="imagen" id="imagen" title="imagen" placeholder="URL de la imagen de la portada del Juego" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="text" name="genero" id="genero" title="genero" placeholder="Género del Juego ejemplos : (guerra) (estrategia)etc..." autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="date" name="fecha" id="fecha" title="fecha" placeholder="Fecha de Lanzamiento del Juego" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="float" name="popularidad" id="popularidad" title="popularidad" placeholder="Popularidad del Juego" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="text" name="descripcion" id="descripcion" title="descripcion" placeholder="Descripción completa del Juego" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <Button onClick={() => crearNuevaComunidad()} variant="secondary" size="lg">
                        Crear Comunidad del Juego
                    </Button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default connect((state) => ({
    credenciales: state.credenciales,
}))(CrearComunidad);