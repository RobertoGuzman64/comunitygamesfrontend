import React, { } from 'react';
import './Home.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';


const Home = () => {
    return (
        <div className='paginaHome'>
            <Header />
            <div className='contenidoHome'>
                <div className='izquierdaHome'></div>
                <div className='gifHome'></div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;