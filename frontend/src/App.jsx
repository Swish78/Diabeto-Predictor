// App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Prediction from './components/Prediction';
import Visualize from './components/Visualize';
import Footer from './components/Footer';
import About from "./components/About.jsx";

const App = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <Navbar />
            <button
                onClick={toggleTheme}
                className="absolute top-4 right-4 p-2 bg-gray-700 text-white rounded"
            >
                Toggle Theme
            </button>
            <main className="flex-grow">
                <About/>
                <Prediction />
                <Visualize />
            </main>
            <Footer />
        </div>
    );
};

export default App;
