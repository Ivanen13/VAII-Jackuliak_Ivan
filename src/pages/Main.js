import React, {useState} from 'react';
import './Main.css';
import { useNavigate } from 'react-router-dom';
import Windows from "../components/Window";

const Main = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleRedirect = () => {
        navigate('/registration');
        navigate('/slotMachine');
        navigate('/wheelOfFortune')
        navigate('/card')
    };

    function openWindow() {
        if (localStorage.getItem("email") == null)
            navigate('/registration');
        else
            setIsOpen(true);
    }
    const closeWindow = () => setIsOpen(false);

    return (
        <main>
            <div className="iframe">
                <iframe
                    src="https://giphy.com/embed/2YHdXovMSv1NtO6V4n"
                    title="Title"
                    allowFullScreen
                ></iframe>
            </div>

            <div className="containerMain">
                <button className="button" onClick={openWindow}>Chcem hrať</button>
                <Windows isOpen={isOpen} onClose={closeWindow}>
                    <h2>Vyber si hru</h2>
                    <button onClick={() => navigate('/slotMachine')}>slot Machine</button>
                    <button onClick={() =>  navigate('/wheelOfFortune')}>wheel Of Fortune</button>
                    <button onClick={() => navigate('/card')}>Black Jack</button>
                </Windows>
            </div>
        </main>
    );
};

export default Main;