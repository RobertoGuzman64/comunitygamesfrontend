import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Comunidad.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
// Axios
import axios from 'axios';
import { baseURL } from '../../utiles';
// Redux
import { connect } from 'react-redux';
// Moment
import moment from 'moment';
import 'moment/locale/es';


const Comunidad = (props) => {
    let navigate = useNavigate();
    // useEffect(()=> {
    //     //Compruebo si hay datos de la película escogida en redux, en caso de NO
    //     //haber datos, redirijo a HOME.
    //     if(props.datosComunidad?.titulo === undefined){
    //         navigate("/");
    //     }
    // });

    return (
        <div className='paginaComunidades'>
            <Header />
            <div className="contenidoLogin">

            </div>
            <Footer />
        </div>
    )
}


export default connect((state) => ({
    credenciales: state.credenciales,
    datosComunidad : state.datosComunidad.comunidad
}))(Comunidad);