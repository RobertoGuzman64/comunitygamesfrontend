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

    const cambiarPagina = (pagina) => {
        setTimeout(() => {
            navigate(pagina)
        }, 500);
    }

    return (
        <div className='paginaChat'>
            <Header />
            <div className="contenidoChat">
                <div className="cardChat">
                    <Card style={{ width: '100rem', height: '50rem', backgroundColor: '#272b30' }}>
                        <Card.Body>
                            <Card.Title style={{ color: '#fff' }}>Chat</Card.Title>
                            <Card.Text style={{ color: '#fff' }}>
                                Aquí podrás interactuar con los usuarios de la aplicación.
                            </Card.Text>
                        </Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Control style={{ width: '80rem', height: '3em', marginLeft:'9.5em' }} type="text" placeholder="Mensaje" />
                            </Form.Group>
                            
                            <Button style={{ marginLeft:'9.5em',marginBlockEnd:'1em' }}variant="secondary">Enviar Mensaje</Button>
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