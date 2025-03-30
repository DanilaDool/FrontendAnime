import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AnimeList() {
    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/anime#index')
            .then((response) => {
                console.log("Ответ API:", response.data);
                if (Array.isArray(response.data)) {
                    setAnimes(response.data);
                    setError(null);
                } else {
                    setError('Некорректный формат данных');
                }
            })
            .catch((err) => {
                setError(`Ошибка при загрузке данных: ${err.message}`);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Список Аниме:</h2>
            {animes.length > 0 ? (
                <ul className="space-y-4">
                    {animes.map((anime) => (
                        <li key={anime.id} className="bg-white p-4 rounded shadow">
                            <h3 className="font-semibold text-lg">Название: {anime.title || anime.title_orig || "Без названия"}</h3>
                            {anime.anime_img && (
                                <img
                                    src={anime.anime_img}
                                    alt={anime.title}
                                    className="w-40 h-40 object-cover rounded my-2"
                                />
                            )}
                            <p><strong>Описание:</strong> {anime.description || "Описание отсутствует"}</p>
                            <p><strong>Тип:</strong> {anime.dtype || "Не указано"}</p>
                            <p><strong>Год:</strong> {anime.date || "Не указан"}</p>
                            <p><strong>Статус:</strong> {anime.status || "Не указан"}</p>
                            <p><strong>Оценка:</strong> {anime.score || "Нет рейтинга"}</p>
                            <p><strong>Эпизодов:</strong> {anime.episodes_count || "Не указано"}</p>
                            <p><strong>Последняя серия:</strong> {anime.last_episode || "Не указана"}</p>
                            <p><strong>Возрастной рейтинг:</strong> {anime.age_limit ? `${anime.age_limit}+` : "Не указан"}</p>
                            {anime.genres && Array.isArray(anime.genres) && anime.genres.length > 0 && (
                                <p><strong>Жанры:</strong> {anime.genres.join(', ')}</p>
                            )}
                            {anime.link && (
                                <a
                                    href={anime.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    Смотреть на сайте
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Нет данных для отображения</p>
            )}
        </div>
    );
}

export default AnimeList;
