import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Home from './pages/Home';

export default function App() {
    return (
        <Router>
            <Helmet>
                <title>Quiz App</title>
            </Helmet>

            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}
