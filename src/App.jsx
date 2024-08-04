import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PetList from './components/PetList/PetList';
import PetForm from './components/PetForm/PetForm';
import PetDetails from './components/PetDetails/PetDetails';
import PetEditForm from './components/PetEditForm';
import './App.css';

const App = () => {
    return (
            <Routes>
                <Route path="/" element={<PetList />} />
                <Route path="/pets/new" element={<PetForm />} />
                <Route path="/pets/:id" element={<PetDetails />} />
                <Route path="/pets/:id/edit" element={<PetEditForm />} />
            </Routes>
    );
};

export default App;
