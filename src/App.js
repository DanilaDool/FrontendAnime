import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from "./components/MainContent";
import AnimeList from './components/AnimeList';

function App() {
    return (
        <div className="bg-gray-200 min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex justify-center items-start py-4">
                <div className="container mx-auto">
                    <MainContent />
                </div>
                <div className="bg-gray-100 min-h-screen p-4">
                    <h1 className="text-2xl font-bold text-center mb-6">AnimeHub</h1>
                    <AnimeList />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
