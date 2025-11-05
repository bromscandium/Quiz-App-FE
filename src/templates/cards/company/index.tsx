import { Card } from '@components/card';

type CompanyCardProps = {
    id: string;
    name: string;
    owner: string;
    description?: string;
    isPrivate?: boolean;
};

export function CompanyCard({ name, owner, description, isPrivate }: CompanyCardProps) {
    return (
        <Card>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-text-primary">
                    {name || 'Unnamed Company'}
                </h2>
                {isPrivate !== undefined && (
                    <span
                        className={`text-xs px-2 py-1 rounded ${
                            isPrivate ? 'bg-error text-white' : 'bg-success text-white'
                        }`}
                    >
                        {isPrivate ? 'Private' : 'Public'}
                    </span>
                )}
            </div>
            <p className="text-text-secondary text-sm mb-1">Owner: {owner}</p>
            {description && <p className="text-text-secondary text-sm">{description}</p>}
        </Card>
    );
}
