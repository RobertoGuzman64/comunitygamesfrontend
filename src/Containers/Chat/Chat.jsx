import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
// Axios
import axios from 'axios';
import { baseURL } from '../../utiles';
// Redux
import { connect } from 'react-redux';
// Moment
import 'moment/locale/es';


const Chat = (props) => {
    let navigate = useNavigate();

    return (
        <div className='paginaChat'>
            <Header />
            <div className="contenidoChat">
                <div className="cardChat">
                    
                </div>
            </div>
            <Footer />
        </div>
    )
}


























export default connect((state) => ({
    credenciales: state.credenciales,
    datosComunidad: state.datosComunidad.comunidad
}))(Chat);