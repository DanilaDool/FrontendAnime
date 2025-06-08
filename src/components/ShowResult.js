import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

function ShowResult() {
    const location = useLocation(); // ❗ не useQuery напрямую
    const [animes, setAnimes] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ useMemo от строки, а не от объекта
    const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

    const searchTerm = useMemo(() => queryParams.get("query")?.toLowerCase() || "", [queryParams]);
    const genres = useMemo(() => queryParams.getAll("genre"), [queryParams]);
    const statuses = useMemo(() => queryParams.getAll("status"), [queryParams]);
    const dtypes = useMemo(() => queryParams.getAll("dtype"), [queryParams]);
    const ageLimits = useMemo(() => queryParams.getAll("age_limit"), [queryParams]);

    useEffect(() => {
        setLoading(true);

        axios.get('http://localhost:3000/api/v1/anime/all')
            .then((response) => {
                const all = response.data;

                if (Array.isArray(all)) {
                    const filtered = all.filter(anime => {
                        const matchQuery = !searchTerm || anime.title?.toLowerCase().includes(searchTerm)
                            || anime.title_orig?.toLowerCase().includes(searchTerm)
                            || anime.description?.toLowerCase().includes(searchTerm)
                            || anime.shikimori_id?.toString() === searchTerm;

                        const matchGenre = genres.length === 0 || genres.some(g => anime.genres?.includes(g));
                        const matchStatus = statuses.length === 0 || statuses.includes(anime.status);
                        const matchDtype = dtypes.length === 0 || dtypes.includes(anime.dtype);
                        const matchAge = ageLimits.length === 0 || ageLimits.includes(`${anime.age_limit}+`);

                        return matchQuery && matchGenre && matchStatus && matchDtype && matchAge;
                    });

                    setAnimes(filtered);
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
    }, [searchTerm, genres, statuses, dtypes, ageLimits]); // эти уже стабильно вычислены


    const handleShowMore = () => {
        setVisibleCount(prev => prev + 10);
    };

    const visibleAnimes = animes.slice(0, visibleCount);

    if (loading) return <p className="p-4">Загрузка...</p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;

    return (
        <div className="pt-[69px]">
            <div className="flex flex-col p-4 gap-4">
                <h2 className="text-xl font-bold mb-4">Результаты поиска:</h2>
                {visibleAnimes.length > 0 ? (
                    <>
                        <ul className="space-y-6">
                            {visibleAnimes.map((anime) => (
                                <li key={anime.id} className="bg-white p-4 rounded shadow border border-gray-800 flex flex-col md:flex-row gap-4">
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
                            ))}
                        </ul>

                        {visibleCount < animes.length && (
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
                    <div className="flex justify-center items-center h-[300px]">
                        <div className="text-center text-gray-700 text-lg border border-red-600 bg-white px-6 py-4 rounded-[1px]">
                            Ничего не найдено по заданным параметрам
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShowResult;
