// components/UserAgreement.jsx
import React from "react";

export default function UserAgreement() {
    return (
        <div className="pt-[69px]">
        <div className="bg-gray-100 min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-8">

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 border-b-2 border-red-500 pb-2 mb-6">
                    Пользовательское соглашение
                </h1>

                <p className="mb-4">
                    Добро пожаловать на сайт <strong>AnimeHub</strong>!
                </p>

                <p className="mb-4">
                    Используя сайт <strong>AnimeHub</strong> (включая все размещённые на
                    нём материалы), вы соглашаетесь с условиями настоящего
                    пользовательского соглашения:
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                    Информационный характер
                </h2>
                <p className="mb-4">
                    Сайт AnimeHub предоставляет справочную информацию об аниме-сериалах и
                    фильмах.
                </p>
                <p className="mb-4">
                    Администрация не гарантирует точность, полноту и актуальность
                    размещённой информации.
                </p>
                <p className="mb-4">
                    Все материалы предоставлены исключительно в ознакомительных целях.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                    Ограничение ответственности
                </h2>
                <p className="mb-4">
                    Администрация не несёт ответственности за возможный ущерб, причинённый
                    использованием материалов сайта.
                </p>
                <p className="mb-4">
                    Ссылки и изображения могут быть получены с открытых источников. Все
                    права принадлежат их правообладателям.
                </p>
                <p className="mb-4">
                    При возникновении претензий правообладатели могут обратиться к
                    администрации для удаления контента.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                    Условия использования
                </h2>
                <p className="mb-4">
                    Посещая сайт, вы подтверждаете, что несёте личную ответственность за
                    использование размещённой информации.
                </p>
                <p className="mb-4">
                    При несогласии с условиями соглашения, вы должны покинуть сайт и
                    прекратить его использование.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                    Изменения условий
                </h2>
                <p className="mb-4">
                    Условия соглашения могут быть изменены в любое время без
                    предварительного уведомления.
                </p>
                <p className="mb-6">
                    Продолжение использования сайта после изменений считается принятием
                    новых условий.
                </p>

                <p className="mb-0">
                    Связь с администрацией:{" "}
                    <a
                        href="mailto:anime.hub@bk.ru"
                        className="text-red-600 hover:underline"
                    >
                        anime.hub@bk.ru
                    </a>
                </p>
            </div>
        </div>
        </div>
    );
}
