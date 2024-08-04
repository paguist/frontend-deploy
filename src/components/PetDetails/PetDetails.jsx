import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PetDetails.css';

const PetDetails = () => {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/pets/${id}`);
                setPet(response.data);
            } catch (error) {
                setError('Failed to fetch pet');
            }
        };

        fetchPet();
    }, [id]);

    const handleAdoptPet = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/pets/${id}`);
            navigate('/');
        } catch (error) {
            setError('Failed to adopt pet');
        }
    };

    const handleLikePet = async () => {
        try {
            const response = await axios.patch(`http://localhost:8080/api/pets/${id}/like`);
            setPet(response.data);
        } catch (error) {
            setError('Failed to like pet');
        }
    };

    if (!pet) return <div>Loading...</div>;

    return (
        <div>
            <h1>Pet Details</h1>
            <p>Name: {pet.name}</p>
            <p>Type: {pet.type}</p>
            <p>Description: {pet.description}</p>
            <p>Skills: {pet.skills ? pet.skills.join(', ') : 'No skills available'}</p>
            <button onClick={handleAdoptPet}>Adopt Pet</button>
            <button onClick={handleLikePet} disabled={!pet.likes}>Like ({pet.likes || 0})</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default PetDetails;


