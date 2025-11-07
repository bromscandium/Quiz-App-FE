'use client';

import { DeleteButton } from '@templates/buttons/delete';
import { Button } from '@ui/button';

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 gap-8">
            <div className="flex flex-col gap-4 items-center text-center max-w-xl">
                <h1 className="text-4xl font-bold text-text-primary">Quiz App</h1>
                <p className="text-xl text-text-secondary">
                    Welcome to Quiz App! Test your knowledge, create your own quizzes, and challenge
                    your friends.
                </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
                <Button className="hover:bg-custom-primary-dark transition-colors duration-20 font-medium">
                    Start Quiz
                </Button>
                <Button className="hover:bg-custom-primary-dark transition-colors duration-20 font-medium">
                    View Quizzes
                </Button>
                <Button className="hover:bg-custom-primary-dark transition-colors duration-20font-medium">
                    Create Quiz
                </Button>
                <DeleteButton itemName="Quiz" onConfirm={() => console.log('Deleted')} />
            </div>
        </div>
    );
}
