import React from 'react';

function Header() {
    return (
        <header className="bg-gray-800 text-white py-3">
            <div className="container mx-auto flex items-center">
                <h1 className="text-2xl font-bold mr-4">AnimeHub</h1>
                <nav>
                    <ul className="flex gap-4">
                        <li className="hover:text-gray-300">Главная</li>
                        <li className="hover:text-gray-300">Аниме</li>
                        <li className="hover:text-gray-300">Жанры</li>
                        <li className="hover:text-gray-300">Контакты</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
