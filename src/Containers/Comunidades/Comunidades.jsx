import React, { useState, useEffect } from 'react';
import './Comunidades.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Comunidades = () => {
    return (
        <div className='paginaComunidades'>
            <Header />
            <div className="contenidoLogin">
                <Card style={{ width: '45rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Button variant="secondary">Ver Comunidad</Button>
                    </Card.Body>
                </Card>
            </div>
            <Footer />
        </div>
    )
}



















export default Comunidades;