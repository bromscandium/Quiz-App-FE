import * as React from 'react';
import { cn } from '@libs/shadcn/utils';

export function TypographyH1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h1
            className={cn(
                'scroll-m-20 text-4xl font-extrabold tracking-tight text-custom-text-primary lg:text-5xl',
                className,
            )}
            {...props}
        />
    );
}

export function TypographyH2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2
            className={cn(
                'scroll-m-20 text-3xl font-semibold tracking-tight text-custom-text-primary',
                className,
            )}
            {...props}
        />
    );
}

export function TypographyH3({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn(
                'scroll-m-20 text-2xl font-semibold tracking-tight text-custom-text-primary',
                className,
            )}
            {...props}
        />
    );
}

export function TypographyP({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return <p className={cn('leading-7 text-custom-text-secondary', className)} {...props} />;
}

export function TypographySmall({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
    return (
        <small
            className={cn('text-sm font-medium leading-none text-custom-text-secondary', className)}
            {...props}
        />
    );
}

export function TypographyList({ className, children }: React.HTMLAttributes<HTMLUListElement>) {
    return (
        <ul className={cn('list-disc list-inside space-y-1 text-custom-text-secondary', className)}>
            {children}
        </ul>
    );
}

export function TypographyListItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
    return <li className={cn('ml-4', className)} {...props} />;
}
