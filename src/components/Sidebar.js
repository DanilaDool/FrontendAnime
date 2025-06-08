import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GENRES = [
    "боевик", "боевые искусства", "взрослая жизнь", "военное", "гарем", "демоны",
    "детектив", "дзёсей", "драма", "исторический", "игры", "комедия", "космос",
    "криминал", "магия", "машины", "мелодрама", "меха", "мистика", "музыка",
    "научная фантастика", "пародия", "повседневность", "полиция", "приключения",
    "психология", "романтика", "работа", "самураи", "сверхъестественное",
    "сёдзё", "сёдзё-ай", "сёнен", "сёнен-ай", "спорт", "триллер", "ужасы",
    "фантастика", "фэнтези", "экшен"
];

const STATUS_OPTIONS = [
    { value: 'ongoing', label: 'Онгоинг' },
    { value: 'released', label: 'Вышел' },
    { value: 'anons', label: 'Анонсирован' }
];

const DTYPE_OPTIONS = [
    { value: "anime-serial", label: "Аниме Сериал" },
    { value: "anime", label: "Аниме Фильм" }
];

const AGE_LIMIT_OPTIONS = [
    { value: "0+", label: "0+" },
    { value: "6+", label: "6+" },
    { value: "12+", label: "12+" },
    { value: "16+", label: "16+" },
    { value: "18+", label: "18+" }
];

function Sidebar() {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        query: '',
        genres: [],
        status: [],
        dtype: [],
        age_limit: []
    });

    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleFilter = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: prev[key].includes(value)
                ? prev[key].filter(item => item !== value)
                : [...prev[key], value]
        }));
    };

    const handleInputChange = (e) => {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleApply = () => {
        const params = new URLSearchParams();
        if (filters.query) params.set('query', filters.query);
        filters.genres.forEach(g => params.append('genre', g));
        filters.status.forEach(s => params.append('status', s));
        filters.dtype.forEach(d => params.append('dtype', d));
        filters.age_limit.forEach(a => params.append('age_limit', a));
        navigate(`/showresult?${params.toString()}`);
    };

    const handleReset = () => {
        setFilters({
            query: '',
            genres: [],
            status: [],
            dtype: [],
            age_limit: []
        });
        setOpenDropdown(null);
    };


    const renderDropdown = (label, key, list) => {
        const isOpen = openDropdown === key;
        return (
            <div className="w-full">
                <button
                    type="button"
                    className="w-full flex justify-between items-center p-2 border rounded bg-white"
                    onClick={() => setOpenDropdown(prev => (prev === key ? null : key))}
                >
                    <span>{label}</span>
                    <svg
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <div
                    className={`transition-all duration-300 overflow-hidden ${
                        isOpen ? 'max-h-[320px] mt-2 border border-gray-300 rounded shadow bg-white' : 'max-h-0'
                    }`}
                >
                    <div className="max-h-[300px] overflow-y-auto px-1">
                        {list.map((item) => (
                            <label key={item.value || item} className="flex items-center text-sm block py-1">
                                <input
                                    type="checkbox"
                                    value={item.value || item}
                                    checked={filters[key].includes(item.value || item)}
                                    onChange={() => toggleFilter(key, item.value || item)}
                                    className="mr-2"
                                />
                                {item.label || item}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <aside className="w-full max-w-[100%] bg-white p-4 shadow h-auto mt-11 rounded-[5px] border border-gray-800 mx-auto mb-[30px]">
            <div className="relative mb-4 h-6">
                <h2 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold">Фильтр</h2>
                <button
                    onClick={handleReset}
                    title="Сбросить фильтр"
                    className="absolute right-0 text-gray-600 hover:text-red-600 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                         className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                    </svg>
                </button>
            </div>

            <div className="space-y-3 relative overflow-visible">
                <input
                    type="text"
                    name="query"
                    placeholder="Название или Код"
                    value={filters.query}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-300"
                />

                {renderDropdown('Жанры', 'genres', GENRES)}
                {renderDropdown('Статус', 'status', STATUS_OPTIONS)}
                {renderDropdown('Тип', 'dtype', DTYPE_OPTIONS)}
                {renderDropdown('Возрастное ограничение', 'age_limit', AGE_LIMIT_OPTIONS)}

                <button
                    onClick={handleApply}
                    className="bg-red-500 text-white w-full p-2 rounded hover:bg-red-800 transition"
                >
                    Применить
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
