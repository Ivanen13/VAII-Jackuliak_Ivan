import React from 'react';
import './Header.css';
import {Link, useLocation} from 'react-router-dom';


const Header = () => {
    const location = useLocation();
    return (
        <header>
            <h1>Vyhrajte skvelé ceny!</h1>
            <nav>
                <ul>
                    {location.pathname === '/prizeList' ? (
                        <li><Link to="/">Domov</Link></li>
                    ) : (
                        <li><Link to="/prizeList">Ceny</Link></li>
                    )}
                    {location.pathname === '/login' ? (
                        <li><Link to="/">Domov</Link></li>
                    ) : (
                        <li><Link to="/login">Prihlaseni</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
