import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RandomRedirect() {
    const navigate = useNavigate();
    const [hasRedirected, setHasRedirected] = useState(false);

    useEffect(() => {
        if (hasRedirected) return;

        axios.get('http://localhost:3000/api/v1/anime', {
            params: { page: Math.floor(Math.random() * 100) + 1 } // случайная страница
        })
            .then((response) => {
                const allAnimes = response.data.animes || [];

                if (allAnimes.length > 0) {
                    const randomAnime = allAnimes[Math.floor(Math.random() * allAnimes.length)];
                    setHasRedirected(true);
                    navigate(`/show/${randomAnime.shikimori_id}`, { replace: true });
                } else {
                    navigate('/', { replace: true });
                }
            })
            .catch((error) => {
                console.error("Ошибка при получении аниме:", error);
                navigate('/', { replace: true });
            });
    }, [navigate, hasRedirected]);

    return <div className="text-white p-4">Выбираем случайное аниме...</div>;
}

export default RandomRedirect;
