import React, {useState} from 'react';
import './Login.css';

function Login() {
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Poziadavka:', data);
            const response = await fetch('http://127.0.0.1:8080/api/login', {
                method: 'POST',
                referrerPolicy: "no-referrer-when-downgrade",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('data:', data);

                setMessage('Prihlasenie bola úspešne!');
                setData({
                    email: '',
                    password: '',
                });
                const { username, email, money, token, admin } = data;
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);
                localStorage.setItem("money",money);
                localStorage.setItem("token", token);
                localStorage.setItem("admin", admin)
                window.location.href = '/';
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Chyba pri prihlaseni.');
            }
        } catch (error) {
            setMessage(error.message +'Chyba pri pripojení k serveru.');
        }
    };

    return (
        <div className="body">
            <div className="login">
                <h2>Prihlásenie</h2>
                <form onSubmit={handleSubmit}>
                    {message && <p>{message}</p>}
                    <div>
                        <label htmlFor="email">email</label>
                        <input type="email"
                               id="email"
                               value={data.email}
                               onChange={handleChange}
                               required />
                    </div>

                    <div>
                        <label htmlFor="password">Heslo</label>
                        <input type="password"
                               id="password"
                               value={data.password}
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