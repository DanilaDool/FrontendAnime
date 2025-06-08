import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

function AnimeListPage() {
    const [animes, setAnimes] = useState([]);
    const [filters, setFilters] = useState({
        query: '',
        genre: '',
        status: '',
        dtype: '',
        age_limit: ''
    });
    const [visibleCount, setVisibleCount] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPage = async () => {
            setLoading(currentPage === 1); // показывать «Загрузка…» только на первой странице
            setIsFetchingNextPage(currentPage > 1); // иначе – «загрузка следующей страницы»

            try {
                const res = await axios.get(`http://localhost:3000/api/v1/anime/cult_info_block?page=${currentPage}`);
                const data = res.data;

                if (Array.isArray(data.animes)) {
                    setAnimes(prev => [...prev, ...data.animes]);
                    setTotalPages(data.pages);
                    setError(null);
                } else {
                    setError('Некорректный формат данных');
                }
            } catch (err) {
                setError(`Ошибка при загрузке данных: ${err.message}`);
            } finally {
                setLoading(false);
                setIsFetchingNextPage(false);
            }
        };

        fetchPage();
    }, [currentPage]);

    const filteredAnimes = useMemo(() => {
        const lowerQuery = filters.query.toLowerCase();

        return animes.filter(anime => {
            const matchQuery =
                anime.title?.toLowerCase().includes(lowerQuery) ||
                anime.title_orig?.toLowerCase().includes(lowerQuery) ||
                anime.description?.toLowerCase().includes(lowerQuery);

            const matchGenre = filters.genre === '' || anime.genres?.includes(filters.genre);
            const matchStatus = filters.status === '' || anime.status === filters.status;
            const matchDtype = filters.dtype === '' || anime.dtype === filters.dtype;
            const matchAge = filters.age_limit === '' || (anime.age_limit && `${anime.age_limit}+` === filters.age_limit);

            return matchQuery && matchGenre && matchStatus && matchDtype && matchAge;
        });
    }, [animes, filters]);

    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleApplyFilters = () => {
        setVisibleCount(10);
        setAnimes([]);
        setCurrentPage(1);
    };

    const handleShowMore = () => {
        const remaining = filteredAnimes.length - visibleCount;

        if (remaining >= 10) {
            setVisibleCount(prev => prev + 10);
        } else if (currentPage < totalPages && !isFetchingNextPage) {
            setCurrentPage(prev => prev + 1);
            setVisibleCount(prev => prev + 10);
        }
    };

    if (loading && currentPage === 1) return <p className="p-4">Загрузка...</p>;
    if (error) return <p className="p-4">{error}</p>;

    const visibleAnimes = filteredAnimes.slice(0, visibleCount);

    return (
        <div className="pt-[69px]">
            <div className="flex flex-col p-4 gap-4">
                <div className="w-full flex justify-center">
                    <Sidebar
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onApply={handleApplyFilters}
                    />
                </div>

                <div className="w-full">
                    <h2 className="text-xl font-bold mb-4">Культовые Аниме:</h2>
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

                            {(visibleCount < filteredAnimes.length || currentPage < totalPages) && (
                                <div className="mt-6 flex justify-center">
                                    <button
                                        onClick={handleShowMore}
                                        disabled={isFetchingNextPage}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800 transition disabled:opacity-50"
                                    >
                                        {isFetchingNextPage ? 'Загрузка...' : 'Показать ещё'}
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <p>Нет данных для отображения</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AnimeListPage;
