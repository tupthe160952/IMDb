import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeaderTrailer from '../components/HeaderTrailer';
import PopularMovie from '../components/PopularMovie';
import TopMovie from '../components/TopMovie';
import Trailer from '../components/Trailer';
import TrailerDetail from '../components/TrailerDetail';

const MovieDetail: React.FC = () => {
    return (
        <div style={{backgroundColor: '#121212', marginTop: '70px'}}>
            <Header />
            <div style={{ width: '81%', margin: '0 auto' }}>
                <HeaderTrailer />
                <Trailer />
                <TrailerDetail />
            </div>
            <PopularMovie />
            <TopMovie />
            <Footer />
        </div>

    );
};

export default MovieDetail;
