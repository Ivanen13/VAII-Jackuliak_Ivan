import React from 'react';
import Prize from '../pages/Prizes';
import iphoneImage from '../images/Iphone6.jpg';
import intelImage from '../images/intel.jpg';
import gpuImage from '../images/ECr4080sp2.jpg';
import mouseImage from '../images/mys.jpg';
import "./PrizeList.css"

function PrizeList() {
    const prizes = [
        {
            img: iphoneImage,
            title: 'Iphone 16',
            description: 'Moderný mobil.',
        },
        {
            img: intelImage,
            title: 'Intel Core i9-14900K',
            description: 'Procesor 14. generácie.',
        },
        {
            img: gpuImage,
            title: 'ASUS ProArt GeForce RTX 4080 SUPER O16G',
            description: 'Grafická karta.',
        },
        {
            img: mouseImage,
            title: 'Razer Basilisk V3 Pro',
            description: 'Herná myš.',
        },
    ];

    return (
        <div className="prize">
            {prizes.map((prize, index) => (
                <Prize key={index} img={prize.img} title={prize.title} description={prize.description} />
            ))}
        </div>
    );
}

export default PrizeList;