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
import { MIEMBROS_COMUNIDAD } from '../../redux/actions';
// Moment
import moment from 'moment';
import 'moment/locale/es';



const Comunidad = (props) => {
    let navigate = useNavigate();
    const [miembros, setMiembros] = useState([]);

    const cambiarPagina = (pagina) => {
        setTimeout(() => {
            navigate(pagina)
        }, 500);
    }

    useEffect(() => {
        verMiembros();
        moment.locale('es');
    }, []);

    useEffect(() => {
        if (props.credenciales.token === '') {
            navigate('/Login');
        } else if (props.datosComunidad?.id === undefined) {
            navigate("/Comunidades");
        }
    })

    const verMiembros = async () => {
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            let resultado = await axios.get(`${baseURL}/miembros/comunidad/${props.datosComunidad.id}`, config);
            setMiembros(resultado.data);
            props.dispatch({ type: MIEMBROS_COMUNIDAD, payload: resultado.data });
        } catch (error) {
            console.log(error)
        }
    };

    const mostrarBotones = () => {
        if (props.datosMiembro.length > 0) {
            for (let i = 0; i < props.datosMiembro.length; i++) {
                if (props.datosMiembro[i].usuario_id === props.credenciales.usuario.id) {
                    return (
                        <>
                        <Button onClick={() => cambiarPagina("/Chat")} variant="secondary">Chat de la Comunidad</Button>
                        &nbsp;&nbsp;
                        </>
                    )
                }
            }
            return (
                <Button onClick={() => cambiarPagina("/Miembro")} variant="secondary">Unirse a la Comunidad</Button>
            )
        } else {
            return (
                <Button onClick={() => cambiarPagina("/Miembro")} variant="secondary">Unirse a la Comunidad</Button>
            )
        }
    }

    return (
        <div className='paginaComunidad'>
            <Header />
            <div className="contenidoComunidad">
                <div className="cardComunidad">
                    <Card style={{ width: '60rem', flex: 'column', backgroundColor: '#272b30'}}>
                        <Card.Img variant="top" src={
                            props.datosComunidad.imagen === undefined ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : props.datosComunidad.imagen
                        } />
                        <Card.Body style={{ color: '#fff', overflow: 'auto',  }}>
                            <Card.Title>Miembros de esta Comunidad{ }</Card.Title>
                            <hr></hr>
                            <Button onClick={() => cambiarPagina("/Comunidades")} variant="outline-secondary">Volver</Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {mostrarBotones()}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <hr></hr>
                            {
                                miembros.map((miembro) => {
                                    return (
                                        <div className='datosMiembros' key={miembro.id}>
                                            <Card.Text>{miembro.nick}</Card.Text>
                                            <img className='avatarMiembro' src={miembro.avatar} alt={miembro} />
                                            <Card.Text>Miembro desde : {moment(miembro.fecha).format('LL')}</Card.Text>
                                            <hr></hr>
                                        </div>
                                    )
                                })
                            }
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
    datosComunidad: state.datosComunidad.comunidad,
    datosMiembro: state.datosMiembro.miembros
}))(Comunidad);