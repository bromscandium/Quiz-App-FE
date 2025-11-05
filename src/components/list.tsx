import {ReactNode} from 'react';

type ListProps<T> = {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    className?: string;
};

export function List<T>({items, renderItem, className}: ListProps<T>) {
    return (
        <div className={className}>
            {items.map((item, index) => (
                <div key={index}>{renderItem(item, index)}</div>
            ))}
        </div>
    );
}
