import React, { useState, useEffect } from 'react';
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
    const [mensajes, setMensajes] = useState([]);
    const [datosUsuario, setDatosUsuario] = useState({
        mensaje: "",
    });

    useEffect(() => {
        verMensajes();
        moment.locale('es');
    }, []);

    const rellenarDatos = (e) => {
        setDatosUsuario({ ...datosUsuario, [e.target.name]: e.target.value })
    };

    const verMensajes = async () => {
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            let resultado = await axios.get(`${baseURL}/mensajes/comunidad/${props.datosComunidad.id}`, config);
            setMensajes(resultado.data);
        } catch (error) {
            console.log(error)
        }
    };

    const enviarMensaje = async () => {
        let body = {
            comunidad_id: props.datosComunidad.id,
            usuario_id: props.credenciales.usuario.id,
            nick: props.credenciales.usuario.nick,
            mensaje: datosUsuario.mensaje,
            fecha: Date.now(),
            hora: moment().format('LT'),
        };
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            await axios.post(`${baseURL}/mensajes`, body, config);
            window.location.reload(true);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='paginaChat'>
            <Header />
            <div className="contenidoChat">
                <div className="cardChat">
                    <Card style={{ width: '100rem', height: '50rem', backgroundColor: '#272b30' }}>
                        <Card.Body className='CardBody' style={{ color: '#fff', overflow: 'auto', }}>
                            <Card.Title style={{ color: '#fff' }}>Chat de la Comunidad de {props.datosComunidad.titulo}</Card.Title>
                            {
                                mensajes.map((mensaje) => {
                                    return (
                                        <div className='chat' key={mensaje.id}>
                                            <Card.Text style={{ color: '#fff' }}>{mensaje.nick}</Card.Text>
                                            <Card.Text style={{ color: '#fff' }}>{mensaje.mensaje}</Card.Text>
                                            <Card.Text style={{ color: '#fff' }}>{moment(mensaje.fecha).format('LL')}</Card.Text>
                                            <Card.Text style={{ color: '#fff' }}>{mensaje.hora}</Card.Text>
                                            <hr></hr>
                                        </div>
                                    )
                                })
                            }
                        </Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="mensaje">
                                <input className='inputChat' type="text" name="mensaje" id="mensaje" title="mensaje" placeholder="Escribe..." autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                            </Form.Group>
                            <Button onClick={() => enviarMensaje()} style={{ marginLeft: '9.5em', marginBlockEnd: '1em' }} variant="secondary">Enviar Mensaje</Button>
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