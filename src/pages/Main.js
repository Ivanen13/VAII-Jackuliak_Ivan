import React from 'react';
import './Main.css';

const Main = () => {
    return (
        <main>
            <div className="iframe">
                <iframe
                    src="https://giphy.com/embed/2YHdXovMSv1NtO6V4n"
                    title="Giphy Embed"
                    allowFullScreen
                ></iframe>
            </div>

            <div className="button">
                <button>Chcem hrať</button>
            </div>
        </main>
    );
};

export default Main;