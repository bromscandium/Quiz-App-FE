import Link from 'next/link';
import { NavLinks } from '@enums/routes';

export function Header() {
    const navLinks = [
        { href: NavLinks.Users, label: 'Users' },
        { href: NavLinks.Companies, label: 'Companies' },
        { href: NavLinks.About, label: 'About' },
    ];

    return (
        <header className="bg-background shadow-md">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
                <div className="text-2xl font-bold text-primary">
                    <Link href="/">Quiz App</Link>
                </div>

                <nav className="flex-1 flex justify-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-primary hover:text-custom-primary-dark transition-colors duration-200 font-medium"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div>
                    <Link
                        href="/login"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-custom-primary-dark transition-colors duration-200 font-medium"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </header>
    );
}
