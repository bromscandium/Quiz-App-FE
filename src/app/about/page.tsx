export default function AboutUsPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-text-primary flex flex-col gap-6">
            <h1 className="text-4xl font-bold">About Us</h1>

            <p className="text-lg">
                Welcome to Quiz App, a modern platform built to make learning engaging and
                interactive. Our mission is to provide users with an easy-to-use environment where
                they can challenge themselves, track their knowledge, and have fun while doing it.
            </p>

            <h2 className="text-2xl font-semibold">Our Vision</h2>
            <p>
                We aim to create a community where learning is accessible, interactive, and
                motivating. By combining technology with thoughtful design, we help users stay
                curious and continuously improve their skills.
            </p>

            <h2 className="text-2xl font-semibold">What We Offer</h2>
            <ul className="list-disc list-inside flex flex-col gap-2">
                <li>Wide variety of quizzes across multiple topics</li>
                <li>Progress tracking to monitor your growth</li>
                <li>A clean, user-friendly interface</li>
                <li>Ability to share quizzes and challenge friends</li>
            </ul>

            <h2 className="text-2xl font-semibold">Contact</h2>
            <p>Have questions or feedback?</p>
            <p>
                Reach out at{' '}
                <a
                    className="text-primary hover:text-primary-dark"
                    href="mailto:wrongmail@gmail.com"
                >
                    wrongmail@gmail.com
                </a>
                .
            </p>
            <p>We’d love to hear from you.</p>
        </div>
    );
}
