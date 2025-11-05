'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { LayoutModal } from '@templates/modals/layout';

type ModalContextType = {
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
    return useContext(ModalContext)!;
}

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setModal] = useState<ReactNode>(null);

    const openModal = (modal: ReactNode) => {
        setModal(modal);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setModal(null);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <LayoutModal isOpen={isOpen} onClose={closeModal}>
                {content}
            </LayoutModal>
        </ModalContext.Provider>
    );
}
