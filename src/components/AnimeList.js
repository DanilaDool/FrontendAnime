import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const AnimeCard = memo(({ anime }) => (
    <li className="bg-white p-4 rounded shadow border border-gray-800 flex flex-col md:flex-row gap-4 cursor-pointer hover:shadow-md transition-shadow">
        <Link to={`/show/${anime.shikimori_id}`} className="flex flex-col md:flex-row gap-4 w-full no-underline text-inherit">
            <div className="flex flex-col items-center md:w-[220px]">
                <img
                    loading="lazy"
                    src={anime.image}
                    alt={anime.title || "Без названия"}
                    className="w-[200px] h-[300px] object-cover"
                    onError={(e) => {
                        const fallback1 = anime.worldart_poster;
                        const fallback2 = "https://shikimori.one/assets/globals/missing_original.jpg";
                        if (!e.target.dataset.attemptedFallback) {
                            e.target.dataset.attemptedFallback = true;
                            e.target.src = fallback1 || fallback2;
                        }
                    }}
                />
                <h3 className="font-semibold text-lg mt-2 text-center">
                    {anime.title || anime.title_orig || "Без названия"}
                </h3>
            </div>
            <div className="text-sm space-y-1 flex-1">
                <p><strong>Тип:</strong> {anime.dtype || "Не указано"}</p>
                <p><strong>Год:</strong> {anime.date || "Не указан"}</p>
                <p><strong>Статус:</strong> {anime.status || "Не указан"}</p>
                <p><strong>Оценка:</strong> {anime.score || "Нет рейтинга"}</p>
                <p><strong>Эпизодов:</strong> {anime.episodes_count || "Не указано"}</p>
                <p><strong>Последняя серия:</strong> {anime.last_episode || "Не указана"}</p>
                <p><strong>Возрастной рейтинг:</strong> {anime.age_limit ? `${anime.age_limit}+` : "Не указан"}</p>
                {anime.genres?.length > 0 && (
                    <p><strong>Жанры:</strong> {anime.genres.join(', ')}</p>
                )}
                <p><strong>Описание:</strong> {anime.description || "Описание отсутствует"}</p>
            </div>
        </Link>
    </li>
));

function AnimeList() {
    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    const fetchPage = async (pageNumber) => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/v1/anime/info_block', {
                params: { page: pageNumber }
            });

            const newAnimes = response.data.animes || [];

            setAnimes(prev => {
                // Удалить дубли по id
                const existingIds = new Set(prev.map(a => a.id));
                const uniqueNew = newAnimes.filter(a => !existingIds.has(a.id));
                return [...prev, ...uniqueNew];
            });

            setPage(response.data.page);
            setTotalPages(response.data.pages);
        } catch (e) {
            setError(`Ошибка при загрузке: ${e.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPage(1);
    }, []);

    const handleShowMore = () => {
        if (page < totalPages) {
            fetchPage(page + 1);
        }
    };

    if (loading && animes.length === 0) return <p className="p-4">Загрузка...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <div className="flex flex-col p-4 gap-4">
            <div className="w-full flex justify-center">
                <Sidebar />
            </div>

            <div className="w-full">
                <h2 className="text-xl font-bold mb-4">Новые аниме на сайте:</h2>
                {animes.length > 0 ? (
                    <>
                        <ul className="space-y-6">
                            {animes.map((anime) => (
                                <AnimeCard key={anime.id} anime={anime} />
                            ))}
                        </ul>
                        {page < totalPages && (
                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={handleShowMore}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800 transition"
                                >
                                    Показать ещё
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p>Нет данных для отображения</p>
                )}
            </div>
        </div>
    );
}

export default AnimeList;
