import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Main';
import Login from './pages/Login';
import Prize from './components/PrizeList';


const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/prizeList" element={<Prize/>} />
        </Routes>
    );
};

export default Routers;