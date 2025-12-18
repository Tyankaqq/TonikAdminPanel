// src/components/TopProductsTable/TopProductsTable.jsx
import React, { useState, useEffect } from 'react';
import './TopProductsTable.css';

const TopProductsTable = () => {
    const [isMobile, setIsMobile] = useState(false);

    const products = [
        {
            id: 1,
            name: 'Название товара',
            quantity: 125,
            sales: 125,
            views: 146,
            revenue: '20 222 ₽'
        },
        {
            id: 2,
            name: 'Название товара',
            quantity: 125,
            sales: 125,
            views: 146,
            revenue: '20 222 ₽'
        },
        {
            id: 3,
            name: 'Название товара',
            quantity: 125,
            sales: 125,
            views: 146,
            revenue: '20 222 ₽'
        },
        {
            id: 4,
            name: 'Название товара',
            quantity: 125,
            sales: 125,
            views: 146,
            revenue: '20 222 ₽'
        },
        {
            id: 5,
            name: 'Название товара',
            quantity: 125,
            sales: 125,
            views: 146,
            revenue: '20 222 ₽'
        },
        {
            id: 6,
            name: 'Название товара',
            quantity: 125,
            sales: 125,
            views: 146,
            revenue: '20 222 ₽'
        },
        {
            id: 7,
            name: 'Название товара',
            quantity: 125,
            sales: 125,
            views: 146,
            revenue: '20 222 ₽'
        },
        {
            id: 8,
            name: 'Название товара',
            quantity: 125,
            sales: 125,
            views: 146,
            revenue: '20 222 ₽'
        },
        {
            id: 9,
            name: 'Название товара',
            quantity: 125,
            sales: 125,
            views: 146,
            revenue: '20 222 ₽'
        },
        {
            id: 10,
            name: 'Название товара',
            quantity: 125,
            sales: 125,
            views: 146,
            revenue: '20 222 ₽'
        }
    ];

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="TopProductsTable">
            <div className="TopProductsTable_header">
                <h3 className="TopProductsTable_title">10 лучших товаров месяца</h3>
            </div>

            <div className="TopProductsTable_wrapper">
                <table className="TopProductsTable_table">
                    <thead className="TopProductsTable_thead">
                    <tr>
                        <th className="TopProductsTable_th">№</th>
                        <th className="TopProductsTable_th">НАЗВАНИЕ ТОВАРА</th>
                        <th className="TopProductsTable_th">{isMobile ? 'КОЛ-ВО' : 'КОЛИЧЕСТВО'}</th>
                        {!isMobile && (
                            <>
                                <th className="TopProductsTable_th">ПРОДАЖИ</th>
                                <th className="TopProductsTable_th">ПРОСМОТРЫ</th>
                                <th className="TopProductsTable_th">ВЫРУЧКА</th>
                            </>
                        )}
                    </tr>
                    </thead>
                    <tbody className="TopProductsTable_tbody">
                    {products.map((product) => (
                        <tr key={product.id} className="TopProductsTable_row">
                            <td className="TopProductsTable_td">{product.id}</td>
                            <td className="TopProductsTable_td">{product.name}</td>
                            <td className="TopProductsTable_td">{product.quantity}</td>
                            {!isMobile && (
                                <>
                                    <td className="TopProductsTable_td">{product.sales}</td>
                                    <td className="TopProductsTable_td">{product.views}</td>
                                    <td className="TopProductsTable_td">{product.revenue}</td>
                                </>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopProductsTable;
