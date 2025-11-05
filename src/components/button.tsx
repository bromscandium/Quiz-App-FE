import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
};

export function Button({ children, onClick, className }: ButtonProps) {
    const defaultClassName = `
                px-4 py-2 rounded text-white
                bg-primary hover:bg-primary-dark
                transition-colors duration-200
            `;

    return (
        <button onClick={onClick} className={className ?? defaultClassName}>
            {children}
        </button>
    );
}
