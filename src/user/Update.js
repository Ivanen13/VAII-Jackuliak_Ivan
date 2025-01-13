import React, {useState} from 'react';
import './Login.css';
import Windows from "../components/Window";

function Update() {
    const [data, setData] = useState({
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email"),
        password: ''
    });

    const [message, setMessage] = useState('');
    const [isOpen,setIsOpen] = useState(false);

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
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    username: data.username,
                    email: localStorage.getItem("email"),
                    password: data.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage('Meno zmenene uspesne');
                setData({
                    username: '',
                    password: ''
                });
                const { username, email, token } = data;
                localStorage.clear();
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);
                localStorage.setItem("token", token);
                window.location.href = '/';
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Chyba pri zmene mena.');
                setIsOpen(true);
            }
        } catch (error) {
            setMessage(error.message +'Chyba pri pripojení k serveru.');
            setIsOpen(true);
        }
    };

    return (
        <div className="body">
            <div className="login">
                <h2>Zmena mena</h2>
                <form onSubmit={handleSubmit}>
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
            <Windows isOpen={isOpen}>
                <h2>{message}</h2>
                <button onClick={() => setIsOpen(false)}>OK</button>
            </Windows>
        </div>

    );
}

export default Update;