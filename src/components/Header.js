import React, {useState} from 'react';
import './Header.css';
import {Link, useLocation} from 'react-router-dom';


const Header = () => {
    const location = useLocation();
    const [showOptions, setShowOptions] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        window.location.href = '/';
    };

    const handleMouseEnter = () => setShowOptions(true); // Zobraziť možnosti
    const handleMouseLeave = () => setShowOptions(false); // Skryť možnosti

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
                    {localStorage.getItem('email') && (
                        <li  onMouseEnter={handleMouseEnter}
                             onMouseLeave={handleMouseLeave}>
                            <li>{localStorage.getItem('username')}</li>

                            {showOptions && (
                                <ul className="user-options">
                                    <li><button onClick={handleLogout}>Odhlásiť sa</button></li>
                                    <li><button>Zmeniť údaje</button></li>
                                    <li><button>Vymazať účet</button></li>
                                </ul>
                            )}
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
