import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Comunidad.css';
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
import moment from 'moment';
import 'moment/locale/es';


const Comunidad = (props) => {
    let navigate = useNavigate();

    useEffect(()=> {
        if(props.datosComunidad?.id === undefined){
            navigate("/");
        }
    });

    return (
        <div className='paginaComunidad'>
            <Header />
            <div className="contenidoComunidad">
                <div className="cardComunidad">
                    <Card style={{ width: '50rem' }} >
                        <Card.Img variant="top" src={
                            props.datosComunidad.imagen === undefined ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : props.datosComunidad.imagen
                        } />
                        <Card.Body>
                            <Card.Title>{props.datosComunidad.titulo}</Card.Title>
                            <Card.Text>Genero : {props.datosComunidad.genero}</Card.Text>
                            <Card.Text>Fecha de Lanzamiento : {moment(props.datosComunidad.fecha).fromNow()}</Card.Text>
                            <Card.Text>Popularidad : {props.datosComunidad.popularidad}</Card.Text>
                            <Card.Text>Descripción : {props.datosComunidad.descripcion}</Card.Text>
                            <Button  variant="secondary">Unirse a la Comunidad</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default connect((state) => ({
    credenciales: state.credenciales,
    datosComunidad: state.datosComunidad.comunidad
}))(Comunidad);