import { List } from '@components/list';
import { UserCard } from '@templates/cards/user';

const mockUsers = [
    {
        id: '1',
        name: 'John',
        surname: 'Doe',
        nickname: 'johnd',
        email: 'john@example.com',
        created_at: '2023-10-01',
    },
    {
        id: '2',
        name: 'Jane',
        surname: 'Smith',
        nickname: 'janes',
        email: 'jane@example.com',
        created_at: '2023-09-15',
    },
];

export default function UsersPage() {
    return (
        <div className="max-w-screen-xl mx-auto px-6 py-12">
            <h1 className="text-4xl text-text-primary font-bold mb-6">List of users</h1>
            <List items={mockUsers} renderItem={(user) => <UserCard {...user} key={user.id} />} />
        </div>
    );
}
