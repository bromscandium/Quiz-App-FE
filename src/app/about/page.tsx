export default function AboutUsPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 bg-background text-text-primary">
            <h1 className="text-4xl font-bold mb-6">About Us</h1>

            <p className="text-lg mb-6">
                Welcome to Quiz App, a modern platform built to make learning engaging and
                interactive. Our mission is to provide users with an easy-to-use environment where
                they can challenge themselves, track their knowledge, and have fun while doing it.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="mb-6">
                We aim to create a community where learning is accessible, interactive, and
                motivating. By combining technology with thoughtful design, we help users stay
                curious and continuously improve their skills.
            </p>

            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <ul className="list-disc list-inside mb-6">
                <li className="mb-2">Wide variety of quizzes across multiple topics</li>
                <li className="mb-2">Progress tracking to monitor your growth</li>
                <li className="mb-2">A clean, user-friendly interface</li>
                <li className="mb-2">Ability to share quizzes and challenge friends</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p>Have questions or feedback?</p>
            <p>
                Reach out to us at{' '}
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
