import { LayoutModal } from '@templates/modals/layout';
import { Button } from '@components/button';

type ConfirmModalProps = {
    onConfirm: () => void;
    onCancel: () => void;
    title?: string;
    message?: string;
};

export function ConfirmModal({ onCancel, onConfirm, title, message }: ConfirmModalProps) {
    return (
        <LayoutModal isOpen={true} onClose={onCancel} title={title}>
            {message && <p className="mb-6 text-text-primary">{message}</p>}
            <div className="flex justify-end gap-3">
                <Button
                    onClick={onCancel}
                    className="bg-paper text-text-primary hover:bg-background"
                >
                    Cancel
                </Button>
                <Button onClick={onConfirm}>Confirm</Button>
            </div>
        </LayoutModal>
    );
}
