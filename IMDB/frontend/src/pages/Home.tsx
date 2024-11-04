import React from 'react';
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import '../styles/Home.css';

const Home: React.FC = () => {
    return (
        <div className='home'>
            <Header />
            <Card />
            <Footer />
        </div>
    );
};

export default Home;
