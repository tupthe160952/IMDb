import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Navbar from '../../components/Admin/Navbar';
import Header from '../../components/Header';
import '../../styles/CelebListAdmin.css';
import Celebs from '../../types/Interface'; // Ensure that this matches your types file

const ListCeleb: React.FC = () => {
    const [celebs, setCelebs] = useState<Celebs[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedCeleb, setSelectedCeleb] = useState<Celebs | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [actionType, setActionType] = useState<'delete' | 'update' | null>(null);
    const [updatedCeleb, setUpdatedCeleb] = useState<Celebs | null>(null);

    useEffect(() => {
        axios
            .get('http://localhost:9999/celebs')
            .then((response) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const data = response.data.map((celeb: any) => ({
                    ...celeb,
                    id: Number(celeb.id), // Convert id to number
                }));
                setCelebs(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (celeb: Celebs) => {
        setSelectedCeleb(celeb);
        setActionType('delete');
        setShowModal(true);
    };

    const handleUpdate = (celeb: Celebs) => {
        setSelectedCeleb(celeb);
        setActionType('update');
        setUpdatedCeleb({ ...celeb }); // Make a copy of the selected celeb to modify
        setShowModal(true);
    };

    const confirmAction = async () => {
        if (actionType === 'delete' && selectedCeleb) {
            try {
                await axios.delete(`http://localhost:9999/celebs/${selectedCeleb.id}`);
                setCelebs(celebs.filter((celeb) => celeb.id !== selectedCeleb.id));
            } catch (error) {
                console.error('Error deleting celeb:', error);
                alert('Failed to delete the celebrity. Please try again.');
            }
        } else if (actionType === 'update' && updatedCeleb) {
            try {
                // Send PUT/PATCH request to the server with the updated celeb data
                await axios.put(`http://localhost:9999/celebs/${updatedCeleb.id}`, updatedCeleb);
                setCelebs((prev) =>
                    prev.map((celeb) => (celeb.id === updatedCeleb.id ? updatedCeleb : celeb))
                );
            } catch (error) {
                console.error('Error updating celeb:', error);
                alert('Failed to update the celebrity. Please try again.');
            }
        }

        setShowModal(false);
        setSelectedCeleb(null);
        setActionType(null);
        setUpdatedCeleb(null); // Clear updated celeb data after action
    };

    const cancelAction = () => {
        setShowModal(false);
        setSelectedCeleb(null);
        setActionType(null);
        setUpdatedCeleb(null); // Clear updated celeb data
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (updatedCeleb) {
            setUpdatedCeleb({
                ...updatedCeleb,
                [e.target.name]: e.target.value,
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container" style={{ padding: '20px' }}>
            <div>
                <Header />
            </div>
            <div className="navbar-container">
                <Navbar />
            </div>
            <div className="celeb-list-container" style={{ marginTop: '40px' }}>
                <h1 className="my-4">Celebrities List</h1>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Image</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Department</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Gender</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Birthday</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px', width: '20%' }}>Place of Birth</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Delete</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {celebs.map((celeb) => (
                            <tr key={celeb.id}>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    <img
                                        src={celeb.profile_path}
                                        alt={celeb.name}
                                        style={{ width: '50px', height: '75px' }}
                                    />
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{celeb.name}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{celeb.known_for_department}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{celeb.genders}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{celeb.birthday}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px', width: '20%' }}>{celeb.place_of_birth}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    <Button variant="danger" onClick={() => handleDelete(celeb)}>
                                        Delete
                                    </Button>
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    <Button
                                        variant="warning"
                                        className="me-2"
                                        onClick={() => handleUpdate(celeb)}
                                    >
                                        Update
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal show={showModal} onHide={cancelAction}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {actionType === 'delete' ? 'Confirm Deletion' : 'Confirm Update'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {actionType === 'update' ? (
                            <>
                                <Form>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter celebrity name"
                                            name="name"
                                            value={updatedCeleb?.name || ''}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formKnownFor">
                                        <Form.Label>Known For</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter department"
                                            name="known_for_department"
                                            value={updatedCeleb?.known_for_department || ''}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formGender">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter gender"
                                            name="genders"
                                            value={updatedCeleb?.genders || ''}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formProfilePath">
                                        <Form.Label>Profile Image URL</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter profile image URL"
                                            name="profile_path"
                                            value={updatedCeleb?.profile_path || ''}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBiography">
                                        <Form.Label>Biography</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Enter biography"
                                            name="biography"
                                            value={updatedCeleb?.biography || ''}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBirthday">
                                        <Form.Label>Birthday</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="birthday"
                                            value={updatedCeleb?.birthday || ''}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formPlaceOfBirth">
                                        <Form.Label>Place of Birth</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter place of birth"
                                            name="place_of_birth"
                                            value={updatedCeleb?.place_of_birth || ''}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Form>
                            </>
                        ) : (
                            <div>
                                Are you sure you want to{' '}
                                <strong>{actionType === 'delete' ? 'delete' : 'update'}</strong>{' '}
                                <strong>{selectedCeleb?.name}</strong>?
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cancelAction}>
                            Cancel
                        </Button>
                        <Button
                            variant={actionType === 'delete' ? 'danger' : 'warning'}
                            onClick={confirmAction}
                        >
                            {actionType === 'delete' ? 'Delete' : 'Update'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default ListCeleb;