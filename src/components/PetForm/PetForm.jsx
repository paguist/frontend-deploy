import React, { useState } from 'react';
import axios from 'axios';
import './PetForm.css';

const PetForm = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState(['', '', '']);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.length < 3 || type.length < 3 || description.length < 3) {
            setError('Name, type, and description must be at least 3 characters long.');
            return;
        }

        try {
            await axios.post('https://backend-deploy-naod.onrender.com/api/pets', { name, type, description, skills });
            setName('');
            setType('');
            setDescription('');
            setSkills(['', '', '']);
            setError(''); 
        } catch (error) {
            setError('Failed to add pet');
        }
    };

    const handleSkillChange = (index, value) => {
        const newSkills = [...skills];
        newSkills[index] = value;
        setSkills(newSkills);
    };

    return (
        <div>
            <h1>Add Pet</h1>
            <form onSubmit={handleSubmit}>
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
                    <input type="text" value={skills[0]} onChange={(e) => handleSkillChange(0, e.target.value)} placeholder="Skill 1" />
                    <input type="text" value={skills[1]} onChange={(e) => handleSkillChange(1, e.target.value)} placeholder="Skill 2" />
                    <input type="text" value={skills[2]} onChange={(e) => handleSkillChange(2, e.target.value)} placeholder="Skill 3" />
                </label>
                <button type="submit">Add Pet</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default PetForm;


