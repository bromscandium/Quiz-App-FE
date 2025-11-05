import { Modal } from '@components/modal';
import { ReactNode } from 'react';

type LayoutModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
};

export function LayoutModal({ isOpen, onClose, title, children }: LayoutModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
            <div>{children}</div>
        </Modal>
    );
}
