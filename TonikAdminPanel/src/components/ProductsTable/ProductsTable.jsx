// src/components/ProductsTable/ProductsTable.jsx
import React, { useState } from 'react';
import './ProductsTable.css';
import Pagination from '../Pagination/Pagination';

const ProductsTable = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const products = [
        { id: 1, name: 'Название товара', productId: 'B111AA', category: 'Категория', views: 25, price: '20 222 ₽', quantity: 25, active: false },
        { id: 2, name: 'Название товара', productId: 'B111AA', category: 'Категория', views: 23, price: '50 500 ₽', quantity: 23, active: true },
        { id: 3, name: 'Название товара', productId: 'B111AA', category: 'Категория', views: 42, price: '50 500 ₽', quantity: 42, active: true },
        { id: 4, name: 'Название товара', productId: 'B111AA', category: 'Категория', views: 20, price: '20 222 ₽', quantity: 20, active: false },
        { id: 5, name: 'Название товара', productId: 'B111AA', category: 'Категория', views: 55, price: '20 222 ₽', quantity: 55, active: false },
        { id: 6, name: 'Название товара', productId: 'B111AA', category: 'Категория', views: 5, price: '20 222 ₽', quantity: 5, active: false },
        { id: 7, name: 'Название товара', productId: 'B111AA', category: 'Категория', views: 20, price: '50 500 ₽', quantity: 20, active: true },
        { id: 8, name: 'Название товара', productId: 'B111AA', category: 'Категория', views: 102, price: '50 500 ₽', quantity: 102, active: true },
        { id: 9, name: 'Название товара', productId: 'B111AA', category: 'Категория', views: 42, price: '50 500 ₽', quantity: 42, active: true },
        { id: 10, name: 'Название товара', productId: 'B111AA', category: 'Категория', views: 60, price: '20 222 ₽', quantity: 60, active: false }
    ];

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedProducts(products.map(p => p.id));
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
        // Здесь будет логика переключения статуса товара
        console.log('Toggle active for product:', id);
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
                                checked={selectedProducts.length === products.length}
                                onChange={handleSelectAll}
                                className="ProductsTable_checkbox"
                            />
                        </th>
                        <th className="ProductsTable_th">
                            <div className="ProductsTable_th_inner">
                                НАЗВАНИЕ ТОВАРА
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M6 2V10M6 2L3 5M6 2L9 5" stroke="white" strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </th>
                        <th className="ProductsTable_th">
                            <div className="ProductsTable_th_inner">
                                ID ТОВАРА
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M6 2V10M6 2L3 5M6 2L9 5" stroke="white" strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </th>
                        <th className="ProductsTable_th">
                            <div className="ProductsTable_th_inner">
                                КАТЕГОРИЯ
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M6 2V10M6 2L3 5M6 2L9 5" stroke="white" strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </th>
                        <th className="ProductsTable_th">
                            <div className="ProductsTable_th_inner">
                                ПРОСМОТРЫ
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M6 2V10M6 2L3 5M6 2L9 5" stroke="white" strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </th>
                        <th className="ProductsTable_th">
                            <div className="ProductsTable_th_inner">
                                ЦЕНА
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M6 2V10M6 2L3 5M6 2L9 5" stroke="white" strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </th>
                        <th className="ProductsTable_th">
                            <div className="ProductsTable_th_inner">
                                КОЛИЧЕСТВО
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M6 2V10M6 2L3 5M6 2L9 5" stroke="white" strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </th>
                        <th className="ProductsTable_th">
                            <div className="ProductsTable_th_inner">
                                СОСТОЯНИЕ
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M6 2V10M6 2L3 5M6 2L9 5" stroke="white" strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="ProductsTable_tbody">
                    {products.map((product) => (
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
                            <td className="ProductsTable_td">{product.name}</td>
                            <td className="ProductsTable_td ProductsTable_td_secondary">{product.productId}</td>
                            <td className="ProductsTable_td">{product.category}</td>
                            <td className="ProductsTable_td">{product.views}</td>
                            <td className="ProductsTable_td">{product.price}</td>
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
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="ProductsTable_footer">
                <Pagination
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default ProductsTable;
