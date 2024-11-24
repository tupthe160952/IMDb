import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

interface KnownFor {
  movie_name: string;
  movie_image: string;
}

interface Celebrity {
  id: string;
  known_for_department: string;
  name: string;
  original_name: string;
  genders: string;
  popularity: number;
  profile_path: string;
  biography: string;
  birthday: string;
  place_of_birth: string;
  known_for: KnownFor[];
}

const AddCelebrity: React.FC = () => {
  const [celebrity, setCelebrity] = useState<Celebrity>({
    id: '',
    known_for_department: '',
    name: '',
    original_name: '',
    genders: '',
    popularity: 0,
    profile_path: '',
    biography: '',
    birthday: '',
    place_of_birth: '',
    known_for: [], // Initialize as an empty array
  });

  const [newMovie, setNewMovie] = useState<KnownFor>({ movie_name: '', movie_image: '' });
  const [showAddMovie, setShowAddMovie] = useState(false); // State to toggle movie input visibility

  useEffect(() => {
    const generateId = () => Math.floor(Math.random() * 1000000).toString();
    setCelebrity((prevState) => ({
      ...prevState,
      id: generateId(),
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCelebrity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMovieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const addMovie = () => {
    setCelebrity((prevState) => ({
      ...prevState,
      known_for: [...prevState.known_for, newMovie], // Add the new movie to the known_for array
    }));
    setNewMovie({ movie_name: '', movie_image: '' }); // Reset the input fields
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9999/celebs', celebrity);
      alert('Celebrity added successfully!');
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error adding celebrity:', error);
      alert('Failed to add celebrity.');
    }
  };

  return (
    <Container className="mt-5">
      <div
        className="card mx-auto bg-white"
        style={{
          marginTop: '10px',
          marginBottom: '10px',
          padding: '15px',
          width: '80%',
          maxWidth: '50rem',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Add Celebrity Information</h2>
        <Form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
          <Row className="mb-3" style={{ display: 'none' }}>
            <Col>
              <Form.Label htmlFor="id">Celebrity ID</Form.Label>
              <Form.Control
                type="text"
                id="id"
                name="id"
                value={celebrity.id}
                onChange={handleChange}
                readOnly
              />
            </Col>
          </Row>

          {/* Other fields for celebrity details */}
          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="known_for_department">Known For Department</Form.Label>
              <Form.Control
                type="text"
                id="known_for_department"
                name="known_for_department"
                value={celebrity.known_for_department}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                value={celebrity.name}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="original_name">Original Name</Form.Label>
              <Form.Control
                type="text"
                id="original_name"
                name="original_name"
                value={celebrity.original_name}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="genders">Gender</Form.Label>
              <Form.Control
                type="text"
                id="genders"
                name="genders"
                value={celebrity.genders}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="popularity">Popularity</Form.Label>
              <Form.Control
                type="number"
                id="popularity"
                name="popularity"
                value={celebrity.popularity}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="profile_path">Profile Path</Form.Label>
              <Form.Control
                type="text"
                id="profile_path"
                name="profile_path"
                value={celebrity.profile_path}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="biography">Biography</Form.Label>
              <Form.Control
                type="text"
                id="biography"
                name="biography"
                value={celebrity.biography}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="birthday">Birthday</Form.Label>
              <Form.Control
                type="date"
                id="birthday"
                name="birthday"
                value={celebrity.birthday}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="place_of_birth">Place of Birth</Form.Label>
              <Form.Control
                type="text"
                id="place_of_birth"
                name="place_of_birth"
                value={celebrity.place_of_birth}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          {/* Collapsible Add Movie Section */}
          <h5 className="mt-4">Known For</h5>
          <Button
            variant="outline-primary"
            className="mb-3"
            onClick={() => setShowAddMovie((prev) => !prev)}
          >
            {showAddMovie ? 'Cancel Add Movie' : 'Add Movie'}
          </Button>
          {showAddMovie && (
            <Row className="mb-3">
              <Col>
                <Form.Label htmlFor="movie_name">Movie Name</Form.Label>
                <Form.Control
                  type="text"
                  id="movie_name"
                  name="movie_name"
                  value={newMovie.movie_name}
                  onChange={handleMovieChange}
                />
              </Col>
              <Col>
                <Form.Label htmlFor="movie_image">Movie Image</Form.Label>
                <Form.Control
                  type="text"
                  id="movie_image"
                  name="movie_image"
                  value={newMovie.movie_image}
                  onChange={handleMovieChange}
                />
              </Col>
              <Col xs={2} className="d-flex align-items-end">
                <Button variant="success" onClick={addMovie}>
                  Add
                </Button>
              </Col>
            </Row>
          )}

          <Row>
            <Col>
              <ul>
                {celebrity.known_for.map((movie, index) => (
                  <li key={index}>
                    <strong>{movie.movie_name}</strong> - {movie.movie_image}
                  </li>
                ))}
              </ul>
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Add Celebrity
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default AddCelebrity;