// src/pages/Articles/ArticlesPage.jsx
import React, { useState } from 'react';
import ArticleTabs from '../../components/ArticleTabs/ArticleTabs';
import ArticlesTable from '../../components/ArticlesTable/ArticlesTable';
import ArticleModal from '../../components/ArticleModal/ArticleModal';

import Export from '../../assets/icons/export.png';
import Filter from '../../assets/icons/filter.png';
import GalochkaIcon from '../../assets/icons/BlackGalochka.png';

import './ArticlesPage.css';

const ArticlesPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Моковые данные статей
    const allArticles = [
        { id: 1, title: 'Название статьи', category: 'Категория', date: '08.02.25', published: false },
        { id: 2, title: 'Название статьи', category: 'Категория', date: '08.02.25', published: true },
        { id: 3, title: 'Название статьи', category: 'Категория', date: '07.02.25', published: true },
        { id: 4, title: 'Название статьи', category: 'Категория', date: '05.02.25', published: false },
        { id: 5, title: 'Название статьи', category: 'Категория', date: '05.02.25', published: false },
        { id: 6, title: 'Название статьи', category: 'Категория', date: '02.02.25', published: false },
        { id: 7, title: 'Название статьи', category: 'Категория', date: '02.02.25', published: true },
        { id: 8, title: 'Название статьи', category: 'Категория', date: '02.02.25', published: true },
        { id: 9, title: 'Название статьи', category: 'Категория', date: '02.02.25', published: true },
        { id: 10, title: 'Название статьи', category: 'Категория', date: '02.02.25', published: false },
    ];

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchFocus = () => {
        setIsSearchFocused(true);
    };

    const handleSearchBlur = () => {
        setTimeout(() => setIsSearchFocused(false), 200);
    };

    return (
        <div className="ArticlesPage">
            <div className="ArticlesPage_container">
                <main className="ArticlesPage_main">
                    <div className="ArticlesPage_content">
                        {/* HEADER */}
                        <div className="ArticlesPage_header">
                            <h1 className="ArticlesPage_title">Статьи</h1>

                            <div className="ArticlesPage_actions">
                                <div className="ArticlesPage_export-wrapper">
                                    <button
                                        className="ArticlesPage_export"
                                        onClick={() => setIsExportOpen(!isExportOpen)}
                                    >
                                        <div className="ArticlesPage_export_button">
                                            <img src={Export} alt="" className="ArticlesTable_sort-icon" />
                                            Экспортировать
                                        </div>
                                        <img
                                            src={GalochkaIcon}
                                            alt=""
                                            className="ArticlesTable_sort-icon"
                                            style={{
                                                transform: isExportOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.2s ease'
                                            }}
                                        />
                                    </button>

                                    {isExportOpen && (
                                        <div className="ArticlesPage_export-dropdown">
                                            <button
                                                className="ArticlesPage_export-item"
                                                onClick={() => {
                                                    console.log('Export PDF');
                                                    setIsExportOpen(false);
                                                }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M3 2h7l3 3v8a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                                    <path d="M10 2v3h3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                                </svg>
                                                PDF
                                            </button>
                                            <button
                                                className="ArticlesPage_export-item"
                                                onClick={() => {
                                                    console.log('Export CSV');
                                                    setIsExportOpen(false);
                                                }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M3 2h7l3 3v8a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                                    <path d="M10 2v3h3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                                </svg>
                                                CSV
                                            </button>
                                            <button
                                                className="ArticlesPage_export-item"
                                                onClick={() => {
                                                    console.log('Export Excel');
                                                    setIsExportOpen(false);
                                                }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M3 2h7l3 3v8a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                                    <path d="M10 2v3h3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                                </svg>
                                                Excel
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <button className="ArticlesPage_add" onClick={() => setIsAddModalOpen(true)}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path
                                            d="M10 4V16M4 10H16"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* TABS */}
                        <ArticleTabs />

                        {/* SEARCH & FILTERS */}
                        <div className="ArticlesPage_controls">
                            <div className="ArticlesPage_search-wrapper">
                                <div className="ArticlesPage_search">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <circle cx="9" cy="9" r="6" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
                                        <path d="M14 14L17 17" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Поиск товара"
                                        className="ArticlesPage_search_input"
                                        value={searchValue}
                                        onChange={handleSearchChange}
                                        onFocus={handleSearchFocus}
                                        onBlur={handleSearchBlur}
                                    />
                                </div>
                            </div>

                            <div className="ArticlesPage_filters-wrap">
                                <button className="ArticlesPage_filters" onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
                                    Фильтры
                                    <img src={Filter} alt="" />
                                </button>
                            </div>
                        </div>

                        {/* TABLE */}
                        <ArticlesTable
                            articles={allArticles}
                            searchValue={searchValue}
                        />
                    </div>
                </main>
            </div>

            {/* MODAL */}
            <ArticleModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </div>
    );
};

export default ArticlesPage;
