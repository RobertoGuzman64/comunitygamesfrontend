import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
// Axios
import axios from 'axios';
import { baseURL } from '../../utiles';
// Redux
import { connect } from 'react-redux';
// Moment
import moment from 'moment';
import 'moment/locale/es';


const Chat = (props) => {
    let navigate = useNavigate();
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {
        verMensajes();
        moment.locale('es');
    }, []);

    const verMensajes = async () => {
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            let resultado = await axios.get(`${baseURL}/mensajes/comunidad/${props.datosComunidad.id}`, config);
            setMensajes(resultado.data);
            console.log('Estos son los resultados', resultado.data);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='paginaChat'>
            <Header />
            <div className="contenidoChat">
                <div className="cardChat">
                    <Card style={{ width: '100rem', height: '50rem', backgroundColor: '#272b30' }}>
                        <Card.Body style={{ color: '#fff', overflow: 'scroll' }}>
                            <Card.Title style={{ color: '#fff' }}>Chat : {props.datosComunidad.titulo}</Card.Title>
                            {
                                mensajes.map((mensaje) => {
                                    return (
                                        <div className='chat' key={mensaje.id}>
                                            <Card.Text style={{ color: '#fff' }}>{props.credenciales.usuario.nick}</Card.Text>
                                            <Card.Text style={{ color: '#fff' }}>{mensaje.mensaje}</Card.Text>
                                            <Card.Text style={{ color: '#fff' }}>{mensaje.fecha}</Card.Text>
                                            <Card.Text style={{ color: '#fff' }}>{mensaje.hora}</Card.Text>
                                        </div>
                                    )
                                })
                            }
                        </Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Control style={{ width: '80rem', height: '3em', marginLeft: '9.5em' }} type="text" placeholder="Mensaje" />
                            </Form.Group>
                            <Button style={{ marginLeft: '9.5em', marginBlockEnd: '1em' }} variant="secondary">Enviar Mensaje</Button>
                        </Form>
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
}))(Chat);