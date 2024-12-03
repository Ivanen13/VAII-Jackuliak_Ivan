import React from 'react';
import './Window.css';

const Windows = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="window-overlay" onClick={onClose}>
            <div className="window-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Windows;