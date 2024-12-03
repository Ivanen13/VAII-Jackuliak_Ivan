import React, {useState} from 'react';
import './Login.css';

function Update() {
    const [data, setData] = useState({
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email"),
        password: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Poziadavka:', data);
            const response = await fetch('http://127.0.0.1:8080/api/update', {
                method: 'POST',
                referrerPolicy: "no-referrer-when-downgrade",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.username,
                    email: localStorage.getItem("email"),
                    password: data.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccess('Meno zmenene uspesne');
                setData({
                    username: '',
                    password: ''
                });
                const { username, email } = data;
                localStorage.clear();
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);
                window.location.href = '/';
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Chyba pri zmene mena.');
            }
        } catch (error) {
            setError(error.message +'Chyba pri pripojení k serveru.');
        }
    };

    return (
        <div className="body">
            <div className="login">
                <h2>Zmena mena</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <div>
                        <label htmlFor="username">Zmen Užívateľské meno</label>
                        <input type="text"
                               id="username"
                               value={data.username}
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

                    <input type="submit" value="Zmeniť meno" />
                </form>
            </div>
        </div>

    );
}

export default Update;