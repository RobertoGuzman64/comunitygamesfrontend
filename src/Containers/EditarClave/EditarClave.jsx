import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditarClave.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Button from 'react-bootstrap/Button'
// Axios
import axios from 'axios';
import { baseURL } from '../../utiles';
// Redux
import { connect } from 'react-redux';



const EditarClave = (props) => {
    let navigate = useNavigate();

    const cambiarPagina = (pagina) => {
        setTimeout(() => {
            navigate(pagina)
        }, 500);
    }

    const [contrasena, setContrasena] = useState({
        claveAnterior: undefined,
        claveNueva: undefined,
    })

    const rellenarDatos = (e) => {
        setContrasena({
            ...contrasena,
            [e.target.name]: e.target.value
        })
    };

    useEffect(() => {
        if (props.credenciales.token === '') {
            navigate('/');
        };
    })

    useEffect(() => {
    }, [props.credenciales.usuario])

    const actualizaClave = async () => {
        let body = {
            claveAnterior: contrasena.claveAnterior,
            claveNueva: contrasena.claveNueva
        }
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            let respuesta = await axios.put(`${baseURL}/usuarios/${props.credenciales.usuario.id}/clave`, body, config);
            if (respuesta) {
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
                    <p className='titulo'>Editar Contraseña !</p>
                    <input className='input' type="password" name="claveAnterior" id="claveAnterior" title="claveAnterior" placeholder={`Contraseña Actual :`} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <button onClick={(e) => {
                        let input = document.getElementById('claveAnterior');
                        if (input.type === 'password') {
                            input.type = 'text'
                            e.target.innerHTML = 'Esconder Contraseña'
                        } else {
                            input.type = 'password'
                            e.target.innerHTML = 'Mostrar Contraseña'
                        }
                    }}>
                        Mostrar Contraseña
                    </button>
                    <input className='input' type="password" name="claveNueva" id="claveNueva" title="claveNueva" placeholder={`Contraseña Nueva :`} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <button onClick={(e) => {
                        let input = document.getElementById('claveNueva');
                        if (input.type === 'password') {
                            input.type = 'text'
                            e.target.innerHTML = 'Esconder Contraseña'
                        } else {
                            input.type = 'password'
                            e.target.innerHTML = 'Mostrar Contraseña'
                        }
                    }}>
                        Mostrar Contraseña
                    </button>
                    <div className='botonesEditarClave'>
                        <Button onClick={() => cambiarPagina("/EditarPerfil")} variant="outline-secondary" size="lg">
                            Volver
                        </Button>
                        <Button onClick={() => actualizaClave()} variant="secondary" size="lg">
                            Cambiar Contraseña
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
}))(EditarClave);