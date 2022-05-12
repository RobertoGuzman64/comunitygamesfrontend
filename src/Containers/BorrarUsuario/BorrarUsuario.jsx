import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BorrarUsuario.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Button from 'react-bootstrap/Button'
// Axios
import axios from 'axios';
import { baseURL } from '../../utiles';
// Redux
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/actions';


const BorrarUsuario = (props) => {
    let navigate = useNavigate();
    const cambiarPagina = (pagina) => {
        setTimeout(() => {
            navigate(pagina)
        }, 500);
    }

    useEffect(() => {
    }, [props.credenciales.usuario])

    const borraUsuario = async () => {
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            let respuesta = await axios.delete(`${baseURL}/usuarios/${props.credenciales.usuario.id}`, config);
            if (respuesta.status === 200) {
                props.dispatch({ type: LOGOUT });
                navigate('/');
            }
        } catch (error) {
            console.log(error)
        }
    }

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
                        <Button onClick={() => borraUsuario()} variant="danger" size="lg">
                            Eliminar cuenta
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
}))(BorrarUsuario);