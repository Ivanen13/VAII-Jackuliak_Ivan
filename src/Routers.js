import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Main';
import Login from './pages/Login';
import Prize from './components/PrizeList';
import Registration from "./pages/Registration";
import Update from "./pages/Update";


const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/prizeList" element={<Prize/>} />
            <Route path="/registration" element={<Registration/>}></Route>
            <Route path="/update" element={<Update/>}></Route>
        </Routes>
    );
};

export default Routers;