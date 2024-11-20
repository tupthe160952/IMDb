import React, { useState, useEffect } from 'react';
import { Movie } from "../../types/Interface";
import axios from 'axios';
import GenreDetail from '../../types/Interface';
import { Modal, Button, Form } from 'react-bootstrap';
const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [genres, setGenres] = useState<GenreDetail[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false); // State to control the modal visibility
    const [movieToDelete, setMovieToDelete] = useState<string | null>(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false); // Controls update modal visibility
    const [movieToUpdate, setMovieToUpdate] = useState<Movie | null>(null);
    useEffect(() => {
        const fetchMoviesAndGenres = async () => {
            try {
                const [moviesResponse, genresResponse] = await Promise.all([
                    axios.get('http://localhost:9999/movie'),
                    axios.get('http://localhost:9999/genres'),
                ]);
                setMovies(moviesResponse.data);
                setGenres(genresResponse.data);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
            }
        };
        fetchMoviesAndGenres();
    }, []);

    const deleteMovie = async (movieId: string) => {
        try {
            await axios.delete(`http://localhost:9999/movie/${movieId}`);
            setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
            setShowModal(false); // Close the modal after deletion
            alert('Movie deleted successfully!');
        } catch (err) {
            console.error('Error deleting movie:', err);
            alert('Failed to delete the movie. Please try again.');
        }
    };

    const handleDeleteClick = (movieId: string) => {
        setMovieToDelete(movieId);
        setShowModal(true); // Show the confirmation modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal without deleting
        setMovieToDelete(null); // Reset the movie ID to be deleted
    };

    const getGenreNames = (genreIds: number[]) => {
        return genreIds
            .map((id) => genres.find((genre) => genre.id === id)?.name || 'Unknown')
            .join(', ');
    };


    const handleUpdateClick = (movie: Movie) => {
        setMovieToUpdate(movie);
        setShowUpdateModal(true);
    };

    const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (movieToUpdate) {
            const { name, value } = e.target;

            setMovieToUpdate((prevMovie) => ({
                ...prevMovie!,
                [name]:
                    name === 'genres' && e.target instanceof HTMLSelectElement // Narrowing to HTMLSelectElement
                        ? Array.from(e.target.selectedOptions, (option) => Number(option.value))
                        : name === 'date'
                            ? formatDate(value)
                            : value,
            }));
        }
    };
    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const updateMovie = async () => {
        if (movieToUpdate) {
            try {
                await axios.put(`http://localhost:9999/movie/${movieToUpdate.id}`, movieToUpdate);
                setMovies((prevMovies) =>
                    prevMovies.map((movie) =>
                        movie.id === movieToUpdate.id ? movieToUpdate : movie
                    )
                );
                setShowUpdateModal(false);
                alert('Movie updated successfully!');
            } catch (err) {
                console.error('Error updating movie:', err);
                alert('Failed to update the movie. Please try again.');
            }
        }
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setMovieToUpdate(null);
    };
    const formatForInput = (dateStr: string): string => {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`;
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Movie List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!error && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Title</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Release Date</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Genres</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Delete</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Update</th>

                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie) => (
                            <tr key={movie.id}>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{movie.title}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{movie.date}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{getGenreNames(movie.genres)}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    <button
                                        onClick={() => handleDeleteClick(movie.id)}
                                        style={{ padding: '5px 10px', color: 'white', background: 'red', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button></td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}><button
                                    onClick={() => handleUpdateClick(movie)}
                                    style={{ marginRight: '5px', padding: '5px 10px', color: 'white', background: 'blue', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Update
                                </button></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* Modal Delete*/}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this movie?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => movieToDelete && deleteMovie(movieToDelete)}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Update*/}
            {movieToUpdate && (
                <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Movie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={movieToUpdate.title}
                                    onChange={handleUpdateChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Release Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={formatForInput(movieToUpdate.date)}
                                    onChange={handleUpdateChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Cast</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cast"
                                    value={movieToUpdate.cast.join(', ')}
                                    onChange={(e) =>
                                        setMovieToUpdate({
                                            ...movieToUpdate,
                                            cast: e.target.value.split(','),
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Genres</Form.Label>
                                <Form.Select
                                    name="genres"
                                    multiple
                                    value={movieToUpdate.genres.map(String)}
                                    onChange={handleUpdateChange}
                                >
                                    {genres.map((genre) => (
                                        <option key={genre.id} value={genre.id}>
                                            {genre.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            {/* Thumbnail */}
                            <Form.Group className="mb-3">
                                <Form.Label>Thumbnail URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="thumbnail"
                                    value={movieToUpdate.thumbnail}
                                    onChange={handleUpdateChange}
                                />
                                {movieToUpdate.thumbnail && (
                                    <img
                                        src={movieToUpdate.thumbnail}
                                        alt="Thumbnail preview"
                                        className="img-thumbnail mt-2"
                                        style={{ maxHeight: '150px' }}
                                    />
                                )}
                            </Form.Group>

                            {/* Banner */}
                            <Form.Group className="mb-3">
                                <Form.Label>Banner URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="banner"
                                    value={movieToUpdate.banner}
                                    onChange={handleUpdateChange}
                                />
                                {movieToUpdate.banner && (
                                    <img
                                        src={movieToUpdate.banner}
                                        alt="Banner preview"
                                        className="img-thumbnail mt-2"
                                        style={{ maxWidth: '100%', maxHeight: '150px' }}
                                    />
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Overview</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="overview"
                                    rows={3}
                                    value={movieToUpdate.overview}
                                    onChange={handleUpdateChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Trailer URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="trailer"
                                    value={movieToUpdate.trailer}
                                    onChange={handleUpdateChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUpdateModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={updateMovie}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

        </div>
    );
};

export default MovieList;
