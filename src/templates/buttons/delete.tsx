'use client';

import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@ui/alert-dialog';
import { Button } from '@ui/button';
import { useTranslations } from 'next-intl';

type DeleteButtonProps = {
    itemName: string;
    itemId: string | number;
    onDelete: (id: string | number) => void;
};

export default function DeleteButton({ itemName, itemId, onDelete }: DeleteButtonProps) {
    const t = useTranslations('actions');

    const handleDelete = () => {
        onDelete(itemId);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2 bg-red-600 hover:bg-red-700">
                    {t('delete')}
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t('confirmDeleteTitle')}</AlertDialogTitle>
                    <AlertDialogDescription className="text-black">
                        {t('confirmDeleteDescription', { itemName })}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {t('delete')}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
