import React from 'react';
import './Main.css';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/registration');
    };

    return (
        <main>
            <div className="iframe">
                <iframe
                    src="https://giphy.com/embed/2YHdXovMSv1NtO6V4n"
                    title="Title"
                    allowFullScreen
                ></iframe>
            </div>

            <div className="button">
                <button onClick={handleRedirect}>Chcem hrať</button>
            </div>
        </main>
    );
};

export default Main;