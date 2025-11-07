'use client';

import { useState } from 'react';
import { Button } from 'ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from 'ui/dialog';

type DeleteButtonProps = {
    itemName: string;
    onConfirm: () => void;
};

export function DeleteButton({ itemName, onConfirm }: DeleteButtonProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" className="hover:bg-red-800">
                    Delete
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm deleting</DialogTitle>
                    <DialogDescription className="text-black">
                        Are you sure about deleting {itemName}? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-end gap-2 mt-4">
                    <DialogClose asChild className="text-black bg-white  hover:bg-gray-100">
                        <Button variant="default">Cancel</Button>
                    </DialogClose>

                    <Button
                        variant="destructive"
                        className="hover:bg-red-800"
                        onClick={() => {
                            onConfirm();
                            setOpen(false);
                        }}
                    >
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
