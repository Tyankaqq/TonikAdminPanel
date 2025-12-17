// src/components/Layout/Layout.jsx
import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="Layout">
            <Header />
            <div className="Layout_container">
                <Sidebar />
                <main className="Layout_main">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
