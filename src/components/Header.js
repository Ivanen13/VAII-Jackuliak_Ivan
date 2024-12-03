import React, {useState} from 'react';
import './Header.css';
import {Link, useLocation} from 'react-router-dom';
import Window from "./Window";


const Header = () => {
    const location = useLocation();
    const [showOptions, setShowOptions] = useState(false);
    const [isWindowOpen, setWindowOpen] = useState(false);
    const handleLogout = () => {
        localStorage.clear()
        window.location.href = '/';
    };

    const handleUpdate = () => {
        window.location.href = '/update';
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
    const handleWindowOpen = () => setWindowOpen(true);
    const handleWindowClose = () => setWindowOpen(false);

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
                    {location.pathname !== '/' ? (
                        <li><Link to="/">Domov</Link></li>
                    ) : (
                        localStorage.getItem('email') ? null : (
                            <li><Link to="/login">Prihlásenie</Link></li>
                        )
                    )}
                    {localStorage.getItem('email') && (
                        <li  onMouseEnter={handleMouseEnter}
                             onMouseLeave={handleMouseLeave}>
                            <li>{localStorage.getItem('username')}</li>
                            {showOptions && (
                                <ul className="options">
                                    <li><button onClick={handleLogout}>Odhlásiť sa</button></li>
                                    <li onClick={handleUpdate}><button>Zmeniť Meno</button></li>
                                    <li><button onClick={handleWindowOpen}>Vymazať účet</button></li>
                                </ul>
                            )}
                        </li>
                    )}
                </ul>
            </nav>
            {isWindowOpen && (
                <Window isOpen={isWindowOpen} onClose={() => setWindowOpen(false)}>
                    <h2>Vymazať účet</h2>
                    <p>Si si istý, že chceš vymazať svoj účet?</p>
                    <button onClick={() => {
                        handleDelete();
                        setWindowOpen(false);
                    }}> Áno, vymazať
                    </button>
                    <button onClick={handleWindowClose}>Zrušiť</button>
                </Window>
            )}
        </header>
    );
};

export default Header;
