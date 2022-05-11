import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrearComunidad.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
// Axios
import axios from 'axios';
import { baseURL } from '../../utiles';

const CrearComunidad = () => {
    return (
        <div className='paginaCrearComunidad'>
            <Header />
            <div className="contenidoCrearComunidad">
                <div className="inputsCrearComunidad">
                    <input className='input' type="text" name="nick" id="nick" title="nick" placeholder="Elige un nick de Jugador (ejemplo, el de Discord)" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="text" name="nombre" id="nombre" title="nombre" placeholder="Nombre:" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="text" name="apellidos" id="apellidos" title="apellidos" placeholder="Apellidos:" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="date" name="edad" id="edad" title="edad" placeholder="Fecha de Nacimiento" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="email" name="email" id="email" title="email" placeholder="Correo Electronico" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="password" name="clave" id="clave" title="clave" placeholder="Elige una Contraseña" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="text" name="discord" id="discord" title="discord" placeholder="Introduce Tu ID de Discord (hazte una cuenta si no tienes)" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <input className='input' type="text" name="juego" id="juego" title="juego" placeholder="Introduce Tu Juego Favorito" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                    <Button onClick={() => crearComunidad()} variant="secondary" size="lg">
                        Crear Comunidad
                    </Button>
                </div>
            </div>
            <Footer />
        </div>
    )

}













export default CrearComunidad;