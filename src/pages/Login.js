import React, {useState} from 'react';
import './Login.css';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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

        try {
            console.log('Poziadavka:', formData);
            const response = await fetch('http://127.0.0.1:8080/api/login', {
                method: 'POST',
                referrerPolicy: "same-origin",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('data:', data);

                setSuccess('Prihlasenie bola úspešne!');
                setFormData({
                    email: '',
                    password: '',
                });
                const { username, email } = data;
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);
                window.location.href = '/';
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Chyba pri prihlaseni.');
            }
        } catch (error) {
            setError(error.message +'Chyba pri pripojení k serveru.');
        }
    };

    return (
        <div className="body">
            <div className="login">
                <h2>Prihlásenie</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <div>
                        <label htmlFor="email">email</label>
                        <input type="email"
                               id="email"
                               value={formData.email}
                               onChange={handleChange}
                               required />
                    </div>

                    <div>
                        <label htmlFor="password">Heslo</label>
                        <input type="password"
                               id="password"
                               value={formData.password}
                               onChange={handleChange}
                               required />
                    </div>
                    <input type="submit" value="Prihlásiť sa" />
                </form>
            </div>
        </div>
    );
}

export default Login;