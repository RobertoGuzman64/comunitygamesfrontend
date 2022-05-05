import React, { useState, useEffect } from 'react';
import './Home.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';


const Home = () => {
    return (
        <div className='paginaHome'>
            <Header />

            <Footer />
        </div>
    )
}


export default Home;