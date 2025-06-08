// components/PrivacyPolicy.jsx
import React from "react";

export default function PrivacyPolicy() {
    return (
        <div className="pt-[69px]">
        <div className="bg-gray-100 min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 border-b-2 border-red-500 pb-2 mb-6">
                    Политика конфиденциальности
                </h1>

                <p className="mb-4">
                    На сайте <strong>AnimeHub</strong> мы уважаем ваше право на
                    конфиденциальность и стремимся обеспечить прозрачность в отношении
                    того, какие данные могут собираться и как они используются.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                    Сбор информации
                </h2>
                <p className="mb-4">
                    Мы не запрашиваем и не собираем персональные данные пользователей
                    (имя, email и т.п.).
                </p>
                <p className="mb-4">
                    При посещении сайта может автоматически собираться обезличенная
                    информация: IP-адрес, тип устройства, браузер, время посещения,
                    действия на сайте.
                </p>
                <p className="mb-4">
                    Эти данные собираются через стандартные аналитические инструменты
                    (например, Yandex Metrica, Google Analytics) и используются
                    исключительно для улучшения работы сайта.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                    Использование файлов cookie
                </h2>
                <p className="mb-4">
                    Сайт может использовать файлы cookie для корректного отображения
                    страниц и анализа поведения пользователей.
                </p>
                <p className="mb-4">
                    Вы можете отключить cookie в настройках своего браузера, однако это
                    может повлиять на работу некоторых элементов сайта.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                    Передача данных третьим лицам
                </h2>
                <p className="mb-4">
                    Мы не передаём ваши данные третьим лицам, за исключением случаев,
                    когда это требуется по закону.
                </p>
                <p className="mb-4">
                    Аналитические сервисы (например, Google, Яндекс) обрабатывают данные
                    согласно своей политике конфиденциальности.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                    Сторонние ссылки и встраиваемый контент
                </h2>
                <p className="mb-4">
                    На сайте могут размещаться ссылки на внешние ресурсы и встроенные
                    элементы (например, видеоплееры).
                </p>
                <p className="mb-4">
                    Мы не контролируем политику конфиденциальности этих сторонних
                    ресурсов и не несём за неё ответственность.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                    Изменения политики
                </h2>
                <p className="mb-4">
                    Политика конфиденциальности может быть обновлена без предварительного
                    уведомления.
                </p>

                <p className="mb-2">
                    Используя сайт <strong>AnimeHub</strong>, вы соглашаетесь с
                    настоящей политикой конфиденциальности.
                </p>
                <p className="mb-0">
                    По всем вопросам:{" "}
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
