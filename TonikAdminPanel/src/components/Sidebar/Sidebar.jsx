// src/components/Sidebar/Sidebar.jsx
import React, { useState } from 'react';
import './Sidebar.css';
import dashboardIcon from '../../assets/icons/dashboard.svg';
import saleIcon from '../../assets/icons/sale.svg';
import promotionIcon from '../../assets/icons/promotion.svg';
import contentIcon from '../../assets/icons/content.svg';

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('dashboard');

    const menuItems = [
        { id: 'dashboard', label: 'Дашборд', icon: dashboardIcon },
        { id: 'sales', label: 'Продажи', icon: saleIcon },
        { id: 'promotion', label: 'Продвижение', icon: promotionIcon },
        { id: 'content', label: 'Наполнение', icon: contentIcon }
    ];

    const handleClick = (itemId) => {
        setActiveItem(itemId);
        console.log('Активный пункт:', itemId);
    };

    return (
        <aside className="Sidebar">
            <nav className="Sidebar_nav">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`Sidebar_item ${activeItem === item.id ? 'active' : ''}`}
                        onClick={() => handleClick(item.id)}
                    >
                        <span className="Sidebar_item_icon">
                            <img src={item.icon} alt={item.label} />
                        </span>
                        <span className="Sidebar_item_label">{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
