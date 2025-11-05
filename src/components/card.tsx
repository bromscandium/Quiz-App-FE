import { ReactNode } from 'react';

type CardProps = {
    children: ReactNode;
    className?: string;
};

export function Card({ children, className }: CardProps) {
    return <div className={`p-4 bg-paper rounded shadow mb-4 ${className ?? ''}`}>{children}</div>;
}
