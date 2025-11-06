import { Card, CardHeader, CardTitle, CardContent } from 'ui/card';

type UserCardProps = {
    id: string;
    name: string;
    surname: string;
    nickname: string;
    email: string;
    created_at: string;
};

export function UserCard({ name, surname, nickname, email, created_at }: UserCardProps) {
    return (
        <Card className="w-72">
            <CardHeader>
                <CardTitle>
                    {name} {surname}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 text-text-secondary text-sm">
                <p>@{nickname}</p>
                <p>{email}</p>
                <p className="text-xs">Joined: {created_at}</p>
            </CardContent>
        </Card>
    );
}
