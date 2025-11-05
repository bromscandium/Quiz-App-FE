'use client';

import { Button } from '@components/button';
import { useModal } from '@providers/ModalProvider';
import { ConfirmModal } from '@templates/modals/confirm';

export function DeleteButton() {
    const { openModal, closeModal } = useModal();

    const handleClick = () => {
        openModal(
            <ConfirmModal
                title="Delete?"
                message="This action cannot be undone."
                onConfirm={closeModal}
                onCancel={closeModal}
            />,
        );
    };

    return <Button onClick={handleClick}>Delete</Button>;
}
