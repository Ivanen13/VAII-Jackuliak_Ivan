import React, { useState, useEffect } from "react";
import SlotColumn from "../components/SlotColumn";
import "./SlotMachine.css";
import axios from "axios";
import Windows from "../components/Window";

const SlotMachine = () => {
    const [columns, setColumns] = useState([]);
    const [symbols, setSymbols] = useState([]);
    const [isSpinning, setIsSpinning] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(0);
    const [isOpenGame, setIsOpenGame] = useState(false);
    const [game, setGame] = useState(false);
    const [information, setInformation] = useState(false);

    const handleInputChange = (e) => {
        const money = e.target.value;

        if (!/^\d+$/.test(money)) {
            alert("Hodnota musí byť číslo.");
            setInputValue(0);
            return;
        }
        setInputValue(e.target.value);
    };

    useEffect(() => {
        setInformation(true);
    }, []);

    const verifyValue = async () => {
        setIsOpen(false);
        try {
            const response = await fetch("http://127.0.0.1:8080/api/money", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    "code": 1,
                },
                body: JSON.stringify({
                    email: localStorage.getItem("email"),
                    money: inputValue,})
            })
                .then((response) => response.json())
                .then((data) => {
                    console.info(data.money)
                    if(data.money) {
                        spinAll();
                    } else
                    alert("Nemozes stavit vacsiu hodnotu ako mas")
                })
        } catch (error) {
            console.error("Chyba pri overení:", error);
        }
    };

    function openWindow() {
        setIsOpen(true);
    }

    useEffect(() => {
        const fetchSymbols = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8080/api/symbols");
                setSymbols(response.data);
                setColumns(Array(3).fill([response.data[0], response.data[1], response.data[2]]));
            } catch (error) {
                console.error("Chyba do rity:", error);
            }
        };

        fetchSymbols();
    }, []);

    const spinAll = async () => {
        if (symbols.length === 0) return;
        setIsSpinning(true);

        const spinIntervals = [];
        const updatedColumns = Array(3).fill([]);
        const spinSpeed = 150;

        for (let i = 0; i < updatedColumns.length; i++) {
            spinIntervals[i] = setInterval(() => {
                updatedColumns[i] = [
                    symbols[(Math.floor(Math.random() * symbols.length)) % symbols.length],
                    symbols[(Math.floor(Math.random() * symbols.length)) % symbols.length],
                    symbols[(Math.floor(Math.random() * symbols.length)) % symbols.length],
                ];
                setColumns([...updatedColumns]);
            }, spinSpeed);
        }

        try {
            const response = await axios.post("http://127.0.0.1:8080/api/spin", { columns: 3 });
            const { columns, spinDurations, money } = response.data;
            console.log(response.data);

            const playerMoney = money;
            const localMoney = parseInt(localStorage.getItem("money") || "0", 10);
            const newMoney = localMoney + playerMoney;
            localStorage.setItem("money", newMoney);
            if(money >= 0) {
                setGame( true);
            } else
                setGame( false);
            setIsOpen(true);

            for (let i = 0; i < spinIntervals.length; i++) {
                setTimeout(() => {
                    const targetSymbol = columns[i];
                    clearInterval(spinIntervals[i]);

                    const stopSpin = setInterval(() => {
                        updatedColumns[i] = [
                            symbols[(Math.floor(Math.random() * symbols.length)) % symbols.length],
                            targetSymbol,
                            symbols[(Math.floor(Math.random() * symbols.length)) % symbols.length],
                        ];
                        setColumns([...updatedColumns]);

                        if (updatedColumns[i][1] === targetSymbol) {
                            clearInterval(stopSpin);

                            if (i === spinIntervals.length - 1) {
                                setIsSpinning(false);
                                setIsOpenGame(true);
                            }
                        }
                    }, spinSpeed);
                }, spinDurations[i]);
            }
        } catch (error) {
            console.error("Chyba pri volaní spin API:", error);
            setIsSpinning(false);
            spinIntervals.forEach(clearInterval);
        }
    };

    function end() {
        window.location.reload();
        setIsOpenGame(false)
    }

    return (
        <div className="slot-machine">
            <div className="columns">
                {columns.length > 0 &&
                    columns.map((columnSymbols, index) => (
                        <SlotColumn key={index} symbols={columnSymbols} />
                    ))}
            </div>
            <button onClick={() => setIsOpen(true)} disabled={isSpinning}>
                {isSpinning ? "Točím..." : "Skúsiť šťastie"}
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
            <Windows isOpen={isOpenGame}>
                <h2>{game ? "Vyhral si" : "Prehral si"}</h2>
                <button onClick={() => end()}>Skusit znovu</button>
            </Windows>
            <Windows isOpen={information}>
                <h1>{"Pravidla hry"}</h1>
                <h3 style={{color: "green"}}>3 Rovnake znaky = vyhra</h3>
                <h3 style={{color: "yellow"}}>2 Rovnake znaky = remiza</h3>
                <h3 style={{color: "red"}}>1 Rovnake znaky = prehra</h3>
                <button onClick={() => setInformation(false)}>OK</button>
            </Windows>
        </div>
    );
};

export default SlotMachine;