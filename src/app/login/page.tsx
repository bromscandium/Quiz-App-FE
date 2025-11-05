import { Button } from '@components/button';
import { Input } from '@components/input';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
            <div className="w-full max-w-md bg-paper p-8 rounded shadow-md">
                <h1 className="text-3xl font-bold text-text-primary mb-6 text-center">Login</h1>

                <form className="flex flex-col">
                    <Input label="Email" type="email" placeholder="Enter your email" required />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />

                    <Button type="submit" className="w-full mt-4">
                        Sign In
                    </Button>
                </form>

                <p className="text-sm text-text-secondary mt-4 text-center">
                    Don’t have an account?{' '}
                    <a href="/register" className="text-primary hover:text-primary-dark">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
