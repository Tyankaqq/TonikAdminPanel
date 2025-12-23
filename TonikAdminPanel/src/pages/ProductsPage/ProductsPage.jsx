// src/pages/Products/ProductsPage.jsx
import React, { useState } from 'react';

import CategoryTabs from '../../components/CategoryTabs/CategoryTabs';
import ProductsTable from '../../components/ProductsTable/ProductsTable';
import ProductModal from '../../components/ProductModal/ProductModal';

import DownloadIcon from '../../assets/icons/download.png';
import PointerIcon from '../../assets/icons/pointer.png';
import DeleteIcon from '../../assets/icons/delete.png';
import GalochkaIcon from '../../assets/icons/BlackGalochka.png';
import Export from '../../assets/icons/export.png';
import Filter from '../../assets/icons/filter.png';
import CalendarIcon from '../../assets/icons/blackdate.png';

import ProductPhoto from '../../assets/images/ProductPhoto.jpg';
import './ProductsPage.css';
const ProductsPage = () => {
    // Фильтры
    const [searchValue, setSearchValue] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchHistory, setSearchHistory] = useState([
        'Название товара',
        'Крем увлажняющий',
        'Тоник матирующий',
        'Сыворотка витамин C'
    ]);

    const [category, setCategory] = useState('all');
    const [status, setStatus] = useState('all');
    const [dateFrom, setDateFrom] = useState('2025-09-16');
    const [dateTo, setDateTo] = useState('2025-09-25');
    const [priceMin, setPriceMin] = useState(2000);
    const [priceMax, setPriceMax] = useState(10000);

    const MIN_PRICE = 2000;
    const MAX_PRICE = 10000;

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [isExportOpen, setIsExportOpen] = useState(false);

    // Предпросмотр товара
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [images, setImages] = useState([]);
    const [tonicTypes, setTonicTypes] = useState([{ id: 1 }]);
    const [benefitTypes, setBenefitTypes] = useState([{ id: 1 }]);
    const [features, setFeatures] = useState([{ id: 1, section: 'Раздел №1' }]);
    const [certs, setCerts] = useState([{ id: 1 }]);
    const [extraProducts, setExtraProducts] = useState([{ id: 1 }]);

    // ЕДИНЫЙ массив товаров для таблицы и модалки
    const allProducts = [
        {
            id: 1,
            name: 'Тоник увлажняющий',
            productId: 'B111AA',
            category: 'tonics',
            views: 25,
            price: 3500,
            quantity: 25,
            active: false,
            date: '2025-09-24',
            status: 'in_stock',
            image: ProductPhoto
        },
        {
            id: 2,
            name: 'Крем ночной восстанавливающий',
            productId: 'B222BB',
            category: 'creams',
            views: 23,
            price: 7500,
            quantity: 23,
            active: true,
            date: '2025-09-25',
            status: 'out_of_stock',
            image: ProductPhoto
        },
        {
            id: 3,
            name: 'Сыворотка с витамином C',
            productId: 'B333CC',
            category: 'serums',
            views: 42,
            price: 5600,
            quantity: 42,
            active: true,
            date: '2025-09-23',
            status: 'in_stock',
            image: ProductPhoto
        },
        {
            id: 4,
            name: 'Тоник матирующий для жирной кожи',
            productId: 'B444DD',
            category: 'tonics',
            views: 20,
            price: 2800,
            quantity: 20,
            active: false,
            date: '2025-09-20',
            status: 'in_stock',
            image: ProductPhoto
        },
        {
            id: 5,
            name: 'Крем дневной SPF 30',
            productId: 'B555EE',
            category: 'creams',
            views: 55,
            price: 4200,
            quantity: 55,
            active: false,
            date: '2025-09-22',
            status: 'in_stock',
            image: ProductPhoto
        },
        {
            id: 6,
            name: 'Сыворотка гиалуроновая',
            productId: 'B666FF',
            category: 'serums',
            views: 5,
            price: 8900,
            quantity: 5,
            active: false,
            date: '2025-09-21',
            status: 'out_of_stock',
            image: ProductPhoto
        },
        {
            id: 7,
            name: 'Тоник успокаивающий',
            productId: 'B777GG',
            category: 'tonics',
            views: 20,
            price: 3200,
            quantity: 20,
            active: true,
            date: '2025-09-19',
            status: 'in_stock',
            image: ProductPhoto
        },
        {
            id: 8,
            name: 'Крем антивозрастной',
            productId: 'B888HH',
            category: 'creams',
            views: 102,
            price: 9500,
            quantity: 102,
            active: true,
            date: '2025-09-18',
            status: 'in_stock',
            image: ProductPhoto
        },
        {
            id: 9,
            name: 'Сыворотка с ретинолом',
            productId: 'B999II',
            category: 'serums',
            views: 42,
            price: 6700,
            quantity: 42,
            active: true,
            date: '2025-09-17',
            status: 'in_stock',
            image: ProductPhoto
        },
        {
            id: 10,
            name: 'Тоник очищающий',
            productId: 'B000JJ',
            category: 'tonics',
            views: 60,
            price: 2500,
            quantity: 60,
            active: false,
            date: '2025-09-16',
            status: 'in_stock',
            image: ProductPhoto
        }
    ];

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);

    const openFilters = () => setIsFiltersOpen(true);
    const closeFilters = () => setIsFiltersOpen(false);

    const addTonicType = () => {
        setTonicTypes(prev => [...prev, { id: crypto.randomUUID() }]);
    };

    const addBenefitType = () => {
        setBenefitTypes(prev => [...prev, { id: crypto.randomUUID() }]);
    };

    const handleImagesUpload = (event) => {
        const files = Array.from(event.target.files || []);
        if (!files.length) return;

        const newImages = files.map((file) => ({
            id: crypto.randomUUID(),
            url: URL.createObjectURL(file),
            file,
        }));

        setImages((prev) => [...prev, ...newImages].slice(0, 4));
    };

    const handleRemoveImage = (id) => {
        setImages((prev) => prev.filter((img) => img.id !== id));
    };

    const addFeature = () => {
        setFeatures((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                section: `Раздел №${prev.length + 1}`,
            },
        ]);
    };

    const addCert = () => {
        setCerts((prev) => [...prev, { id: crypto.randomUUID() }]);
    };

    const addExtraProduct = () => {
        setExtraProducts((prev) => [...prev, { id: crypto.randomUUID() }]);
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

    // Обработчик предпросмотра товара
    const handleProductPreview = (productId) => {
        const product = allProducts.find(p => p.id === productId);
        if (product) {
            // Преобразуем для модалки
            const modalProduct = {
                ...product,
                price: `${product.price.toLocaleString('ru-RU')} ₽`
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
                                            <button
                                                className="ProductsPage_export-item"
                                                onClick={() => {
                                                    console.log('Export PDF');
                                                    setIsExportOpen(false);
                                                }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M3 2h7l3 3v8a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                                    <path d="M10 2v3h3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                                </svg>
                                                PDF
                                            </button>
                                            <button
                                                className="ProductsPage_export-item"
                                                onClick={() => {
                                                    console.log('Export CSV');
                                                    setIsExportOpen(false);
                                                }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M3 2h7l3 3v8a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                                    <path d="M10 2v3h3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                                </svg>
                                                CSV
                                            </button>
                                            <button
                                                className="ProductsPage_export-item"
                                                onClick={() => {
                                                    console.log('Export Excel');
                                                    setIsExportOpen(false);
                                                }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M3 2h7l3 3v8a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                                    <path d="M10 2v3h3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                                </svg>
                                                Excel
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <button className="ProductsPage_add" onClick={openAddModal}>
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

                        <CategoryTabs />

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
                                    Фильтры
                                    <img src={Filter} alt="" />
                                </button>

                                {isFiltersOpen && (
                                    <div className="FiltersDropdown">
                                        <div className="FiltersDropdown_header">
                                            <h2>Фильтры</h2>
                                            <button className="FiltersDropdown_close" onClick={closeFilters}>
                                                ✕
                                            </button>
                                        </div>

                                        <div className="FiltersDropdown_body">
                                            {/* Категория */}
                                            <div className="FiltersDropdown_group">
                                                <label>Категория</label>
                                                <div className="FiltersDropdown_select--wrapper">
                                                    <div className="FiltersDropdown_select">
                                                        <span className="FiltersDropdown_selected-text">
                                                            {category === 'all' ? 'Все' :
                                                                category === 'tonics' ? 'Тоники' :
                                                                    category === 'creams' ? 'Кремы' : 'Сыворотки'}
                                                        </span>
                                                        <img src={GalochkaIcon} alt="" />
                                                    </div>
                                                    <select
                                                        value={category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                        className="FiltersDropdown_native"
                                                    >
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
                                                            {status === 'all' ? 'Все' :
                                                                status === 'in_stock' ? 'В наличии' : 'Нет в наличии'}
                                                        </span>
                                                        <img src={GalochkaIcon} alt="" />
                                                    </div>
                                                    <select
                                                        value={status}
                                                        onChange={(e) => setStatus(e.target.value)}
                                                        className="FiltersDropdown_native"
                                                    >
                                                        <option value="all">Все</option>
                                                        <option value="in_stock">В наличии</option>
                                                        <option value="out_of_stock">Нет в наличии</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Дата */}
                                            <div className="FiltersDropdown_group">
                                                <label>Дата</label>
                                                <div className="FiltersDropdown_date-row">
                                                    <div
                                                        className="FiltersDropdown_date"
                                                        onClick={(e) => {
                                                            e.currentTarget.querySelector('input[type="date"]').showPicker();
                                                        }}
                                                    >
                                                        <img src={CalendarIcon} alt="" />
                                                        <span>{formatDisplayDate(dateFrom)}</span>
                                                        <img src={GalochkaIcon} alt="" />
                                                        <input
                                                            type="date"
                                                            value={dateFrom}
                                                            onChange={(e) => setDateFrom(e.target.value)}
                                                            className="FiltersDate_input"
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    </div>

                                                    <div
                                                        className="FiltersDropdown_date"
                                                        onClick={(e) => {
                                                            e.currentTarget.querySelector('input[type="date"]').showPicker();
                                                        }}
                                                    >
                                                        <img src={CalendarIcon} alt="" />
                                                        <span>{formatDisplayDate(dateTo)}</span>
                                                        <img src={GalochkaIcon} alt="" />
                                                        <input
                                                            type="date"
                                                            value={dateTo}
                                                            onChange={(e) => setDateTo(e.target.value)}
                                                            className="FiltersDate_input"
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
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
                                                                left: `${((priceMin - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                                                                right: `${100 - ((priceMax - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                                                            }}
                                                        />
                                                    </div>

                                                    <input
                                                        type="range"
                                                        min={MIN_PRICE}
                                                        max={MAX_PRICE}
                                                        value={priceMin}
                                                        onChange={(e) => {
                                                            const val = Math.min(Number(e.target.value), priceMax - 1);
                                                            setPriceMin(val);
                                                        }}
                                                        className="FiltersDropdown_thumb FiltersDropdown_thumb--min"
                                                    />

                                                    <input
                                                        type="range"
                                                        min={MIN_PRICE}
                                                        max={MAX_PRICE}
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

                        <ProductsTable
                            searchValue={searchValue}
                            category={category}
                            status={status}
                            dateFrom={dateFrom}
                            dateTo={dateTo}
                            priceMin={priceMin}
                            priceMax={priceMax}
                            onProductPreview={handleProductPreview}
                            allProducts={allProducts}
                        />
                    </div>
                </main>
            </div>

            {/* Модалка добавления товара */}
            {isAddModalOpen && (
                <>
                    <div className="AddProductOverlay" onClick={closeAddModal} />

                    <aside className="AddProductPanel" onClick={(e) => e.stopPropagation()}>
                        <div className="AddProductPanel_header">
                            <h2>Добавить товар</h2>
                            <button className="AddProductPanel_close" onClick={closeAddModal}>
                                ✕
                            </button>
                        </div>

                        <div className="AddProductPanel_body">
                            <div className="AddProductPanel_grid">
                                <div className="AddProductPanel_col">
                                    <div className="AddProductPanel_group">
                                        <label>Название товара</label>
                                        <input type="text" placeholder="Название товара" className="field-input" />
                                    </div>

                                    <div className="AddProductPanel_group">
                                        <label>Описание</label>
                                        <textarea placeholder="Описание товара" className="field-textarea field-textarea--description" />
                                    </div>

                                    <div className="AddProductPanel_block">
                                        <p className="AddProductPanel_block_title">Характеристики</p>

                                        {features.map((feat, index) => (
                                            <React.Fragment key={feat.id}>
                                                <p className="AddProductPanel_subtitle">Раздел №{index + 1}</p>
                                                <div className="AddProductPanel_group">
                                                    <input type="text" placeholder="Заголовок" className="field-input" />
                                                </div>
                                                <div className="AddProductPanel_group">
                                                    <input type="text" placeholder="Описание" className="field-input" />
                                                </div>
                                            </React.Fragment>
                                        ))}

                                        <button type="button" className="AddProductPanel_link" onClick={addFeature}>
                                            Добавить характеристику
                                        </button>
                                    </div>
                                </div>

                                <div className="AddProductPanel_col">
                                    <div className="AddProductPanel_block">
                                        <p className="AddProductPanel_block_title">Фото товара</p>

                                        <div className="AddProductPanel_group">
                                            <label className="AddProductPanel_upload AddProductPanel_upload--main">
                                                <input type="file" accept="image/*" multiple onChange={handleImagesUpload} className="AddProductPanel_upload_input" />
                                                <div className="AddProductPanel_upload_content">
                                                    <img src={DownloadIcon} alt="" />
                                                    <span>Перетащите фото или <button type="button">загрузите</button></span>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="AddProductPanel_photos_row">
                                            {images.map((img) => (
                                                <div key={img.id} className="AddProductPanel_photo_small">
                                                    <img src={img.url} alt="" className="AddProductPanel_photo_img" />
                                                    <div className="AddProductPanel_photo_actions">
                                                        <button type="button" className="AddProductPanel_icon-btn" onClick={() => handleRemoveImage(img.id)}>
                                                            <img src={DeleteIcon} alt="Удалить" />
                                                        </button>
                                                        <button type="button" className="AddProductPanel_icon-btn">
                                                            <img src={PointerIcon} alt="Еще" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="AddProductPanel_inline">
                                        <div className="AddProductPanel_group">
                                            <label>Количество</label>
                                            <input type="text" placeholder="1 шт." className="field-input" />
                                        </div>
                                    </div>

                                    <div className="AddProductPanel_inline AddProductPanel_inline--2">
                                        <div className="AddProductPanel_group">
                                            <label>Себестоимость</label>
                                            <input type="text" placeholder="10 000 ₽" className="field-input" />
                                        </div>
                                        <div className="AddProductPanel_group">
                                            <label>Цена</label>
                                            <input type="text" placeholder="20 000 ₽" className="field-input" />
                                        </div>
                                    </div>

                                    <div className="AddProductPanel_group">
                                        <label>Раздел каталога</label>
                                        <select className="field-input">
                                            <option>Раздел каталога</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="AddProductPanel_row">
                                <div className="AddProductPanel_block">
                                    <p className="AddProductPanel_block_title AddProductPanel_block_title--accent">Сертификаты</p>

                                    {certs.map((cert) => (
                                        <div className="AddProductPanel_group" key={cert.id}>
                                            <label>Заголовок</label>
                                            <input type="text" placeholder="Заголовок" className="field-input" />

                                            <label>Файл документа</label>
                                            <label className="AddProductPanel_upload AddProductPanel_upload--main">
                                                <input type="file" accept=".pdf,.jpg,.png,.doc,.docx" className="AddProductPanel_upload_input" />
                                                <div className="AddProductPanel_upload_content">
                                                    <img src={DownloadIcon} alt="" />
                                                    <span>Перетащите файл или <button type="button">загрузите</button></span>
                                                </div>
                                            </label>
                                        </div>
                                    ))}

                                    <button type="button" className="AddProductPanel_link" onClick={addCert}>
                                        Добавить еще
                                    </button>
                                </div>

                                <div className="AddProductPanel_block">
                                    <p className="AddProductPanel_block_title AddProductPanel_block_title--accent">Дополнительные товары</p>

                                    {extraProducts.map((ep) => (
                                        <div className="AddProductPanel_group" key={ep.id}>
                                            <label>Выбрать товар</label>
                                            <button type="button" className="AddProductPanel_select-btn">
                                                Выбрать из каталога
                                            </button>
                                        </div>
                                    ))}

                                    <button type="button" className="AddProductPanel_link" onClick={addExtraProduct}>
                                        Добавить еще
                                    </button>
                                </div>
                            </div>

                            <div className="AddProductPanel_bottom-row">
                                <div className="AddProductPanel_group">
                                    <p className="AddProductPanel_block_title AddProductPanel_block_title--accent">Тип тоника</p>
                                    <label>Тип тоника</label>

                                    {tonicTypes.map(item => (
                                        <select key={item.id} className="field-input">
                                            <option>Тип тоника</option>
                                        </select>
                                    ))}

                                    <button type="button" className="AddProductPanel_link" onClick={addTonicType}>
                                        Добавить еще
                                    </button>
                                </div>

                                <div className="AddProductPanel_group">
                                    <p className="AddProductPanel_block_title AddProductPanel_block_title--accent">Вид пользы</p>
                                    <label>Вид пользы</label>

                                    {benefitTypes.map(item => (
                                        <select key={item.id} className="field-input">
                                            <option>Вид пользы</option>
                                        </select>
                                    ))}

                                    <button type="button" className="AddProductPanel_link" onClick={addBenefitType}>
                                        Добавить еще
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="AddProductPanel_footer">
                            <button className="AddProductPanel_save">Сохранить</button>
                            <button className="AddProductPanel_cancel" onClick={closeAddModal}>Отменить</button>
                        </div>
                    </aside>
                </>
            )}

            {/* Модалка предпросмотра товара */}
            <ProductModal
                isOpen={isPreviewOpen}
                onClose={closePreview}
                product={selectedProduct}
            />
        </div>
    );
};

export default ProductsPage;
