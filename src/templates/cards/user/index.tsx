import { Card } from '@components/card';

type UserCardProps = {
    id: string;
    name: string;
    surname?: string;
    nickname?: string;
    email?: string;
    created_at?: string;
};

export function UserCard({ name, surname, nickname, email, created_at }: UserCardProps) {
    return (
        <Card>
            <h2 className="text-xl font-semibold text-text-primary mb-1">
                {name} {surname || ''}
            </h2>
            {nickname && <p className="text-text-secondary text-sm mb-1">Nickname: {nickname}</p>}
            {email && <p className="text-text-secondary text-sm mb-1">Email: {email}</p>}
            {created_at && (
                <p className="text-text-secondary text-xs">
                    Joined: {new Date(created_at).toLocaleDateString()}
                </p>
            )}
        </Card>
    );
}
