import React from 'react';
import Sidebar from './Sidebar';

function MainContent() {
    return (
        <div className="flex justify-center items-start p-4">
            {/* Контейнер для центрирования контента */}
            <div className="flex gap-4 max-w-screen-lg w-full">
                {/* Левый блок с новинками */}
                <div className="flex-1 bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Новинки на сайте</h2>
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg shadow flex items-center">
                            <img src="/path/to/image.jpg" alt="Атака Титанов" className="w-24 h-24 object-cover rounded" />
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold">Атака Титанов</h3>
                                <p>Новая серия</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow flex items-center">
                            <img src="/path/to/image.jpg" alt="Истребитель Демонов" className="w-24 h-24 object-cover rounded" />
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold">Истребитель Демонов</h3>
                                <p>Новая серия</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Правый блок с фильтром */}
                <Sidebar />
            </div>
        </div>
    );
}

export default MainContent;
