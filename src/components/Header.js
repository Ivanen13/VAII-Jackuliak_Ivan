import React, {useState} from 'react';
import './Header.css';
import {Link, useLocation} from 'react-router-dom';
import Window from "./Window";


const Header = () => {
    const location = useLocation();
    const [showOptions, setShowOptions] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const handleLogout = () => {
        localStorage.clear()
        window.location.href = '/';
    };

    const handleDelete = async () => {
        try {
            const email = localStorage.getItem('email');
            const response = await fetch('http://127.0.0.1:8080/api/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.clear()
                alert(data.message);
            } else {
                alert(data.message || 'Chyba pri mazaní používateľa.');
            }
        } catch (error) {
            console.error('Chyba pripojenia k serveru:', error);
        }
    };

    const handleMouseEnter = () => setShowOptions(true);
    const handleMouseLeave = () => setShowOptions(false);
    const handleWindowOpen = () => setModalOpen(true);
    const handleWindowClose = () => setModalOpen(false);

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
                        <li><Link to="/login">Prihlasenie</Link></li>
                    )}
                    {localStorage.getItem('email') && (
                        <li  onMouseEnter={handleMouseEnter}
                             onMouseLeave={handleMouseLeave}>
                            <li>{localStorage.getItem('username')}</li>
                            {showOptions && (
                                <ul className="user-options">
                                    <li><button onClick={handleLogout}>Odhlásiť sa</button></li>
                                    <li><button>Zmeniť údaje</button></li>
                                    <li><button onClick={handleWindowOpen}>Vymazať účet</button></li>
                                </ul>
                            )}
                        </li>
                    )}
                </ul>
            </nav>
            {isModalOpen && (
                <Window isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                    <h2>Vymazať účet</h2>
                    <p>Si si istý, že chceš vymazať svoj účet?</p>
                    <button onClick={() => {
                        handleDelete();
                        setModalOpen(false);
                    }}>
                        Áno, vymazať
                    </button>
                    <button onClick={handleWindowClose}>Zrušiť</button>
                </Window>
            )}
        </header>
    );
};

export default Header;
