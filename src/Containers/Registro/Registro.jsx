import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registro.css';
import { checkError } from '../../utiles';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Button from 'react-bootstrap/Button'
// Axios
import axios from 'axios';
import { baseURL } from '../../utiles';


const Registro = () => {
    let navigate = useNavigate();
    const [ msgError, setMsgError ] = useState('');
    const [datosUsuario, setDatosUsuario] = useState({
        nick: "",
        nombre: "",
        apellidos: "",
        edad: "",
        email: "",
        clave: "",
        clave2: "",
        discord: "",
        juego: "",
    });

    const rellenarDatos = (e) => {
        setDatosUsuario({...datosUsuario,[e.target.name]: e.target.value});
    };

    const registrame = async () => {
        setMsgError('');
        let error = '';
        let inputsUsuario = Object.entries(datosUsuario);

        if(datosUsuario.clave !== datosUsuario.clave2){
            return (setMsgError('Las dos contraseñas deben de coincidir'));
        } else {
            setMsgError('');
        }

        for(let elemento of inputsUsuario){
            error = checkError( elemento[0], elemento[1] );
            if(error !== 'ok'){
                setMsgError(error);
                return;
            };
        };

        let body = {
            nick: datosUsuario.nick,
            nombre: datosUsuario.nombre,
            apellidos: datosUsuario.apellidos,
            edad: datosUsuario.edad,
            email: datosUsuario.email,
            clave: datosUsuario.clave,
            discord: datosUsuario.discord,
            juego: datosUsuario.juego,
        }
        try {
            await axios.post(`${baseURL}/usuarios`, body);
            setTimeout(() => {
                navigate("/login");
            }, 500);
        } catch (error) {
            console.log(error, 'error');
        }
    }

    return (
        <div className='paginaRegistro'>
            <Header />
            <div className="contenidoRegistro">
                <div className="inputsRegistro">
                    <input className='input' type="text" name="nick" id="nick" title="nick" placeholder="Elige un nick de Jugador (ejemplo, el de Discord)" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="text" name="nombre" id="nombre" title="nombre" placeholder="Nombre:" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="text" name="apellidos" id="apellidos" title="apellidos" placeholder="Apellidos:" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="date" name="edad" id="edad" title="edad" placeholder="Fecha de Nacimiento" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="email" name="email" id="email" title="email" placeholder="Correo Electronico" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="password" name="clave" id="clave" title="clave" placeholder="Elige una Contraseña" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="password" name="clave2" id="clave2" title="clave2" placeholder="Repite la Contraseña por favor" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="text" name="discord" id="discord" title="discord" placeholder="Introduce Tu ID de Discord (hazte una cuenta si no tienes)" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="text" name="juego" id="juego" title="juego" placeholder="Introduce Tu Juego Favorito" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    {msgError}
                    <Button onClick={() => registrame()} variant="secondary" size="lg">
                        Regístreme
                    </Button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Registro;