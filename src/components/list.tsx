import { ReactNode } from 'react';

type ListProps<T> = {
    items: T[];
    renderItem: (item: T) => ReactNode;
    className?: string;
};

export function List<T>({ items, renderItem, className }: ListProps<T>) {
    return <div className={className}>{items.map((item, index) => renderItem(item))}</div>;
}
