import { Card, CardHeader, CardTitle, CardContent } from 'ui/card';
import { TypographyP } from '@ui/typography';

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
                <TypographyP>
                    @{nickname}
                    <br />
                    {email}
                    <br />
                    Joined: {created_at}
                </TypographyP>
            </CardContent>
        </Card>
    );
}
