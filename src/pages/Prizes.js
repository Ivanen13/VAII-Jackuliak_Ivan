import React from 'react';
import "./Prizes.css"

function Prize({ img, title, description }) {
    return (
        <div>
            <img src={img} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}

export default Prize;
