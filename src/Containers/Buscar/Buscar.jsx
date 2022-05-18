import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Buscar.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
// Axios
import axios from 'axios';
import { baseURL } from '../../utiles';
// Redux
import { connect } from 'react-redux';
import { DATOS_COMUNIDAD, GENERO_COMUNIDAD, ESTADO_INICIAL } from '../../redux/actions';
// Moment
import moment from 'moment';
import 'moment/locale/es';


const Buscar = (props) => {
    let navigate = useNavigate();

    const [ msgError, setMsgError ] = useState('');
    const [genero, setGenero] = useState("");

    useEffect(() => {
        props.dispatch({ type: ESTADO_INICIAL });
    }, []);

    const manejador = (ev) => {
        setGenero(ev.target.value);
    }

    const busquedaPorGenero = async () => {
        try {
            let resultado = await axios.get(`${baseURL}/comunidades/genero/${genero}`);
            props.dispatch({ type: GENERO_COMUNIDAD, payload: resultado.data });
        } catch (error) {
            setMsgError(error);
        }
    }
    
    const verComunidad = async (comunidad) => {
        props.dispatch({ type: DATOS_COMUNIDAD, payload: comunidad });
        navigate("/Comunidad");
    };

    return (
        <div className='paginaBuscar'>
            <Header />
            <div className='buscador'>
                <input className='inputBuscar' placeholder="Busca el género que mas te guste ejem..(guerra) (estrategia)" autoComplete="off" onChange={(ev) => manejador(ev)} />
                <Button onClick={() => busquedaPorGenero()} variant="light">Buscar</Button>
            </div>
            <div className="contenidoBuscar">
                {
                    props.comunidades.map((comunidad) => {
                        return (
                            <div className="cardsBuscar" key={comunidad.id}>
                                <Card style={{ width: '30rem' }} >
                                    <Card.Img variant="top" src={
                                        comunidad.imagen === undefined ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : comunidad.imagen
                                    } />
                                    <Card.Body>
                                        <Card.Title>{comunidad.titulo}</Card.Title>
                                        <Card.Text>Genero : {comunidad.genero}</Card.Text>
                                        <Card.Text>Fecha de Lanzamiento : {moment(comunidad.fecha).format('LL')}</Card.Text>
                                        <Card.Text>Popularidad : {comunidad.popularidad}</Card.Text>
                                        <Card.Text>Descripción : {comunidad.descripcion}</Card.Text>
                                        <Button onClick={() => verComunidad(comunidad)} variant="secondary">Ver Comunidad</Button>
                                        {msgError}
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
            <Footer />
        </div>
    )
}

export default connect((state) => ({
    credenciales: state.credenciales,
    comunidades: state.datosComunidad.comunidades
}))(Buscar);