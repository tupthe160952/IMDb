import React, { useEffect, useState } from 'react';
import { Celebs, GenreDetail, Movie, User } from '../../../types/Interface';


const Statistic: React.FC = () => {
    const [movieCount, setMovieCount] = useState<number>(0);
    const [celebCount, setCelebCount] = useState<number>(0);
    const [genreCount, setGenreCount] = useState<number>(0);
    const [userCount, setUserCount] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieResponse = await fetch('http://localhost:9999/movie');
                const movies: Movie[] = await movieResponse.json();
                setMovieCount(movies.length);

                const celebResponse = await fetch('http://localhost:9999/celebs');
                const celebs: Celebs[] = await celebResponse.json();
                setCelebCount(celebs.length);

                const genreResponse = await fetch('http://localhost:9999/genres');
                const genres: GenreDetail[] = await genreResponse.json();
                setGenreCount(genres.length);

                const userResponse = await fetch('http://localhost:9999/users');
                const user: User[] = await userResponse.json();
                setUserCount(user.length);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        fetchData();
    }, []); 


    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between">
                <div className="card border-left-primary shadow h-100 py-2 mx-2" style={{width: '335px', borderLeft: '7px solid #0d6efd'}}>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    <h5><strong>Movie</strong></h5>
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800"><h3>{movieCount}</h3></div>
                            </div>
                            <div className="col-auto">
                                <i className="bi bi-film" style={{fontSize: '40px'}}></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card border-left-success shadow h-100 py-2 mx-2" style={{width: '335px', borderLeft: '7px solid #19876f'}}>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                    <h5><strong>Celebrity</strong></h5>
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800"><h3>{celebCount}</h3></div>
                            </div>
                            <div className="col-auto">
                            <i className="bi bi-person-video2" style={{fontSize: '40px'}}></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card border-left-info shadow h-100 py-2 mx-2" style={{width: '335px', borderLeft: '7px solid #0dcaf0'}}>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                    <h5><strong>Genres</strong></h5>
                                </div>
                                <div className="row no-gutters align-items-center">
                                    <div className="col-auto">
                                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800"><h3>{genreCount}</h3></div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-auto">
                            <i className="bi bi-camera-reels" style={{fontSize: '40px'}}></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card border-left-warning shadow h-100 py-2 mx-2" style={{width: '335px', borderLeft: '7px solid #ffc107'}}>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                    <h5><strong>User</strong></h5>
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800"><h3>{userCount}</h3></div>
                            </div>
                            <div className="col-auto">
                            <i className="bi bi-person" style={{fontSize: '40px'}}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Statistic;
