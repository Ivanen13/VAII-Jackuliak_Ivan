import React from 'react';
import './Login.css';


function Login() {
    return (
        <div className="body">
            <div className="login">
                <h2>Prihlásenie</h2>
                <form action="#" method="post">
                    <div>
                        <label htmlFor="username">Užívateľské meno</label>
                        <input type="text" id="username" required />
                    </div>

                    <div>
                        <label htmlFor="password">Heslo</label>
                        <input type="password" id="password" required />
                    </div>
                    <input type="submit" value="Prihlásiť sa" />
                </form>
            </div>
        </div>

    );
}

export default Login;