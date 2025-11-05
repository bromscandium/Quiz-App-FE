import { ReactNode } from 'react';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/25 z-50" onClick={onClose} />
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div
                    className="bg-white rounded-2xl p-6 shadow-lg relative max-w-lg w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                    >
                        ✕
                    </button>
                    {children}
                </div>
            </div>
        </>
    );
}
