import React, { useState, useEffect } from "react";
import "../pages/SlotMachine.css";
const SlotColumn = ({ symbols, isSpinning }) => {
    return (
        <div className="slot-column">
            <div className="symbol above">{symbols[0]}</div>
            <div className="symbol current">{symbols[1]}</div>
            <div className="symbol below">{symbols[2]}</div>
        </div>
    );
};

export default SlotColumn;