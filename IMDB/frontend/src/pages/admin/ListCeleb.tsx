import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Celebs from '../../types/Interface';
import { Button, Modal } from 'react-bootstrap';
const ListCeleb: React.FC = () => {
    const [celebs, setCelebs] = useState<Celebs[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedCeleb, setSelectedCeleb] = useState<Celebs | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [actionType, setActionType] = useState<'delete' | 'update' | null>(null);
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
        setShowModal(true);
    };

    const confirmAction = async () => {
        if (actionType === 'delete' && selectedCeleb) {
            try {
                // Send DELETE request to the server
                await axios.delete(`http://localhost:9999/celebs/${selectedCeleb.id}`);
                setCelebs(celebs.filter((celeb) => celeb.id !== selectedCeleb.id));
            } catch (error) {
                console.error('Error deleting celeb:', error);
                alert('Failed to delete the celebrity. Please try again.');
            }
        } else if (actionType === 'update' && selectedCeleb) {
            try {
                // Send PUT/PATCH request to the server (mocking the update here)
                const updatedCeleb = { ...selectedCeleb, name: `${selectedCeleb.name} Updated` }; // Example update
                await axios.put(`http://localhost:9999/celebs/${selectedCeleb.id}`, updatedCeleb);
                setCelebs((prev) =>
                    prev.map((celeb) => (celeb.id === selectedCeleb.id ? updatedCeleb : celeb))
                );
            } catch (error) {
                console.error('Error updating celeb:', error);
                alert('Failed to update the celebrity. Please try again.');
            }
        }

        setShowModal(false);
        setSelectedCeleb(null);
        setActionType(null);
    };

    const cancelAction = () => {
        setShowModal(false);
        setSelectedCeleb(null);
        setActionType(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container" style={{ padding: '20px' }}>
            <h1 className="my-4">Celebrities List</h1>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead >
                    <tr>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Image</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Department</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Gender</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Birthday</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px', width: "20%" }}>Place of Birth</th>
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
                            <td style={{ border: '1px solid #ccc', padding: '8px', width: "20%" }}>{celeb.place_of_birth}</td>
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
                    Are you sure you want to{' '}
                    <strong>{actionType === 'delete' ? 'delete' : 'update'}</strong>{' '}
                    <strong>{selectedCeleb?.name}</strong>?
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
    );
};

export default ListCeleb;