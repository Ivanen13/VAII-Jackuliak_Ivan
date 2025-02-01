import "./Rewards.css"
import Window from "../components/Window";
import React, {useEffect, useState} from "react";


function Rewards() {
    const [isWindowOpen, setWindowOpen] = useState(false);
    const [data, setData] = useState({
        count: 0,
        description: '',
    });
    const [message, setMessage] = useState("")
    const [action, setAction] = useState('');
    const [selectedReward, setSelectedReward] = useState(null);
    const [formData, setFormData] = useState({ count: 0, description: '' });
    const [rewards, setRewards] = useState([]);

    function openWindow(action) {
        setAction(action)
        if (action === "edit") {
            setSelectedReward(null);
        }
        if (action === "add") {
            setFormData({ count: 0, description: '' });
        }
        setWindowOpen(true);
    }

    useEffect(() => {
        fetchRewards();
    }, []);

    const fetchRewards = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/api/getRewards', {
                method: 'GET',
                referrerPolicy: "no-referrer-when-downgrade",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setRewards(data);
            } else {
                console.error("Chyba pri načítaní odmien");
            }
        } catch (error) {
            console.error('Chyba pri načítavaní odmien:', error);
        }
    };


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



    async function editReward() {
        if (!selectedReward) return;
        try {
            const response = await fetch(`/api/rewards/${selectedReward.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                fetchRewards();
            }
        } catch (error) {
            console.error('Chyba pri úprave odmeny:', error);
        }
    }

    async function deleteReward() {
        if (!selectedReward) return;
        try {
            const response = await fetch(`/api/rewards/${selectedReward.id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchRewards();
            }
        } catch (error) {
            console.error('Chyba pri vymazávaní odmeny:', error);
        }
    }

    return(
        <div className="rewards-body">
            <button onClick={() => openWindow("add")}>Pridat Odmenu</button>
            <button onClick={() => openWindow("edit")}>Zmenit Odmenu</button>
            <button onClick={() => openWindow("delete")}>Vymazat Odmenu</button>
            <Window isOpen={isWindowOpen} onClose={() => setWindowOpen(false)}>
                {action === 'add' && (
                    <>
                        <h2>Pridat Odmenu</h2>
                        <form>
                            <div>
                                <label htmlFor="count">Pocet</label>
                                <input
                                    type="number"
                                    id="count"
                                    value={data.count}
                                    onChange={(e) =>
                                        setData({ ...data, count: Number(e.target.value) })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="description">Popis</label>
                                <input
                                    type="text"
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData({ ...data, description: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <button type="button" onClick={() => addReward()}>
                                Pridat Odmenu
                            </button>
                        </form>
                    </>
                )}
                {action === 'edit' && (
                    <>
                        <h2>Zmenit Odmenu</h2>
                        {selectedReward === null ? (
                            // Zoznam odmien na výber
                            <div>
                                <h3>Vyberte odmenu na úpravu:</h3>
                                <ul>
                                    {rewards.map((reward) => (
                                        <li key={reward.id}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    // Po výbere nastavíme vybranú odmenu a predvyplníme formulár
                                                    setSelectedReward(reward);
                                                    setFormData({ count: reward.count, description: reward.description });
                                                }}
                                            >
                                                {reward.description} (Počet: {reward.count})
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            // Formulár na úpravu odmeny
                            <form>
                                <div>
                                    <label htmlFor="count">Počet</label>
                                    <input
                                        type="number"
                                        id="count"
                                        value={formData.count}
                                        onChange={(e) =>
                                            setFormData({ ...formData, count: Number(e.target.value) })
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description">Popis</label>
                                    <input
                                        type="text"
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({ ...formData, description: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <button type="button" onClick={editReward}>
                                    Uložiť Zmeny
                                </button>
                            </form>
                        )}
                    </>
                )}
                {action === 'delete' && (
                    <>
                        <h2>Vymazat Odmenu</h2>
                        <form>
                            {/* Môžete napríklad pridať potvrdenie vymazania alebo výber odmeny */}
                            <button type="button" onClick={() => deleteReward()}>
                                Vymazat Odmenu
                            </button>
                        </form>
                    </>
                )}
            </Window>
        </div>
    )
}

export default Rewards;