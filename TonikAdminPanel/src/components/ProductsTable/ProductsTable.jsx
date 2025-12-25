// src/components/ProductsTable/ProductsTable.jsx
import React, { useState, useMemo } from 'react';
import './ProductsTable.css';
import Pagination from '../Pagination/Pagination';
import PointerIcon from '../../assets/icons/pointer.svg';
import GalochkaIcon from '../../assets/icons/WhiteGalochka.png';

const ProductsTable = ({
                           searchValue = '',
                           category = 'all',
                           status = 'all',
                           dateFrom = '',
                           dateTo = '',
                           priceMin = 0,
                           priceMax = 100000,
                           onProductPreview,
                           onProductEdit,
                           allProducts = []
                       }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [openMenuId, setOpenMenuId] = useState(null);

    const ITEMS_PER_PAGE = 10; // Товаров на странице

    // Сортировка
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    // Функция нормализации для поиска
    const normalize = (str) => str.toLowerCase().trim();

    // Фильтрация товаров
    const filteredProducts = useMemo(() => {
        return allProducts.filter((p) => {
            // Поиск по названию, ID товара или числовому ID
            if (searchValue) {
                const search = normalize(searchValue);
                const matchName = normalize(p.name).includes(search);
                const matchProductId = normalize(p.productId).includes(search);
                const matchId = p.id.toString().includes(search);
                if (!matchName && !matchProductId && !matchId) return false;
            }

            // Фильтр по категории
            if (category !== 'all' && p.category !== category) return false;

            // Фильтр по статусу
            if (status !== 'all' && p.status !== status) return false;

            // Фильтр по дате
            if (dateFrom && p.date < dateFrom) return false;
            if (dateTo && p.date > dateTo) return false;

            // Фильтр по цене
            if (p.price < priceMin || p.price > priceMax) return false;

            return true;
        });
    }, [allProducts, searchValue, category, status, dateFrom, dateTo, priceMin, priceMax]);

    // Сортировка отфильтрованных товаров
    const sortedProducts = useMemo(() => {
        if (!sortField) return filteredProducts;

        const sorted = [...filteredProducts].sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];

            // Для строк используем localeCompare
            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
                return sortDirection === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            // Для чисел
            return sortDirection === 'asc'
                ? aValue - bValue
                : bValue - aValue;
        });

        return sorted;
    }, [filteredProducts, sortField, sortDirection]);

    // Пагинация - товары для текущей страницы
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return sortedProducts.slice(startIndex, endIndex);
    }, [sortedProducts, currentPage]);

    // Общее количество страниц
    const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

    // Обработчик клика на заголовок колонки
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
        setCurrentPage(1); // Сброс на первую страницу при сортировке
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedProducts(paginatedProducts.map(p => p.id));
        } else {
            setSelectedProducts([]);
        }
    };

    const handleSelectProduct = (id) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter(pId => pId !== id));
        } else {
            setSelectedProducts([...selectedProducts, id]);
        }
    };

    const handleToggleActive = (id) => {
        console.log('Toggle active for product:', id);
    };

    const toggleRowMenu = (id) => {
        setOpenMenuId(prev => (prev === id ? null : id));
    };

    const handleProductClick = (productId) => {
        if (onProductPreview) {
            onProductPreview(productId);
        }
    };

    const handlePreviewClick = (productId) => {
        setOpenMenuId(null);
        if (onProductPreview) {
            onProductPreview(productId);
        }
    };

    const handleEditClick = (productId) => {
        setOpenMenuId(null);
        if (onProductEdit) {
            onProductEdit(productId);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setOpenMenuId(null); // Закрываем открытое меню при смене страницы
    };

    const formatPrice = (price) => {
        return `${price.toLocaleString('ru-RU')} ₽`;
    };

    const formatCategory = (cat) => {
        const map = {
            'tonics': 'Тоники',
            'creams': 'Кремы',
            'serums': 'Сыворотки'
        };
        return map[cat] || cat;
    };

    // Индикатор направления сортировки
    const getSortIcon = (field) => {
        if (sortField !== field) {
            return <img src={GalochkaIcon} alt="" className="ProductsTable_sort-icon" />;
        }
        return (
            <img
                src={GalochkaIcon}
                alt=""
                className="ProductsTable_sort-icon ProductsTable_sort-icon--active"
                style={{
                    transform: sortDirection === 'desc' ? 'rotate(180deg)' : 'rotate(0deg)',
                    opacity: 1
                }}
            />
        );
    };

    return (
        <div className="ProductsTable">
            <div className="ProductsTable_wrapper">
                <table className="ProductsTable_table">
                    <thead className="ProductsTable_thead">
                    <tr>
                        <th className="ProductsTable_th ProductsTable_th_checkbox">
                            <input
                                type="checkbox"
                                checked={paginatedProducts.length > 0 && selectedProducts.length === paginatedProducts.length}
                                onChange={handleSelectAll}
                                className="ProductsTable_checkbox"
                            />
                        </th>

                        <th className="ProductsTable_th" onClick={() => handleSort('name')}>
                            <div className="ProductsTable_th_inner">
                                НАЗВАНИЕ ТОВАРА
                                {getSortIcon('name')}
                            </div>
                        </th>

                        <th className="ProductsTable_th" onClick={() => handleSort('productId')}>
                            <div className="ProductsTable_th_inner">
                                ID ТОВАРА
                                {getSortIcon('productId')}
                            </div>
                        </th>

                        <th className="ProductsTable_th" onClick={() => handleSort('category')}>
                            <div className="ProductsTable_th_inner">
                                КАТЕГОРИЯ
                                {getSortIcon('category')}
                            </div>
                        </th>

                        <th className="ProductsTable_th" onClick={() => handleSort('views')}>
                            <div className="ProductsTable_th_inner">
                                ПРОСМОТРЫ
                                {getSortIcon('views')}
                            </div>
                        </th>

                        <th className="ProductsTable_th" onClick={() => handleSort('price')}>
                            <div className="ProductsTable_th_inner">
                                ЦЕНА
                                {getSortIcon('price')}
                            </div>
                        </th>

                        <th className="ProductsTable_th" onClick={() => handleSort('quantity')}>
                            <div className="ProductsTable_th_inner">
                                КОЛИЧЕСТВО
                                {getSortIcon('quantity')}
                            </div>
                        </th>

                        <th className="ProductsTable_th" onClick={() => handleSort('active')}>
                            <div className="ProductsTable_th_inner">
                                СОСТОЯНИЕ
                                {getSortIcon('active')}
                            </div>
                        </th>
                    </tr>
                    </thead>

                    <tbody className="ProductsTable_tbody">
                    {paginatedProducts.length === 0 ? (
                        <tr>
                            <td colSpan="8" style={{ textAlign: 'center', padding: '2vw', color: 'rgba(255,255,255,0.4)' }}>
                                Товары не найдены
                            </td>
                        </tr>
                    ) : (
                        paginatedProducts.map((product) => (
                            <tr
                                key={product.id}
                                className={`ProductsTable_row ${product.active ? 'ProductsTable_row_active' : ''}`}
                            >
                                <td className="ProductsTable_td ProductsTable_td_checkbox">
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.includes(product.id)}
                                        onChange={() => handleSelectProduct(product.id)}
                                        className="ProductsTable_checkbox"
                                    />
                                </td>

                                <td className="ProductsTable_td">
                                    <div className="ProductsTable_name-wrap">
                                        <span
                                            className="ProductsTable_name ProductsTable_name--clickable"
                                            onClick={() => handleProductClick(product.id)}
                                        >
                                            {product.name}
                                        </span>

                                        <button
                                            type="button"
                                            className="ProductsTable_more-btn"
                                            onClick={() => toggleRowMenu(product.id)}
                                        >
                                            <img src={PointerIcon} alt="Еще" />
                                        </button>

                                        {openMenuId === product.id && (
                                            <div className="ProductsTable_context">
                                                <button
                                                    type="button"
                                                    onClick={() => handlePreviewClick(product.id)}
                                                >
                                                    Предпросмотр
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleEditClick(product.id)}
                                                >
                                                    Редактировать
                                                </button>
                                                <button type="button">Удалить</button>
                                            </div>
                                        )}
                                    </div>
                                </td>

                                <td className="ProductsTable_td ProductsTable_td_secondary">
                                    {product.productId}
                                </td>
                                <td className="ProductsTable_td">{formatCategory(product.category)}</td>
                                <td className="ProductsTable_td">{product.views}</td>
                                <td className="ProductsTable_td">{formatPrice(product.price)}</td>
                                <td className="ProductsTable_td">{product.quantity}</td>

                                <td className="ProductsTable_td">
                                    <label className="ProductsTable_toggle">
                                        <input
                                            type="checkbox"
                                            checked={product.active}
                                            onChange={() => handleToggleActive(product.id)}
                                            className="ProductsTable_toggle_input"
                                        />
                                        <span className="ProductsTable_toggle_slider"></span>
                                        <span className="ProductsTable_toggle_label">
                                            {product.active ? 'Активный' : 'Не активный'}
                                        </span>
                                    </label>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            <div className="ProductsTable_footer">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default ProductsTable;
