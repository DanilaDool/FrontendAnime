import React from 'react';
import { Link } from "react-router-dom";


function Footer() {
    return (
        <footer className="bg-gray-800 text-white text-center py-4 mt-4">
            <p>По вопросам нарушения авторских прав или для предложений пишите на почту:
                <a href="mailto:anime.hub@bk.ru" className="text-red-600 hover:underline">anime.hub@bk.ru</a>
            </p>

            <hr className="my-4 border-t border-red-600 w-[88%] mx-auto"/>

            <Link to={'/useragreement'}>
                <p className="mt-4">Пользовательское соглашение</p>
            </Link>

            <Link to={'/privacypolicy'}>
                <p className="mt-4">Политика конфиденциальности</p>
            </Link>

            <p className="mt-4">© 2025 AnimeHub</p>
        </footer>
    );
}

export default Footer;
