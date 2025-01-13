import React, {useState} from 'react';
import "./Prizes.css"
import Windows from "../components/Window";

function Prize({ img, title, description }) {
    const [isWindowOpen, setWindowOpen] = useState(false);

    async function buy(){
        setWindowOpen(false);
        try {
            const response = await fetch('http://127.0.0.1:8080/api/buy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: localStorage.getItem("email")} ),
            });
            const data = await response.json();
            if(data == 0) {
                alert("Zlyhanie");
            } else if(data == -1) {
                alert("Nemas dostatok bodov");
            } else {
                let number = parseInt(localStorage.getItem("money"));
                console.info(number);
                number += data;
                localStorage.setItem("money",number.toString());
                alert("Predmet kúpeny");
            }
        } catch (error) {
            console.error("Chyba pripojenia k serveru:", error);
        }
    }
    return (
        <div>
            <img onClick={() => setWindowOpen(true)} src={img} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
            <Windows isOpen={isWindowOpen}>
                <h2>Kupit {title} v hodnote 100 bodov?</h2>
                <button onClick={buy}>Kupit</button>
            </Windows>
        </div>
    );
}

export default Prize;
