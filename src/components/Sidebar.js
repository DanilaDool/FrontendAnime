import React from 'react';

function Sidebar() {
    return (
        <aside className="bg-white p-4 rounded-lg shadow w-64 h-full">
            <h2 className="text-lg font-semibold mb-2">Фильтр</h2>
            <div className="space-y-2">
                <input type="text" placeholder="Search..." className="w-full p-2 border rounded" />
                <select className="w-full p-2 border rounded">
                    <option>Жанр</option>
                    <option>Экшен</option>
                    <option>Приключения</option>
                </select>
                <select className="w-full p-2 border rounded">
                    <option>Год</option>
                    <option>2025</option>
                    <option>2024</option>
                </select>
                <button className="bg-red-500 text-white w-full p-2 rounded">Применить</button>
            </div>
        </aside>
    );
}

export default Sidebar;
