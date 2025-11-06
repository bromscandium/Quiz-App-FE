import { Button } from '@ui/button';
import { Input } from '@ui/input';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="w-full max-w-md bg-paper p-8 rounded shadow-md bg-white">
                <h1 className="text-3xl font-bold text-primary mb-6 text-center">Login</h1>

                <div className="flex flex-col gap-4 w-full">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="text-black placeholder-custom-primary-light"
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        className="text-black placeholder-custom-primary-light"
                        required
                    />
                    <Button
                        type="submit"
                        className="w-full bg-primary text-white rounded-md hover:bg-custom-primary-dark transition-colors duration-200 font-medium"
                    >
                        Sign In
                    </Button>
                </div>


                <p className="text-sm text-text-secondary mt-4 text-center">
                    Don’t have an account?{' '}
                    <Link
                        href="/register"
                        className="text-primary hover:text-custom-primary-dark transition-colors duration-200"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
