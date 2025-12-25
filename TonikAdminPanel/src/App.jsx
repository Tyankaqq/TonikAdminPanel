// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import DashboardPage from './pages/Dashboard/DashboardPage.jsx';
import ProductsPage from './pages/ProductsPage/ProductsPage.jsx';
import './App.css';
import ArticlesPage from "./pages/ArticlePage/ArticlesPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="content" element={<ArticlesPage/>} />
                    <Route path="promotion" element={<div>Promotion</div>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
