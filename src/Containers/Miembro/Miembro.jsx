import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Miembro.css';
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


const Miembro = (props) => {
    let navigate = useNavigate();
    const [msgError, setMsgError] = useState('');
    const [datosUsuario, setDatosUsuario] = useState({
        avatar: "",
    });

    const cambiarPagina = (pagina) => {
        setTimeout(() => {
            navigate(pagina)
        }, 500);
    }

    useEffect(() => {
        if (props.datosComunidad?.id === undefined) {
            navigate("/");
        }
    });

    const rellenarDatos = (e) => {
        setDatosUsuario({ ...datosUsuario, [e.target.name]: e.target.value })
    };

    const crearMiembro = async () => {
        let body = {
            comunidad_id: props.datosComunidad.id,
            usuario_id: props.credenciales.usuario.id,
            nick: props.credenciales.usuario.nick,
            avatar: datosUsuario.avatar,
            fecha: Date.now(),
        };
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            await axios.post(`${baseURL}/miembros`, body, config);
            navigate("/Comunidad");
        } catch (error) {
            setMsgError(error);
        };
    }

    return (
        <div className='paginaMiembro'>
            <Header />
            <div className="contenidoMiembro">
                <div className="cardMiembro">
                    <Card style={{ width: '50rem', backgroundColor: '#272b30' }} >
                        <Card.Img variant="top" src={
                            props.datosComunidad.imagen === undefined ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : props.datosComunidad.imagen
                        } />
                        <Card.Body style={{ color: '#fff' }}>
                            <Card.Title>{props.datosComunidad.titulo}</Card.Title>
                            <input className='inputMiembro' type="text" name="avatar" id="avatar" title="avatar" placeholder="Introduce la URL del avatar que mas te guste" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                            <Button onClick={() => crearMiembro()} variant="secondary">Unirse</Button>
                            {msgError}
                            <Button onClick={() => cambiarPagina('/Comunidad')} variant="outline-secondary">Volver</Button>
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
}))(Miembro);