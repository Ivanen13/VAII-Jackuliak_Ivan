import "./Rewards.css"
import Window from "../components/Window";
import React, {useState} from "react";


function Rewards() {
    const [isWindowOpen, setWindowOpen] = useState(false);
    const [data, setData] = useState({
        count: 0,
        description: '',
    });
    const [message, setMessage] = useState("")
    async function addReward() {
        console.log('Poziadavka:', data);
        try {
            console.log('Poziadavka:', data);
            const response = await fetch('http://127.0.0.1:8080/api/admin', {
                method: 'POST',
                referrerPolicy: "no-referrer-when-downgrade",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    count: data.count,
                    description: data.description,
                    email: localStorage.getItem("email")
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('data:', responseData);

                setMessage('Odmena bola vytvorena');
                setData({
                    count: '',
                    description: '',
                });
                const { username, email, money, token } = data;
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Chyba pri prihlaseni.');
                console.log(message)
            }
        } catch (error) {
            const errorMsg = error.message + ' Chyba pri pripojení k serveru.';
            setMessage(errorMsg);
            console.log(errorMsg)
        }
    }

    return(
        <div className="rewards-body">
            <button onClick={() => setWindowOpen(true)}>Pridat Odmenu</button>
            <button>Zmenit Odmenu</button>
            <button>Vymazat Odmenu</button>
            <Window isOpen={isWindowOpen} onClose={() => setWindowOpen(false)}>
                <h2>Pridat Odmenu</h2>
                <form>
                    <div>
                        <label htmlFor="count">Pocet</label>
                        <input type="number"
                               id="count"
                               value={data.count}
                               onChange={(e) => setData({ ...data, count: Number(e.target.value) })}
                               required />
                    </div>

                    <div>
                        <label htmlFor="text">Popis</label>
                        <input type="text"
                               id="description"
                               value={data.description}
                               onChange={(e) => setData({ ...data, description: e.target.value })}
                               required />
                    </div>
                    <button type="button" onClick={() =>addReward()}>Pridat Odmenu</button>
                </form>
            </Window>
        </div>
    )
}

export default Rewards;