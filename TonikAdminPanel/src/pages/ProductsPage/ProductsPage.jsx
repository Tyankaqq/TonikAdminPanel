// src/pages/Products/ProductsPage.jsx
import React, { useState } from 'react';
import CategoryTabs from '../../components/CategoryTabs/CategoryTabs';
import ProductsTable from '../../components/ProductsTable/ProductsTable';
import ProductModal from '../../components/ProductModal/ProductModal';
import AddEditProductModal from '../../components/AddEditProductModal/AddEditProductModal';

import GalochkaIcon from '../../assets/icons/BlackGalochka.png';
import Export from '../../assets/icons/export.png';
import Filter from '../../assets/icons/filter.png';
import CalendarIcon from '../../assets/icons/blackdate.png';
import ProductPhoto from '../../assets/images/ProductPhoto.jpg';

import './ProductsPage.css';

const ProductsPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchHistory, setSearchHistory] = useState(['А', 'Б', 'В', 'C']);
    const [category, setCategory] = useState('all');
    const [status, setStatus] = useState('all');
    const [dateFrom, setDateFrom] = useState('2025-09-16');
    const [dateTo, setDateTo] = useState('2025-09-25');
    const [priceMin, setPriceMin] = useState(2000);
    const [priceMax, setPriceMax] = useState(10000);
    const MINPRICE = 2000;
    const MAXPRICE = 10000;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // В ProductsPage.jsx замени массив products на этот:

    const [products, setProducts] = useState([
        // Тоники (1-20)
        { id: 1, name: 'Тоник А', productId: 'B111AA', category: 'tonics', views: 25, price: 3500, quantity: 25, active: false, date: '2025-09-24', status: 'instock', image: ProductPhoto },
        { id: 2, name: 'Тоник Б', productId: 'B112BB', category: 'tonics', views: 30, price: 4200, quantity: 30, active: true, date: '2025-09-23', status: 'instock', image: ProductPhoto },
        { id: 3, name: 'Тоник В', productId: 'B113CC', category: 'tonics', views: 45, price: 3800, quantity: 45, active: true, date: '2025-09-22', status: 'instock', image: ProductPhoto },
        { id: 4, name: 'Тоник Г', productId: 'B114DD', category: 'tonics', views: 20, price: 2800, quantity: 20, active: false, date: '2025-09-21', status: 'instock', image: ProductPhoto },
        { id: 5, name: 'Тоник Д', productId: 'B115EE', category: 'tonics', views: 35, price: 5000, quantity: 35, active: true, date: '2025-09-20', status: 'instock', image: ProductPhoto },
        { id: 6, name: 'Тоник Е', productId: 'B116FF', category: 'tonics', views: 28, price: 3200, quantity: 28, active: false, date: '2025-09-19', status: 'instock', image: ProductPhoto },
        { id: 7, name: 'Тоник Ж', productId: 'B117GG', category: 'tonics', views: 50, price: 4500, quantity: 50, active: true, date: '2025-09-18', status: 'instock', image: ProductPhoto },
        { id: 8, name: 'Тоник З', productId: 'B118HH', category: 'tonics', views: 22, price: 3100, quantity: 22, active: false, date: '2025-09-17', status: 'instock', image: ProductPhoto },
        { id: 9, name: 'Тоник И', productId: 'B119II', category: 'tonics', views: 40, price: 4800, quantity: 40, active: true, date: '2025-09-16', status: 'instock', image: ProductPhoto },
        { id: 10, name: 'Тоник К', productId: 'B120JJ', category: 'tonics', views: 60, price: 2500, quantity: 60, active: false, date: '2025-09-15', status: 'instock', image: ProductPhoto },
        { id: 11, name: 'Тоник Л', productId: 'B121KK', category: 'tonics', views: 33, price: 3900, quantity: 33, active: true, date: '2025-09-14', status: 'instock', image: ProductPhoto },
        { id: 12, name: 'Тоник М', productId: 'B122LL', category: 'tonics', views: 27, price: 3300, quantity: 27, active: false, date: '2025-09-13', status: 'instock', image: ProductPhoto },
        { id: 13, name: 'Тоник Н', productId: 'B123MM', category: 'tonics', views: 38, price: 4100, quantity: 38, active: true, date: '2025-09-12', status: 'instock', image: ProductPhoto },
        { id: 14, name: 'Тоник О', productId: 'B124NN', category: 'tonics', views: 29, price: 3600, quantity: 29, active: false, date: '2025-09-11', status: 'instock', image: ProductPhoto },
        { id: 15, name: 'Тоник П', productId: 'B125OO', category: 'tonics', views: 42, price: 4400, quantity: 42, active: true, date: '2025-09-10', status: 'instock', image: ProductPhoto },
        { id: 16, name: 'Тоник Р', productId: 'B126PP', category: 'tonics', views: 31, price: 3700, quantity: 31, active: false, date: '2025-09-09', status: 'instock', image: ProductPhoto },
        { id: 17, name: 'Тоник С', productId: 'B127QQ', category: 'tonics', views: 46, price: 4900, quantity: 46, active: true, date: '2025-09-08', status: 'instock', image: ProductPhoto },
        { id: 18, name: 'Тоник Т', productId: 'B128RR', category: 'tonics', views: 24, price: 3000, quantity: 24, active: false, date: '2025-09-07', status: 'instock', image: ProductPhoto },
        { id: 19, name: 'Тоник У', productId: 'B129SS', category: 'tonics', views: 37, price: 4300, quantity: 37, active: true, date: '2025-09-06', status: 'instock', image: ProductPhoto },
        { id: 20, name: 'Тоник Ф', productId: 'B130TT', category: 'tonics', views: 26, price: 3400, quantity: 26, active: false, date: '2025-09-05', status: 'instock', image: ProductPhoto },

        // Кремы (21-40)
        { id: 21, name: 'Крем А', productId: 'B222AA', category: 'creams', views: 23, price: 7500, quantity: 23, active: true, date: '2025-09-25', status: 'outofstock', image: ProductPhoto },
        { id: 22, name: 'Крем Б', productId: 'B223BB', category: 'creams', views: 55, price: 8200, quantity: 55, active: false, date: '2025-09-24', status: 'instock', image: ProductPhoto },
        { id: 23, name: 'Крем В', productId: 'B224CC', category: 'creams', views: 102, price: 9500, quantity: 102, active: true, date: '2025-09-23', status: 'instock', image: ProductPhoto },
        { id: 24, name: 'Крем SPF 30', productId: 'B225DD', category: 'creams', views: 65, price: 4200, quantity: 65, active: false, date: '2025-09-22', status: 'instock', image: ProductPhoto },
        { id: 25, name: 'Крем Увлажняющий', productId: 'B226EE', category: 'creams', views: 78, price: 6800, quantity: 78, active: true, date: '2025-09-21', status: 'instock', image: ProductPhoto },
        { id: 26, name: 'Крем Ночной', productId: 'B227FF', category: 'creams', views: 44, price: 7200, quantity: 44, active: false, date: '2025-09-20', status: 'instock', image: ProductPhoto },
        { id: 27, name: 'Крем Дневной', productId: 'B228GG', category: 'creams', views: 91, price: 6500, quantity: 91, active: true, date: '2025-09-19', status: 'instock', image: ProductPhoto },
        { id: 28, name: 'Крем Антивозрастной', productId: 'B229HH', category: 'creams', views: 56, price: 9800, quantity: 56, active: false, date: '2025-09-18', status: 'instock', image: ProductPhoto },
        { id: 29, name: 'Крем для глаз', productId: 'B230II', category: 'creams', views: 38, price: 5500, quantity: 38, active: true, date: '2025-09-17', status: 'instock', image: ProductPhoto },
        { id: 30, name: 'Крем Питательный', productId: 'B231JJ', category: 'creams', views: 67, price: 7000, quantity: 67, active: false, date: '2025-09-16', status: 'instock', image: ProductPhoto },
        { id: 31, name: 'Крем BB', productId: 'B232KK', category: 'creams', views: 82, price: 5800, quantity: 82, active: true, date: '2025-09-15', status: 'instock', image: ProductPhoto },
        { id: 32, name: 'Крем CC', productId: 'B233LL', category: 'creams', views: 49, price: 6200, quantity: 49, active: false, date: '2025-09-14', status: 'instock', image: ProductPhoto },
        { id: 33, name: 'Крем Матирующий', productId: 'B234MM', category: 'creams', views: 73, price: 4900, quantity: 73, active: true, date: '2025-09-13', status: 'instock', image: ProductPhoto },
        { id: 34, name: 'Крем Успокаивающий', productId: 'B235NN', category: 'creams', views: 61, price: 7700, quantity: 61, active: false, date: '2025-09-12', status: 'instock', image: ProductPhoto },
        { id: 35, name: 'Крем Регенерирующий', productId: 'B236OO', category: 'creams', views: 54, price: 8900, quantity: 54, active: true, date: '2025-09-11', status: 'instock', image: ProductPhoto },
        { id: 36, name: 'Крем Отбеливающий', productId: 'B237PP', category: 'creams', views: 47, price: 8500, quantity: 47, active: false, date: '2025-09-10', status: 'instock', image: ProductPhoto },
        { id: 37, name: 'Крем Защитный', productId: 'B238QQ', category: 'creams', views: 69, price: 6600, quantity: 69, active: true, date: '2025-09-09', status: 'instock', image: ProductPhoto },
        { id: 38, name: 'Крем Лифтинг', productId: 'B239RR', category: 'creams', views: 85, price: 9200, quantity: 85, active: false, date: '2025-09-08', status: 'instock', image: ProductPhoto },
        { id: 39, name: 'Крем Тонирующий', productId: 'B240SS', category: 'creams', views: 58, price: 5300, quantity: 58, active: true, date: '2025-09-07', status: 'instock', image: ProductPhoto },
        { id: 40, name: 'Крем Универсальный', productId: 'B241TT', category: 'creams', views: 72, price: 6900, quantity: 72, active: false, date: '2025-09-06', status: 'instock', image: ProductPhoto },

        // Сыворотки (41-60)
        { id: 41, name: 'Сыворотка А', productId: 'B333AA', category: 'serums', views: 42, price: 5600, quantity: 42, active: true, date: '2025-09-23', status: 'instock', image: ProductPhoto },
        { id: 42, name: 'Сыворотка В', productId: 'B334BB', category: 'serums', views: 34, price: 6700, quantity: 34, active: true, date: '2025-09-22', status: 'instock', image: ProductPhoto },
        { id: 43, name: 'Сыворотка С', productId: 'B335CC', category: 'serums', views: 51, price: 8900, quantity: 5, active: false, date: '2025-09-21', status: 'outofstock', image: ProductPhoto },
        { id: 44, name: 'Сыворотка Витамин C', productId: 'B336DD', category: 'serums', views: 88, price: 7800, quantity: 88, active: true, date: '2025-09-20', status: 'instock', image: ProductPhoto },
        { id: 45, name: 'Сыворотка Гиалуроновая', productId: 'B337EE', category: 'serums', views: 95, price: 9200, quantity: 95, active: false, date: '2025-09-19', status: 'instock', image: ProductPhoto },
        { id: 46, name: 'Сыворотка Ретинол', productId: 'B338FF', category: 'serums', views: 63, price: 10500, quantity: 63, active: true, date: '2025-09-18', status: 'instock', image: ProductPhoto },
        { id: 47, name: 'Сыворотка Ниацинамид', productId: 'B339GG', category: 'serums', views: 76, price: 6400, quantity: 76, active: false, date: '2025-09-17', status: 'instock', image: ProductPhoto },
        { id: 48, name: 'Сыворотка Пептидная', productId: 'B340HH', category: 'serums', views: 59, price: 8700, quantity: 59, active: true, date: '2025-09-16', status: 'instock', image: ProductPhoto },
        { id: 49, name: 'Сыворотка Коллаген', productId: 'B341II', category: 'serums', views: 81, price: 9600, quantity: 81, active: false, date: '2025-09-15', status: 'instock', image: ProductPhoto },
        { id: 50, name: 'Сыворотка Антиоксидант', productId: 'B342JJ', category: 'serums', views: 47, price: 7200, quantity: 47, active: true, date: '2025-09-14', status: 'instock', image: ProductPhoto },
        { id: 51, name: 'Сыворотка Увлажняющая', productId: 'B343KK', category: 'serums', views: 92, price: 6800, quantity: 92, active: false, date: '2025-09-13', status: 'instock', image: ProductPhoto },
        { id: 52, name: 'Сыворотка Осветляющая', productId: 'B344LL', category: 'serums', views: 68, price: 8100, quantity: 68, active: true, date: '2025-09-12', status: 'instock', image: ProductPhoto },
        { id: 53, name: 'Сыворотка Восстанавливающая', productId: 'B345MM', category: 'serums', views: 55, price: 7500, quantity: 55, active: false, date: '2025-09-11', status: 'instock', image: ProductPhoto },
        { id: 54, name: 'Сыворотка Успокаивающая', productId: 'B346NN', category: 'serums', views: 74, price: 6900, quantity: 74, active: true, date: '2025-09-10', status: 'instock', image: ProductPhoto },
        { id: 55, name: 'Сыворотка Лифтинг', productId: 'B347OO', category: 'serums', views: 86, price: 9800, quantity: 86, active: false, date: '2025-09-09', status: 'instock', image: ProductPhoto },
        { id: 56, name: 'Сыворотка Детокс', productId: 'B348PP', category: 'serums', views: 62, price: 7600, quantity: 62, active: true, date: '2025-09-08', status: 'instock', image: ProductPhoto },
        { id: 57, name: 'Сыворотка Энергия', productId: 'B349QQ', category: 'serums', views: 79, price: 8400, quantity: 79, active: false, date: '2025-09-07', status: 'instock', image: ProductPhoto },
        { id: 58, name: 'Сыворотка Баланс', productId: 'B350RR', category: 'serums', views: 53, price: 7100, quantity: 53, active: true, date: '2025-09-06', status: 'instock', image: ProductPhoto },
        { id: 59, name: 'Сыворотка Молодость', productId: 'B351SS', category: 'serums', views: 97, price: 10200, quantity: 97, active: false, date: '2025-09-05', status: 'instock', image: ProductPhoto },
        { id: 60, name: 'Сыворотка Сияние', productId: 'B352TT', category: 'serums', views: 71, price: 8300, quantity: 71, active: true, date: '2025-09-04', status: 'instock', image: ProductPhoto },
    ]);


    const openAddModal = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const openEditModal = (productId) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            setEditingProduct(product);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSaveProduct = (productData, isEdit) => {
        if (isEdit) {
            // Обновление существующего товара
            setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
            console.log('Product updated:', productData);
        } else {
            // Создание нового товара
            setProducts(prev => [...prev, productData]);
            console.log('Product created:', productData);
        }
    };

    const openFilters = () => {
        setIsFiltersOpen(true);
    };

    const closeFilters = () => {
        setIsFiltersOpen(false);
    };

    const formatDisplayDate = (iso) => {
        if (!iso) return '';
        const [year, month, day] = iso.split('-');
        return `${day}.${month}.${year.slice(2)}`;
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchFocus = () => {
        setIsSearchFocused(true);
    };

    const handleSearchBlur = () => {
        setTimeout(() => setIsSearchFocused(false), 200);
    };

    const handleHistoryClick = (value) => {
        setSearchValue(value);
        setIsSearchFocused(false);
    };

    const handleProductPreview = (productId) => {
        const product = products.find((p) => p.id === productId);
        if (product) {
            const modalProduct = {
                ...product,
                price: product.price.toLocaleString('ru-RU'),
            };
            setSelectedProduct(modalProduct);
            setIsPreviewOpen(true);
        }
    };

    const closePreview = () => {
        setIsPreviewOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className="ProductsPage">
            <div className="ProductsPage_container">
                <main className="ProductsPage_main">
                    <div className="ProductsPage_content">
                        {/* HEADER */}
                        <div className="ProductsPage_header">
                            <h1 className="ProductsPage_title">Товары</h1>

                            <div className="ProductsPage_actions">
                                <div className="ProductsPage_export-wrapper">
                                    <button
                                        className="ProductsPage_export"
                                        onClick={() => setIsExportOpen(!isExportOpen)}
                                    >
                                        <div className="ProductsPage_export_button">
                                            <img src={Export} alt="" className="ProductsTable_sort-icon" />
                                            Экспортировать
                                        </div>
                                        <img
                                            src={GalochkaIcon}
                                            alt=""
                                            className="ProductsTable_sort-icon"
                                            style={{
                                                transform: isExportOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.2s ease'
                                            }}
                                        />
                                    </button>

                                    {isExportOpen && (
                                        <div className="ProductsPage_export-dropdown">
                                            <button className="ProductsPage_export-item" onClick={() => { console.log('Export PDF'); setIsExportOpen(false); }}>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M3 2h7l3 3v8a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                                    <path d="M10 2v3h3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                                </svg>
                                                PDF
                                            </button>
                                            <button className="ProductsPage_export-item" onClick={() => { console.log('Export CSV'); setIsExportOpen(false); }}>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M3 2h7l3 3v8a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                                    <path d="M10 2v3h3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                                </svg>
                                                CSV
                                            </button>
                                            <button className="ProductsPage_export-item" onClick={() => { console.log('Export Excel'); setIsExportOpen(false); }}>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M3 2h7l3 3v8a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                                    <path d="M10 2v3h3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                                </svg>
                                                Excel
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <button className="ProductsPage_add" onClick={openAddModal}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <CategoryTabs />

                        {/* CONTROLS */}
                        <div className="ProductsPage_controls">
                            <div className="ProductsPage_search-wrapper">
                                <div className="ProductsPage_search">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <circle cx="9" cy="9" r="6" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
                                        <path d="M14 14L17 17" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Поиск товара"
                                        className="ProductsPage_search_input"
                                        value={searchValue}
                                        onChange={handleSearchChange}
                                        onFocus={handleSearchFocus}
                                        onBlur={handleSearchBlur}
                                    />
                                </div>

                                {isSearchFocused && searchHistory.length > 0 && (
                                    <div className="ProductsPage_search-history">
                                        {searchHistory.map((item, index) => (
                                            <button
                                                key={index}
                                                className="ProductsPage_search-history-item"
                                                onClick={() => handleHistoryClick(item)}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="ProductsPage_filters-wrap">
                                <button className="ProductsPage_filters" onClick={openFilters}>
                                    <img src={Filter} alt="" />
                                </button>

                                {isFiltersOpen && (
                                    <div className="FiltersDropdown">
                                        <div className="FiltersDropdown_header">
                                            <h2>Фильтры</h2>
                                            <button className="FiltersDropdown_close" onClick={closeFilters}>✕</button>
                                        </div>

                                        <div className="FiltersDropdown_body">
                                            {/* Категория */}
                                            <div className="FiltersDropdown_group">
                                                <label>Категория</label>
                                                <div className="FiltersDropdown_select--wrapper">
                                                    <div className="FiltersDropdown_select">
                                                        <span className="FiltersDropdown_selected-text">
                                                            {category === 'all' ? 'Все' : category === 'tonics' ? 'Тоники' : category === 'creams' ? 'Кремы' : 'Сыворотки'}
                                                        </span>
                                                        <img src={GalochkaIcon} alt="" />
                                                    </div>
                                                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="FiltersDropdown_native">
                                                        <option value="all">Все</option>
                                                        <option value="tonics">Тоники</option>
                                                        <option value="creams">Кремы</option>
                                                        <option value="serums">Сыворотки</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Статус */}
                                            <div className="FiltersDropdown_group">
                                                <label>Статус</label>
                                                <div className="FiltersDropdown_select--wrapper">
                                                    <div className="FiltersDropdown_select">
                                                        <span className="FiltersDropdown_selected-text">
                                                            {status === 'all' ? 'Все' : status === 'instock' ? 'В наличии' : 'Нет в наличии'}
                                                        </span>
                                                        <img src={GalochkaIcon} alt="" />
                                                    </div>
                                                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="FiltersDropdown_native">
                                                        <option value="all">Все</option>
                                                        <option value="instock">В наличии</option>
                                                        <option value="outofstock">Нет в наличии</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Дата */}
                                            <div className="FiltersDropdown_group">
                                                <label>Дата</label>
                                                <div className="FiltersDropdown_date-row">
                                                    <div className="FiltersDropdown_date" onClick={(e) => e.currentTarget.querySelector('input[type="date"]').showPicker()}>
                                                        <img src={CalendarIcon} alt="" />
                                                        <span>{formatDisplayDate(dateFrom)}</span>
                                                        <img src={GalochkaIcon} alt="" />
                                                        <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="FiltersDate_input" onClick={(e) => e.stopPropagation()} />
                                                    </div>
                                                    <div className="FiltersDropdown_date" onClick={(e) => e.currentTarget.querySelector('input[type="date"]').showPicker()}>
                                                        <img src={CalendarIcon} alt="" />
                                                        <span>{formatDisplayDate(dateTo)}</span>
                                                        <img src={GalochkaIcon} alt="" />
                                                        <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="FiltersDate_input" onClick={(e) => e.stopPropagation()} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Цена */}
                                            <div className="FiltersDropdown_group">
                                                <label>Цена</label>
                                                <div className="FiltersDropdown_range">
                                                    <div className="FiltersDropdown_range-track">
                                                        <div
                                                            className="FiltersDropdown_range-track-active"
                                                            style={{
                                                                left: `${((priceMin - MINPRICE) / (MAXPRICE - MINPRICE)) * 100}%`,
                                                                right: `${100 - ((priceMax - MINPRICE) / (MAXPRICE - MINPRICE)) * 100}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min={MINPRICE}
                                                        max={MAXPRICE}
                                                        value={priceMin}
                                                        onChange={(e) => {
                                                            const val = Math.min(Number(e.target.value), priceMax - 1);
                                                            setPriceMin(val);
                                                        }}
                                                        className="FiltersDropdown_thumb FiltersDropdown_thumb--min"
                                                    />
                                                    <input
                                                        type="range"
                                                        min={MINPRICE}
                                                        max={MAXPRICE}
                                                        value={priceMax}
                                                        onChange={(e) => {
                                                            const val = Math.max(Number(e.target.value), priceMin + 1);
                                                            setPriceMax(val);
                                                        }}
                                                        className="FiltersDropdown_thumb FiltersDropdown_thumb--max"
                                                    />
                                                </div>
                                                <div className="FiltersDropdown_range-labels">
                                                    <span>{priceMin.toLocaleString('ru-RU')} ₽</span>
                                                    <span>{priceMax.toLocaleString('ru-RU')} ₽</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="FiltersDropdown_footer">
                                            <button className="FiltersDropdown_save" onClick={closeFilters}>
                                                Применить
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* TABLE */}
                        <ProductsTable
                            searchValue={searchValue}
                            category={category}
                            status={status}
                            dateFrom={dateFrom}
                            dateTo={dateTo}
                            priceMin={priceMin}
                            priceMax={priceMax}
                            onProductPreview={handleProductPreview}
                            onProductEdit={openEditModal}
                            allProducts={products}
                        />
                    </div>
                </main>
            </div>

            {/* PREVIEW MODAL */}
            <ProductModal
                isOpen={isPreviewOpen}
                onClose={closePreview}
                product={selectedProduct}
            />

            {/* ADD/EDIT MODAL */}
            <AddEditProductModal
                isOpen={isModalOpen}
                onClose={closeModal}
                product={editingProduct}
                onSave={handleSaveProduct}
            />
        </div>
    );
};

export default ProductsPage;
