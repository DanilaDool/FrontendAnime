import React, { useRef, useState, useEffect, memo } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import { Link } from 'react-router-dom';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

const AnimeCard = memo(({ anime }) => (
    <div className="flex-shrink-0 w-[160px] text-center">
        <Link
            to={`/show/${anime.shikimori_id}`}
            className="no-underline text-black block hover:shadow-md transition-shadow"
        >
            <img
                loading="lazy"
                src={anime.image}
                alt={anime.title || "Без названия"}
                className="w-full h-[220px] object-cover rounded-md mb-2 border-[1px] border-gray-800"
                onError={(e) => {
                    const fallback1 = anime.worldart_poster;
                    const fallback2 = "https://shikimori.one/assets/globals/missing_original.jpg";
                    if (!e.target.dataset.attemptedFallback) {
                        e.target.dataset.attemptedFallback = true;
                        e.target.src = fallback1 || fallback2;
                    }
                }}
            />
            <p className="truncate font-semibold">{anime.title || anime.title_orig || "Без названия"}</p>
        </Link>
    </div>
));

function SeasonAnimeSlider() {
    const sliderRef = useRef(null);
    const [seasonAnimes, setSeasonAnimes] = useState([]);
    const [latestAnimes, setLatestAnimes] = useState([]);
    const [includesPastSeason, setIncludesPastSeason] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 🎯 1. Запрос по сезонам (оставим текущий, если он нужен)
                const seasonRes = await axios.get('http://localhost:3000/api/v1/anime?page=1');
                const allAnimes = seasonRes.data.animes || [];

                const currentSeason = allAnimes.filter(
                    (anime) => String(anime.in_current_season).toLowerCase() === 'true'
                );

                const otherSeason = allAnimes.filter(
                    (anime) => String(anime.in_current_season).toLowerCase() !== 'true'
                );

                let seasonDisplay = [...currentSeason];
                let usedPastSeason = false;

                if (seasonDisplay.length < 8) {
                    seasonDisplay = seasonDisplay.concat(
                        otherSeason.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                    );
                    usedPastSeason = true;
                }

                seasonDisplay = seasonDisplay.slice(0, 25);

                setSeasonAnimes(seasonDisplay);
                setIncludesPastSeason(usedPastSeason);

                const recentRes = await axios.get('http://localhost:3000/api/v1/anime/recent');
                const recentAnimes = recentRes.data.animes || [];

                setLatestAnimes(recentAnimes.slice(0, 8));
                setError(null);
            } catch (err) {
                setError(`Ошибка при загрузке данных: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const scrollLeft = () => {
        sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="pt-[69px]">
            <div className="bg-white p-6 rounded-md text-black border-[1px] border-gray-800">
                <h2 className="text-2xl font-bold mb-4">
                    {includesPastSeason ? 'Аниме этого и прошлого сезона' : 'Аниме этого сезона'}
                </h2>
                {seasonAnimes.length === 0 ? (
                    <div className="bg-white p-6 rounded-md text-black border-[1px] border-gray-800 flex items-center justify-center mb-[30px]">
                        <h1>Аниме этого сезона пока нет! :(</h1>
                    </div>
                ) : (
                    <div className="relative mb-8">
                        <div
                            ref={sliderRef}
                            className="flex overflow-x-auto space-x-4 scrollbar-hide"
                            style={{ scrollBehavior: 'smooth' }}
                        >
                            {seasonAnimes.map((anime) => (
                                <AnimeCard key={anime.id} anime={anime} />
                            ))}
                        </div>
                        {seasonAnimes.length >= 8 && (
                            <>
                                <button
                                    onClick={scrollLeft}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-black px-2 py-1 rounded-l border-[1px] border-gray-800"
                                >
                                    ◀
                                </button>
                                <button
                                    onClick={scrollRight}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-black px-2 py-1 rounded-r border-[1px] border-gray-800"
                                >
                                    ▶
                                </button>
                            </>
                        )}
                    </div>
                )}

                <div>
                    <h2 className="text-2xl font-bold mb-4">Последние обновления аниме</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {latestAnimes.map((anime, index) => (
                            <li key={anime.id} className="anime-item" data-index={index}>
                                <Link to={`/show/${anime.shikimori_id}`} className="no-underline text-inherit">
                                    <div className="bg-gray-100 rounded p-2 cursor-pointer hover:shadow-md transition-shadow">
                                        <img
                                            loading="lazy"
                                            src={anime.image}
                                            alt={anime.title || "Без названия"}
                                            className="w-full h-[220px] object-cover rounded-md mb-2 border-[1px] border-gray-800"
                                            onError={(e) => {
                                                const fallback1 = anime.worldart_poster;
                                                const fallback2 = "https://shikimori.one/assets/globals/missing_original.jpg";
                                                if (!e.target.dataset.attemptedFallback) {
                                                    e.target.dataset.attemptedFallback = true;
                                                    e.target.src = fallback1 || fallback2;
                                                }
                                            }}
                                        />
                                        <p className="text-sm truncate font-semibold text-black">
                                            {anime.title?.length > 23
                                                ? `${anime.title.slice(0, 22)}...`
                                                : anime.title || anime.title_orig || "Без названия"}
                                        </p>
                                        <p className="text-xs text-gray-700">
                                            {anime.updated_at && (() => {
                                                const date = dayjs(anime.updated_at);
                                                if (date.isToday()) return `Обновлено: Сегодня в ${date.format("HH:mm")}`;
                                                if (date.isYesterday()) return `Обновлено: Вчера в ${date.format("HH:mm")}`;
                                                return `Обновлено: ${date.format("DD MMM, YYYY HH:mm")}`;
                                            })()}
                                        </p>
                                        <p className="text-sm text-black">Эпизод: {anime.last_episode || "?"}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SeasonAnimeSlider;