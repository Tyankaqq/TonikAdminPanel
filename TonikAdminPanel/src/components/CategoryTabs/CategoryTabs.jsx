// src/components/CategoryTabs/CategoryTabs.jsx
import React, { useState } from 'react';
import './CategoryTabs.css';

const CategoryTabs = () => {
    const [activeTab, setActiveTab] = useState('all');

    const tabs = [
        { id: 'all', label: 'Все', count: 1000 },
        { id: 'amphelcia', label: 'Амфельция', count: 254 },
        { id: 'laminaria', label: 'Ламинария', count: 320 },
        { id: 'fucus', label: 'Фукус', count: 150 },
        { id: 'andara', label: 'Андара', count: 180 },
        { id: 'corbikula', label: 'Корбикула', count: 96 },
        { id: 'zostera', label: 'Зостера', count: 200 }
    ];

    return (
        <div className="CategoryTabs">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`CategoryTabs_tab ${activeTab === tab.id ? 'CategoryTabs_tab_active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                >
                    {tab.label}
                    <span className="CategoryTabs_badge">{tab.count}</span>
                </button>
            ))}
        </div>
    );
};

export default CategoryTabs;
