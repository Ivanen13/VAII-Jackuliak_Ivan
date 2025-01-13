import "../pages/Card.css";
import React, { useState, useEffect } from "react"
import Windows from "../components/Window";

function Card() {
    const [cards, setCards] = useState([]);
    const [targetValue, setTargetValue] = useState(null);
    const [value, setValue] = useState(0);
    const [game, setGame] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [information, setInformation] = useState(false);

    function addCard() {
        fetch('http://127.0.0.1:8080/api/cards/getCard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'code':3
            },
            body: JSON.stringify({ email: localStorage.getItem("email")})
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data=> {
                console.info(data);
                console.info(data.money);
                const newCard = {
                    id: cards.length + 1,
                    imageUrl: `/${data.card.path}.png`
                };
                console.info(newCard);
                setCards([...cards, newCard]);
                setValue(value + data.card.value);

                if(data.money != 0) {
                    const money = parseInt(localStorage.getItem("money"), 10);
                    localStorage.setItem("money",data.money)
                    if(money < parseInt(localStorage.getItem("money"), 10)) {
                        setGame( true);
                    } else
                        setGame( false);
                    setIsOpen(true);
                }

            })
            .catch(error => console.error('Error fetching card:', error));
    }

    async function deleteCard() {
        try {
            const response = await fetch('http://127.0.0.1:8080/api/cards/stop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'code':3
                },
                body: JSON.stringify({ email: localStorage.getItem("email")})
            })
            const money = parseInt(localStorage.getItem("money"));
            const data = await response.json();
            localStorage.setItem("money",data)
            if(money < parseInt(localStorage.getItem("money"))) {
                setGame( true);
            } else
                setGame( false);
            setIsOpen(true);
        }catch (error) {
            console.error("Chyba pri načítaní údajov zo servera:", error);
        }
    }

    useEffect(() => {
        setInformation(true);
        async function fetchGameData() {
            try {
                const response = await fetch("http://127.0.0.1:8080/api/cards/getNumber", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({email: localStorage.getItem("email")})
                });

                if (!response.ok) {
                    throw new Error(`HTTP chyba! Status: ${response.status}`);
                }
                const data = await response.json();
                setTargetValue(data);
            } catch (error) {
                console.error("Chyba pri načítaní údajov zo servera:", error);
            }
        }
        fetchGameData();
    }, []);

    function end() {
        setCards([]);
        window.location.reload();
        setIsOpen(false)
    }

    return(
        <div className="container">
            <div className="info">
                <p>Cieľová hodnota: {targetValue ?? "Načítava sa..."}</p>
                <p>Vaša hodnota: {value}</p>
            </div>
            <div className="deck">
                {cards.map((card) => (
                    <img key={card.id} src={card.imageUrl} alt={`Card ${card.id}`} />
                ))}
            </div>
            <div className="buttons">
                <button onClick={addCard}>Tahať</button>
                <button onClick={deleteCard}>Nechať</button>
            </div>
            <Windows isOpen={isOpen}>
                <h2>{game ? "Vyhral si" : "Prehral si"}</h2>
                <button onClick={() => end()}>Skusit znovu</button>
            </Windows>
            <Windows isOpen={information}>
                <h1>{"Pravidla hry"}</h1>
                <h3 style={{color: "green"}}>Za dosiahnutie cielovej hodnoty mas tolko isto bodov </h3>
                <h3 style={{color: "yellow"}}>Za dosiahnutie cielovej hodnoty -1 mas polovicny pocet bodov</h3>
                <h3 style={{color: "red"}}>Za dosiahnutie cielovej hodnoty -2 mas tretinovy pocet bodov</h3>
                <h3 style={{color: "black"}}>Inak stratis tolko kolko je cielova hodnota</h3>
                <button onClick={() => setInformation(false)}>OK</button>
            </Windows>
        </div>
    )
}


export default Card;