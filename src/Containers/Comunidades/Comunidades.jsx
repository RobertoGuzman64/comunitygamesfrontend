import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Comunidades.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
// Axios
import axios from 'axios';
import { baseURL } from '../../utiles';
// Redux
import { connect } from 'react-redux';
import { DATOS_COMUNIDAD } from '../../redux/actions';
// Moment
import moment from 'moment';
import 'moment/locale/es';

const Comunidades = (props) => {

    const [comunidades, setComunidades] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        traerComunidades();
        moment.locale('es');
    }, []);

    useEffect(() => {
    }, [comunidades]);

    const traerComunidades = async () => {
        try {
            let resultado = await axios.get(`${baseURL}/comunidades`);
            setComunidades(resultado.data);
        } catch (error) {
            console.log(error)
        }
    };

    const verComunidad = async (comunidad) => {
        await props.dispatch({ type: DATOS_COMUNIDAD, payload: comunidad });
        navigate("/Comunidad");
    };

    return (
        <div className='paginaComunidades'>
            <Header />
            <div className="contenidoComunidades">
                {
                    comunidades.map((comunidad) => {
                        return (
                            <div className="cardsComunidad" key={comunidad.id}>
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
    credenciales: state.credenciales
}))(Comunidades);