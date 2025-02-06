import React, { useState } from 'react';
import './File.css'; // Import CSS súboru

function File() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) {
            setMessage("Vyberte súbor na nahratie.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        fetch("http://localhost:8080/api/upload", {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(result => setMessage(result))
            .catch(error => setMessage("Chyba pri nahrávaní: " + error));
    };

    return (
        <div className="file-upload-wrapper">
            <div className="file-container">
                <h2>Nahrať súbor</h2>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Nahrať</button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default File;