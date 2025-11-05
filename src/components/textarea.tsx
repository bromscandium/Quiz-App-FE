import { TextareaHTMLAttributes } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
    helperText?: string;
    className?: string;
};

export function Textarea({ label, error, helperText, className, ...props }: TextareaProps) {
    const defaultClassName = `
        border rounded px-4 py-2 text-sm
        bg-paper text-text-primary
        focus:outline-none focus:ring-2 focus:ring-primary
        ${error ? 'border-error' : 'border-gray-300'}
        resize-none
    `;

    return (
        <div className="flex flex-col w-full mb-4">
            {label && (
                <label className="mb-1 text-sm font-medium text-text-secondary">{label}</label>
            )}
            <textarea className={className ?? defaultClassName} {...props} />
            {helperText && !error && (
                <span className="text-xs text-text-secondary mt-1">{helperText}</span>
            )}
            {error && <span className="text-xs text-error mt-1">{error}</span>}
        </div>
    );
}
