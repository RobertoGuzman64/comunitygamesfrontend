import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../utiles';
import './Login.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
//REDUX...
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/actions';
import Button from 'react-bootstrap/Button'


const Login = (props) => {
    let navigate = useNavigate();
    // 1 - Hooks (Equivalen al estado en los componentes de clase)
    const [credenciales, setCredenciales] = useState("");
    const [datosUsuario, setDatosUsuario] = useState({ email: '', clave: '' });
    const [msgError, setMsgError] = useState('');
    const [msgError2, setMsgError2] = useState('');

    // Funciones handlers
    const rellenarDatos = (e) => {
        setDatosUsuario({ ...datosUsuario, [e.target.name]: e.target.value })
    };

    const checkClave = (e) => {
        if (e.target.value.length < 4) {
            setMsgError("La contraseña debe de tener al menos 4 caracteres");
        } else {
            setMsgError("");
        }
    };

    useEffect(() => {
        if (credenciales?.token !== undefined) {
            navigate("/");
        };
    });

    const Login = async () => {
        try {
            let body = {
                email: datosUsuario.email,
                clave: datosUsuario.clave
            }
            let resultado = await axios.post(`${baseURL}/usuarios/login`, body);
            if (resultado.data === 'Usuario o contraseña inválido') {
                setMsgError2('Usuario o contraseña inválido')
            } else {
                setCredenciales(resultado.data)
                // GUARDAMOS LOS DATOS DEL LOGIN EN REDUX.
                props.dispatch({ type: LOGIN, payload: resultado.data });
                navigate("/");
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='paginaLogin'>
            <Header />
            <div className="contenidoLogin">
                <div className='inputsLogin'>
                    <input className='input2' type="text" name="email" id="email" title="email" placeholder="Correo Electronico" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input2' type="password" name="clave" id="clave" title="clave" placeholder="Contraseña" autoComplete="off" onChange={(e) => { rellenarDatos(e); checkClave(e) }} />
                    <button onClick={(e) => {
                        let input = document.getElementById('clave');
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
                    <Button onClick={() => Login()} variant="secondary" size="lg">
                        Iniciar Sesión
                    </Button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default connect()(Login);