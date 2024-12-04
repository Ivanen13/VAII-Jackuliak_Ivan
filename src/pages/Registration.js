import React, {useState} from 'react';
import './Login.css';

function Registration() {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            setMessage('Heslá sa nezhodujú!');
            return;
        }

        try {
            console.log('Poziadavka:', data);
            const response = await fetch('http://127.0.0.1:8080/api/register', {
                method: 'POST',
                referrerPolicy: "no-referrer-when-downgrade",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                }),
            });

            if (response.ok) {
                setMessage('Registrácia bola úspešná!');
                setData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                window.location.href = '/login';
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Chyba pri registrácii.');
            }
        } catch (error) {
            setMessage(error.message +'Chyba pri pripojení k serveru.');
        }
    };

    return (
        <div className="body">
            <div className="login">
                <h2>Registracia</h2>
                <form onSubmit={handleSubmit}>
                    {message && <p>{message}</p>}
                    <div>
                        <label htmlFor="username">Užívateľské meno</label>
                        <input type="text"
                               id="username"
                               value={data.username}
                               onChange={handleChange}
                               required />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input  type="email"
                                id="email"
                                value={data.email}
                                onChange={handleChange}
                                required />
                    </div>

                    <div>
                        <label htmlFor="password">Heslo</label>
                        <input  type="password"
                                id="password"
                                value={data.password}
                                onChange={handleChange}
                                required />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">Zopakuj heslo</label>
                        <input type="password"
                               id="confirmPassword"
                               value={data.confirmPassword}
                               onChange={handleChange}
                               required />
                    </div>
                    <input type="submit" value="Registrovat sa" />
                </form>
            </div>
        </div>

    );
}

export default Registration;