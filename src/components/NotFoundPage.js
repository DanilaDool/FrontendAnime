// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
            <div className="text-center">
                <h1 className="text-9xl font-extrabold text-gray-400">404</h1>
                <p className="text-2xl font-semibold text-gray-700 mt-4">Страница не найдена</p>
                <p className="text-gray-500 mt-2">Извините, но такой страницы не существует.</p>
                <Link
                    to="/"
                    className="mt-6 inline-block bg-red-500 hover:bg-red-800 text-white font-medium py-2 px-4 rounded transition"
                >
                    Вернуться на главную
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
