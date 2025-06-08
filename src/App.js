import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SeasonAnimeSlider from "./components/SeasonAnimeSlider";
import AnimeList from './components/AnimeList';
import ShowAnime from './components/ShowAnime';
import AnimeListPage from './components/AnimeListPage';
import CultListPage from './components/CultListPage';
import RandomRedirect from './components/RandomRedirect';
import ShowResult from './components/ShowResult';
import NotFoundPage from './components/NotFoundPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import UserAgreement from './components/UserAgreement';





import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gray-200"> {/* Один обёрт. контейнер */}

                <Header />

                <div className="flex-1"> {/* Расширяется, толкает футер вниз */}
                    <Routes>
                        <Route path="/" element={
                            <>
                                <div className="bg-gray-100 p-4">
                                    <SeasonAnimeSlider />
                                </div>

                                <div className="flex justify-center items-start py-4">
                                    <div className="bg-gray-100 p-4 w-full">
                                        <AnimeList />
                                    </div>
                                </div>
                            </>
                        } />

                        <Route path="/random" element={<RandomRedirect />} />
                        <Route path="/show/:shikimori_id" element={<ShowAnime />} />
                        <Route path="/showallanime" element={<AnimeListPage />} />
                        <Route path="/showcultanime" element={<CultListPage />} />
                        <Route path="/showresult" element={<ShowResult />} />
                        <Route path="*" element={<NotFoundPage />} />
                        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                        <Route path="/useragreement" element={<UserAgreement />} />


                    </Routes>
                </div>

                <Footer />
            </div>
        </Router>
    );
}


export default App;
