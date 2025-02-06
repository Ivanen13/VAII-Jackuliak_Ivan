import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Main';
import Login from './user/Login';
import Prize from './components/PrizeList';
import Registration from "./user/Registration";
import Update from "./user/Update";
import SlotMachine from "./pages/SlotMachine";
import WheelOfFortune from "./pages/WheelOfFortune";
import Card from "./pages/Card";
import Rewards from "./user/Rewards";
import File from "./pages/File";


const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/prizeList" element={<Prize/>} />
            <Route path="/registration" element={<Registration/>}></Route>
            <Route path="/update" element={<Update/>}></Route>
            <Route path="/slotMachine" element={<SlotMachine/>}></Route>
            <Route path="/wheelOfFortune" element={<WheelOfFortune/>}></Route>
            <Route path="/card" element={<Card/>}></Route>
            <Route path="/rewards" element={<Rewards/>}></Route>
            <Route path="/file" element={<File></File>}></Route>
        </Routes>
    );
};

export default Routers;