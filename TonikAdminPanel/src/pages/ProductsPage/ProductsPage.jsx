// src/pages/Products/ProductsPage.jsx
import React from 'react';
import './ProductsPage.css';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import CategoryTabs from '../../components/CategoryTabs/CategoryTabs';
import ProductsTable from '../../components/ProductsTable/ProductsTable';

const ProductsPage = () => {
    return (
        <div className="ProductsPage">

            <div className="ProductsPage_container">

                <main className="ProductsPage_main">
                    <div className="ProductsPage_content">
                        <div className="ProductsPage_header">
                            <h1 className="ProductsPage_title">Товары</h1>

                            <div className="ProductsPage_actions">
                                <button className="ProductsPage_export">
                                    Экспортировать
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M6 1V11M6 1L2 5M6 1L10 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <button className="ProductsPage_add">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="ProductsPage_controls">
                            <div className="ProductsPage_search">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <circle cx="9" cy="9" r="6" stroke="white" strokeOpacity="0.4" strokeWidth="1.5"/>
                                    <path d="M14 14L17 17" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Поиск товара"
                                    className="ProductsPage_search_input"
                                />
                            </div>

                            <button className="ProductsPage_filters">
                                Фильтры
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 6H16M6 10H14M8 14H12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>

                        <CategoryTabs />
                        <ProductsTable />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProductsPage;
