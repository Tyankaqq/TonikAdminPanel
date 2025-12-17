// src/App.jsx
import React from 'react';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/DashboardPage.jsx';
import './App.css';


function App() {
    return (
        <Layout>
            <Dashboard />
        </Layout>
    );
}

export default App;
