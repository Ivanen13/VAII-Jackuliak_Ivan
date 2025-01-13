import React, {useEffect, useState} from "react";
import "./WheelOfFortune.css";
import image from "../images/Wheel_Of_Fortune.png";
import marker from "../images/marker.png";
import Windows from "../components/Window";

const WheelOfFortune = () => {
    const [result, setResult] = useState(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [angle, setAngle] = useState(0);
    const [inputValue, setInputValue] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenGame, setIsOpenGame] = useState(false);
    const [game, setGame] = useState(false);
    const [information, setInformation] = useState(false);

    function openWindow() {
        setIsOpen(true);
    }

    useEffect(() => {
        setInformation(true);
    }, []);

    const handleInputChange = (e) => {
        const money = e.target.value;

        if (!/^\d+$/.test(money)) {
            alert("Hodnota musí byť číslo.");
            setInputValue(0);
            return;
        }
        setInputValue(e.target.value);
    };

    const verifyValue = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8080/api/money", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    "code": 2,
                },
                body: JSON.stringify({
                    email: localStorage.getItem("email"),
                    money: inputValue,})
            })
                .then((response) => response.json())
                .then((data) => {
                    console.info(data.money)
                    if(data.money) {
                        handleSpin();
                        setIsOpen(false);
                    } else
                        alert("Nemozes stavit vacsiu hodnotu ako mas")
                })
        } catch (error) {
            console.error("Chyba pri overení:", error);
        }
    };

    const handleSpin = async () => {
        try {
            setIsSpinning(true);
            console.log("isSpinning:", isSpinning);
            const response = await fetch("http://127.0.0.1:8080/api/wheel/spin");
            const data = await response.json();
            console.info(data);
            const money = parseInt(localStorage.getItem("money"));
            localStorage.setItem("money", data[1]);

            if(money < parseInt(localStorage.getItem("money"))) {
                setGame( true);
            } else
                setGame( false);

            const segmentAngle = 360 / 8;

            const newAngle = -1 * ((data[0] * segmentAngle) - 45);

            setAngle(newAngle);

        } catch (error) {
            console.error("Chyba pri volaní API:", error);
        } finally {
            setTimeout(() => setIsSpinning(false), 4000);
            setTimeout(() => setIsOpenGame(true),4000);
        }
    };

    function end() {
        window.location.reload();
        setIsOpenGame(false)
    }

    return (
        <div className="wheel-container">
            <img className={`wheel ${isSpinning ? "spinning" : ""}`}
                 src={image} alt=" Wheel of Fortune"  style={{
                transform: `rotate(${angle}deg)`
            }}>
            </img>
            <img className="marker" src={marker}/>
            <button className="button" onClick={openWindow} disabled={isSpinning}
                 >
                {isSpinning ? "Točím..." : "Zatoč koleso"}
            </button>
            <Windows isOpen={isOpen}>
                <h2>Select an Option</h2>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type something..."
                />
                <button onClick={() => verifyValue()}>Option 2</button>
            </Windows>
            {result && <div className="result">Výsledok: {result}</div>}
            <Windows isOpen={isOpenGame}>
                <h2>{game ? "Vyhral si" : "Prehral si"}</h2>
                <button onClick={() => end()}>Skusit znovu</button>
            </Windows>
            <Windows isOpen={information}>
                <h1>{"Pravidla hry"}</h1>
                <h3 style={{color: "green"}}>Zelena  = vyhra</h3>
                <h3 style={{color: "yellow"}}>Zlta = remiza</h3>
                <h3 style={{color: "red"}}>Cervena = prehra</h3>
                <button onClick={() => setInformation(false)}>OK</button>
            </Windows>
        </div>
    );
};

export default WheelOfFortune;