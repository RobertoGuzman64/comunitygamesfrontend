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

    return (
        <div className='paginaEditarClave'>
            <Header />
            <div className='contenidoEditarClave'>
                <div className='inputsEditarClave'>
                    <p className='titulo'>Seguro que quieres eliminar tu cuenta ??</p>
                    <div className='botonesEditarClave'>
                        <Button onClick={() => cambiarPagina("/EditarPerfil")} variant="outline-secondary" size="lg">
                            Volver
                        </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={() => borrarUsuario()} variant="danger" size="lg">
                            Eliminar cuenta
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default connect((state) => ({
    datosComunidad: state.datosComunidad
}))(BorrarComunidad);