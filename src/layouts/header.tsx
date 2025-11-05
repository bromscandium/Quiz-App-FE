import Link from 'next/link';

export function Header() {
    const navLinks = [
        { href: '/users', label: 'Users' },
        { href: '/companies', label: 'Companies' },
        { href: '/about', label: 'About' },
    ];

    return (
        <header className="bg-paper text-text-primary">
            <div className="max-w-screen-xl mx-auto flex items-center px-6 py-6 relative">
                <div className="absolute left-6 text-3xl font-bold">
                    <Link href="/">Quiz App</Link>
                </div>

                <nav className="flex-1 flex justify-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="hover:text-primary transition-colors "
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="absolute right-6">
                    <Link
                        href="/login"
                        className="text-text-primary hover:text-primary font-medium "
                    >
                        Login
                    </Link>
                </div>
            </div>
        </header>
    );
}
