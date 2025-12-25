// src/components/ArticleTabs/ArticleTabs.jsx
import React, { useState } from 'react';
import './ArticleTabs.css';

const ArticleTabs = () => {
    const [activeTab, setActiveTab] = useState('all');

    const tabs = [
        { id: 'all', label: 'Все', count: 255 },
        { id: 'categories', label: 'Рубрики', count: 255 }
    ];

    return (
        <div className="ArticleTabs">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`ArticleTabs_tab ${activeTab === tab.id ? 'ArticleTabs_tab_active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                >
                    {tab.label}
                    <span className="ArticleTabs_badge">{tab.count}</span>
                </button>
            ))}
        </div>
    );
};

export default ArticleTabs;
