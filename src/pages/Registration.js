import React, {useState} from 'react';
import './Login.css';

function Registration() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Heslá sa nezhodujú!');
            return;
        }

        try {
            console.log('Poziadavka:', formData);
            const response = await fetch('http://127.0.0.1:8080/api/register', {
                method: 'POST',
                referrerPolicy: "no-referrer-when-downgrade",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                setSuccess('Registrácia bola úspešná!');
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Chyba pri registrácii.');
            }
        } catch (error) {
            setError(error.message +'Chyba pri pripojení k serveru.');
        }
    };

    return (
        <div className="body">
            <div className="login">
                <h2>Registracia</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <div>
                        <label htmlFor="username">Užívateľské meno</label>
                        <input type="text"
                               id="username"
                               value={formData.username}
                               onChange={handleChange}
                               required />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input  type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required />
                    </div>

                    <div>
                        <label htmlFor="password">Heslo</label>
                        <input  type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">Zopakuj heslo</label>
                        <input type="password"
                               id="confirmPassword"
                               value={formData.confirmPassword}
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