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
    let navigate = useNavigate();
    const { administrador } = props.credenciales.usuario;
    const [comunidades, setComunidades] = useState([]);
    const [msgError, setMsgError] = useState('');

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
            setMsgError(error);
        }
    };

    const verComunidad = async (comunidad) => {
        await props.dispatch({ type: DATOS_COMUNIDAD, payload: comunidad });
        navigate("/Comunidad");
    };

    const modificarComunidad = async (comunidad) => {
        await props.dispatch({ type: DATOS_COMUNIDAD, payload: comunidad });
        navigate("/EditarComunidad");
    };

    const borrarComunidad = async (comunidad) => {
        await props.dispatch({ type: DATOS_COMUNIDAD, payload: comunidad });
        navigate("/BorrarComunidad");
    };

    if (administrador) {
        return (
            <div className='paginaComunidades'>
                <Header />
                <div className="contenidoComunidades">
                    {
                        comunidades.map((comunidad) => {
                            const { id, titulo, imagen, genero, fecha, popularidad, descripcion} = comunidad;
                            return (
                                <div className="cardsComunidades" key={id}>
                                    <Card style={{ width: '35rem', flex: 'column', backgroundColor: '#272b30', marginRight:'1em' }} >
                                        <Card.Img style={{ width: '35rem', height: '20rem' }} variant="top" src={
                                            !imagen ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : imagen
                                        } />
                                        <Card.Body style={{ color: '#fff' }}>
                                            <Card.Title>{titulo}</Card.Title>
                                            <Card.Text>Genero : {genero}</Card.Text>
                                            <Card.Text>Fecha de Lanzamiento : {moment(fecha).format('LL')}</Card.Text>
                                            <Card.Text>Popularidad : {popularidad}</Card.Text>
                                            <Card.Text>Descripci??n : {descripcion}</Card.Text>
                                            &nbsp;&nbsp;&nbsp;
                                            <Button onClick={() => verComunidad(comunidad)} variant="outline-secondary">Ver Comunidad</Button>
                                            &nbsp;&nbsp;
                                            <Button onClick={() => modificarComunidad(comunidad)} variant="secondary">Modificar Comunidad</Button>
                                            &nbsp;&nbsp;
                                            <Button onClick={() => borrarComunidad(comunidad)} variant="danger">Eliminar Comunidad</Button>
                                        </Card.Body>
                                    </Card>
                                    {msgError}
                                </div>
                            )
                        })
                    }
                </div>
                <Footer />
            </div>
        )
    }
    
    if (!administrador) {
        return (
            <div className='paginaComunidades'>
                <Header />
                <div className="contenidoComunidades">
                    {
                        comunidades.map((comunidad) => {
                            const { id, titulo, imagen, genero, fecha, popularidad, descripcion} = comunidad;
                            return (
                                <div className="cardsComunidades" key={id}>
                                    <Card style={{ width: '30rem', flex: 'column', backgroundColor: '#272b30', marginRight:'1em' }} >
                                        <Card.Img style={{ width: '30rem', height: '20rem' }} variant="top" src={
                                            imagen === undefined ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : imagen
                                        } />
                                        <Card.Body style={{ color: '#fff' }}>
                                            <Card.Title>{titulo}</Card.Title>
                                            <Card.Text>Genero : {genero}</Card.Text>
                                            <Card.Text>Fecha de Lanzamiento : {moment(fecha).format('LL')}</Card.Text>
                                            <Card.Text>Popularidad : {popularidad}</Card.Text>
                                            <Card.Text>Descripci??n : {descripcion}</Card.Text>
                                            <Button onClick={() => verComunidad(comunidad)} variant="secondary">Ver Comunidad</Button>
                                        </Card.Body>
                                    </Card>
                                    {msgError}
                                </div>
                            )
                        })
                    }
                </div>
                <Footer />
            </div>
        )
    }
}

export default connect((state) => ({
    credenciales: state.credenciales
}))(Comunidades);