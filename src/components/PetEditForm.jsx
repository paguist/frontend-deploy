import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PetForm/PetForm.css'; 

const PetEditForm = () => {
    const { id } = useParams(); 
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState(['', '', '']);
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const response = await axios.get('https://backend-deploy-naod.onrender.com/api'${id});
                const { name, type, description, skills } = response.data;
                setName(name);
                setType(type);
                setDescription(description);
                setSkills(skills);
            } catch (error) {
                setError('Failed to fetch pet');
            }
        };

        fetchPet();
    }, [id]);

    const handleUpdatePet = async (e) => {
        e.preventDefault();
        if (name.length < 3 || type.length < 3 || description.length < 3) {
            setError('Name, type, and description must be at least 3 characters long.');
            return;
        }

        try {
            await axios.put('https://backend-deploy-naod.onrender.com/api'${id}, { name, type, description, skills });
            navigate(`/pets/${id}`);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update pet');
        }
    };

    const handleSkillChange = (index, value) => {
        const newSkills = [...skills];
        newSkills[index] = value;
        setSkills(newSkills);
    };

    return (
        <div>
            <h1>Edit Pet</h1>
            <form onSubmit={handleUpdatePet}>
                <label>
                    Pet Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Pet Type:
                    <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
                </label>
                <label>
                    Pet Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <label>
                    Skills:
                    <input type="text" value={skills[0]} onChange={(e) => handleSkillChange(0, e.target.value)} />
                    <input type="text" value={skills[1]} onChange={(e) => handleSkillChange(1, e.target.value)} />
                    <input type="text" value={skills[2]} onChange={(e) => handleSkillChange(2, e.target.value)} />
                </label>
                <button type="submit">Update Pet</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default PetEditForm;
