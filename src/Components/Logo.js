import React from 'react';
import './Logo.css';

export const Logo = ({width = 200}) => {
    return (
        <svg viewBox="0 0 200 200" width={width}>
            <path d="M150,150 L150,45 L100,150" className="path-0" />
            <path d="M50,150 L50,45 L100,150" className="path-0" />
            <circle cx="100" cy="100" r="100" className="arc-0" />
        </svg>
    );
}