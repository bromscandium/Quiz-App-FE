import { Card, CardHeader, CardTitle, CardContent } from 'ui/card';

type CompanyCardProps = {
    id: string;
    name: string;
    owner: string;
    description?: string;
    isPrivate?: boolean;
};

export function CompanyCard({ name, owner, description, isPrivate }: CompanyCardProps) {
    return (
        <Card className="w-72">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 text-text-secondary text-sm">
                <p>@{description}</p>
                <p>{owner}</p>
                <span
                    className={`text-xs px-2 py-1 rounded ${
                        isPrivate ? 'bg-custom-error text-white' : 'bg-custom-success text-white'
                    }`}
                >
                    {isPrivate ? 'Private' : 'Public'}
                </span>
            </CardContent>
        </Card>
    );
}
