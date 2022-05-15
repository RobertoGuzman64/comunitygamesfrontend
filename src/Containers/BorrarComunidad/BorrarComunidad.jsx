import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BorrarComunidad.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Button from 'react-bootstrap/Button'
// Axios
import axios from 'axios';
import { baseURL } from '../../utiles';
// Redux
import { connect } from 'react-redux';



const BorrarComunidad = (props) => {
    let navigate = useNavigate();

    const cambiarPagina = (pagina) => {
        setTimeout(() => {
            navigate(pagina)
        }, 500);
    }

    useEffect(() => {
        if (props.credenciales.usuario.administrador === false) {
            navigate('/');
        };
    })

    useEffect(() => {
    }, [props.datosComunidad.comunidad])

    const eliminarComunidad = async () => {
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            let respuesta = await axios.delete(`${baseURL}/comunidades/${props.datosComunidad.comunidad.id}`, config);
            if (respuesta.status === 200) {
                navigate('/Comunidades');
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='paginaBorrarComunidad'>
            <Header />
            <div className='contenidoBorrarComunidad'>
                <div className='inputsBorrarComunidad'>
                    <p className='titulo'>Seguro que quieres eliminar {props.datosComunidad.comunidad.titulo} ??</p>
                    <p className='titulo'></p>
                    <div className='botonesBorrarComunidad'>
                        <Button onClick={() => cambiarPagina("/Comunidades")} variant="outline-secondary" size="lg">
                            Volver
                        </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={() => eliminarComunidad()} variant="danger" size="lg">
                            Eliminar Comunidad
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default connect((state) => ({
    credenciales: state.credenciales,
    datosComunidad: state.datosComunidad
}))(BorrarComunidad);