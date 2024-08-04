import React, { useState } from 'react';
import axios from 'axios';

const LikeButton = ({ petId }) => {
    const [liked, setLiked] = useState(false);
    const [error, setError] = useState('');

    const handleLike = async () => {
        try {
            await axios.patch(`https://backend-deploy-naod.onrender.com/api/pets/${petId}/like`);
            setLiked(true);
            setError(''); 
        } catch (error) {
            console.error('Failed to like pet', error);
            setError('Failed to like pet'); 
        }
    };

    return (
        <div>
            <button 
                onClick={handleLike} 
                disabled={liked} 
                className={`like-button ${liked ? 'liked' : ''}`}
            >
                {liked ? 'Liked' : 'Like'}
            </button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default LikeButton;
