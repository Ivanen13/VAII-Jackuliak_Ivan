import React from 'react';
import './Header.css';
import {Link, Routes} from 'react-router-dom';


const Header = () => {
    return (
        <header>
            <h1>Vyhrajte skvelé ceny!</h1>
            <nav>
                <ul>
                    <li><Link to="/prizeList">Ceny</Link></li>
                    <li><Link to="/login">Prihlasenie</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
