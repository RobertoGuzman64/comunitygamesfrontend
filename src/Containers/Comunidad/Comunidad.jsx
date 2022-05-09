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
        }else if(props.datosComunidad?.id === undefined){
            navigate("/Comunidades");
        }
    })
/*
    useEffect(() => {
        if (props.datosComunidad?.id === undefined) {
            navigate("/");
        }
    });
*/
    const verMiembros = async () => {
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            let resultado = await axios.get(`${baseURL}/miembros/comunidad/${props.datosComunidad.id}`, config);
            setMiembros(resultado.data);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='paginaComunidad'>
            <Header />
            <div className="contenidoComunidad">
                <div className="cardComunidad">
                    <Card style={{ width: '50rem', height: '50rem'}} >
                        <Card.Img variant="top" src={
                            props.datosComunidad.imagen === undefined ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : props.datosComunidad.imagen
                        } />
                        <Card.Body>
                            <Card.Title>Miembros de esta Comunidad{}</Card.Title>
                            {
                                miembros.map((miembro) => {
                                    return (
                                        <div className='datosMiembros' key={miembro.id}>
                                            <Card.Text>{miembro.nick}</Card.Text>
                                            <img className='avatarMiembro' src={miembro.avatar} alt={miembro}/>
                                            <Card.Text>Miembro desde : {moment(miembro.fecha).format('LL')}</Card.Text>
                                        </div>
                                    )
                                })
                            }
                            <Button onClick={() => cambiarPagina("/Comunidades")} variant="outline-secondary">Volver</Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button onClick={() => cambiarPagina("/Miembro")} variant="secondary">Unirse a la Comunidad</Button>
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