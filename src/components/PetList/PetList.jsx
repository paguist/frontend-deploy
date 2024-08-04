import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import socket from '../../socket';
import './PetList.css'; 

const PetList = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get('https://backend-deploy-naod.onrender.com/api/pets');
                setPets(response.data);
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };

        fetchPets();

        socket.on('pet_adopted', (adoptedPet) => {
            setPets((prevPets) => prevPets.filter((pet) => pet._id !== adoptedPet._id));
        });

        return () => {
            socket.off('pet_adopted');
        };
    }, []);

    return (
        <div>
            <h1>Pet Shelter</h1>
            <Link to="/pets/new">Add a Pet</Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.length > 0 ? (
                        pets.map((pet) => (
                            <tr key={pet._id}>
                                <td>{pet.name}</td>
                                <td>{pet.type}</td>
                                <td>
                                    <Link to={`/pets/${pet._id}`}>Details</Link> | <Link to={`/pets/${pet._id}/edit`}>Edit</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No pets found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PetList;



