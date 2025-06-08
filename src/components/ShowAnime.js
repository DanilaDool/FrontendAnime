import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

function ShowAnime() {
    const { shikimori_id } = useParams();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const [isAdultConfirmed, setIsAdultConfirmed] = useState(false);
    const [modalImageIndex, setModalImageIndex] = useState(null);

    const screenshots = useMemo(() => {
        return anime?.screenshots?.length
            ? anime.screenshots
            : anime?.material_data?.screenshots || [];
    }, [anime]);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/v1/anime/${shikimori_id}`)
            .then((res) => setAnime(res.data))
            .catch(() => setError('Ошибка загрузки аниме'))
            .finally(() => setLoading(false));
    }, [shikimori_id]);


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (modalImageIndex === null || screenshots.length === 0) return;
            if (e.key === 'Escape') setModalImageIndex(null);
            if (e.key === 'ArrowRight')
                setModalImageIndex((prev) => (prev + 1) % screenshots.length);
            if (e.key === 'ArrowLeft')
                setModalImageIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [modalImageIndex, screenshots]);

    if (loading) return <div className="text-white p-4">Загрузка...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;
    if (!anime) return null;

    if (anime.age_limit === 18 && !isAdultConfirmed) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 text-center">
                <h1 className="text-3xl font-bold mb-4">Вам уже есть 18 лет?</h1>
                <p className="text-lg mb-6">Доступ к этой странице разрешён только совершеннолетним пользователям.</p>
                <p className="text-red-400 mb-6">Эта страница содержит материалы с возрастным ограничением <strong>18+</strong></p>
                <div className="flex gap-4">
                    <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded" onClick={() => window.history.back()}>
                        Назад
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded" onClick={() => setIsAdultConfirmed(true)}>
                        Мне есть 18+
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-[69px]">
            <div className="bg-gray-100 text-white font-sans min-h-screen flex flex-col items-center">
                <main className="flex flex-col items-center mt-10 px-4 w-full">
                    <div className="bg-gray-800 p-6 rounded-md max-w-[1224px] w-full border-[3px] border-red-600 mx-auto">
                        <div className="flex flex-col md:flex-row items-center md:items-start p-4">
                            <img
                                src={anime.image}
                                alt={anime.title || 'Без названия'}
                                className="mb-4 md:mb-0 md:mr-6 w-[200px] h-[280px] object-cover rounded"
                                onError={(e) => {
                                    const fallback1 = anime.worldart_poster;
                                    const fallback2 = "https://shikimori.one/assets/globals/missing_original.jpg";
                                    if (!e.target.dataset.attemptedFallback) {
                                        e.target.dataset.attemptedFallback = true;
                                        e.target.src = fallback1 || fallback2;
                                    }
                                }}
                            />
                            <div className="text-center md:text-left">
                                <div className="text-gray-400 text-lg mb-1">#{anime.shikimori_id}</div>
                                <h1 className="text-3xl font-bold mb-3">{anime.title || anime.title_orig}</h1>
                                <p className="text-base text-gray-300 mb-2">{anime.episodes_count} серий по {anime.duration} минут</p>
                                <p className="text-base text-gray-300 mb-2">Тип: {anime.dtype || 'TV'}</p>
                                <p className="text-base text-gray-300 mb-2">Жанры: {anime.genres?.join(', ') || 'не указаны'}</p>
                                <p className="text-base text-gray-300 mb-2">Рейтинг MPAA: {anime.rating_mpaa || '?'}</p>
                                <p className="text-base text-gray-300 mb-2">Возрастное ограничение: {anime.age_limit || '?'}+</p>
                                <p className="text-base text-gray-300 mb-2">Статус: {anime.status || 'неизвестен'}</p>
                                <p className="text-base text-gray-300 mb-4">Рейтинг: {anime.score || '?'}</p>
                            </div>
                        </div>

                        {/* Описание */}
                        <h2 className="mb-2 mt-5 text-xl">Описание:</h2>
                        <div className="mb-4 text-gray-300">
                            <p>{(anime.description || 'Описание отсутствует')
                                .replace(/\[.*?\[\/character\]/g, '')
                                .replace(/\[\/?[^]]+\]/g, '')}</p>
                        </div>

                        {/* Скриншоты */}
                        {screenshots.length > 0 && (
                            <h2 className="mb-2 text-2xl">Кадры</h2>
                        )}

                        {screenshots.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                                {screenshots.slice(0, 4).map((screenshot, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setModalImageIndex(index)}
                                        className="transition-transform hover:scale-105 p-[5px] focus:outline-none"
                                    >
                                        <img
                                            src={screenshot}
                                            alt={`Скриншот ${index + 1}`}
                                            className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg shadow-md"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Трейлер */}
                        {anime.videos?.length > 0 && (
                            <div className="mt-6">
                                <h2 className="mb-2 text-2xl">Трейлер</h2>
                                {!showTrailer && (
                                    <button
                                        onClick={() => setShowTrailer(true)}
                                        className="bg-red-500 px-4 py-2 rounded hover:bg-red-800 mb-4 flex items-center gap-2"
                                    >
                                        Показать трейлер
                                    </button>
                                )}
                                {showTrailer && (
                                    <div className="w-full aspect-video mb-4">
                                        <iframe
                                            className="w-full h-full rounded shadow"
                                            src={anime.videos[0].player_url.replace('http://', 'https://')}
                                            frameBorder="0"
                                            allowFullScreen
                                            loading="lazy"
                                            title="Anime trailer"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="w-full aspect-video">
                            <h2 className="mb-4 text-2xl">Смотреть: {anime.title}</h2>
                            <iframe
                                className="w-full h-full"
                                src={`https://kodik.cc/find-player?title=${encodeURIComponent(anime.title)}&year=${anime.date}&kinopoiskID=${anime.kinopoisk_id}&imdbID=${anime.imdb_id}&worldartLink=${anime.worldart_link}&shikimoriID=${anime.shikimori_id}&notBlockedForMe=true&types=anime,anime-serial&season=&episode=1&poster=https://shikimori.one/system/animes/original/${anime.shikimori_id}.jpg&start_from=0`}
                                frameBorder="0"
                                allowFullScreen
                                allow="autoplay *; fullscreen *"
                                title="Anime Player"
                            />
                        </div>
                    </div>
                </main>
            </div>

            {/* Модалка скриншотов */}
            {modalImageIndex !== null && screenshots.length > 0 && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                    onClick={() => setModalImageIndex(null)}
                    tabIndex={-1}
                >
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button className="absolute top-2 right-2 bg-white text-black rounded px-2 py-1" onClick={() => setModalImageIndex(null)}>
                            ✕
                        </button>
                        <button className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl px-3 py-1 bg-black bg-opacity-50 rounded"
                                onClick={() => setModalImageIndex((modalImageIndex - 1 + screenshots.length) % screenshots.length)}>←</button>
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl px-3 py-1 bg-black bg-opacity-50 rounded"
                                onClick={() => setModalImageIndex((modalImageIndex + 1) % screenshots.length)}>→</button>
                        <img
                            src={screenshots[modalImageIndex]}
                            alt={`Скриншот ${modalImageIndex + 1}`}
                            className="max-h-[80vh] max-w-[90vw] rounded shadow-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShowAnime;
