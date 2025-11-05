import { DeleteButton } from '@templates/buttons/delete';
import { Button } from '@components/button';

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background px-6">
            <h1 className="text-4xl font-bold text-text-primary mb-4">Quiz App</h1>
            <p className="text-xl text-text-secondary mb-8 text-center max-w-xl">
                Welcome to Quiz App! Test your knowledge, create your own quizzes, and challenge
                your friends.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
                <Button>Start Quiz</Button>
                <Button>View Quizzes</Button>
                <Button>Create Quiz</Button>
                <DeleteButton />
            </div>

            <div className="mt-12 max-w-2xl text-center">
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">Why use Quiz App?</h2>
                <ul className="list-disc list-inside text-text-secondary space-y-2">
                    <li>Interactive quizzes for all topics</li>
                    <li>Track your progress over time</li>
                    <li>Easy-to-use interface with modern design</li>
                    <li>Share quizzes with your friends and compete</li>
                </ul>
            </div>
        </div>
    );
}
