// src/pages/Dashboard/DashboardPage.jsx
import React from 'react';
import StatCard from '../../components/StatCard/StatCard';
import RevenueChart from '../../components/RevenueChart/RevenueChart';
import CategoryPieChart from '../../components/CategoryPieChart/CategoryPieChart';
import TopProductsTable from '../../components/TopProductsTable/TopProductsTable';
import './DashboardPage.css';

const DashboardPage = () => {
    const statsData = [
        {
            id: 1,
            title: 'Общий объем продаж',
            value: '25 000 ₽',
            change: '+5%',
            isPositive: true,
            description: 'по сравнению с предыдущим месяцем'
        },
        {
            id: 2,
            title: 'Общий объем выручки',
            value: '14 220 ₽',
            change: '-7%',
            isPositive: false,
            description: 'по сравнению с предыдущим месяцем'
        },
        {
            id: 3,
            title: 'Общий объем заказов',
            value: '1452 шт.',
            change: '+5%',
            isPositive: true,
            description: 'по сравнению с предыдущим месяцем'
        },
        {
            id: 4,
            title: 'Общее количество посетителей',
            value: '542',
            change: '+5%',
            isPositive: true,
            description: 'по сравнению с предыдущим месяцем'
        }
    ];

    return (
        <>
            {/* ДЕСКТОП ВЕРСИЯ - ИСПРАВЛЕНО */}
            <div className="Dashboard">
                <div className="Dashboard_main">
                    <div className="Dashboard_charts">
                        <RevenueChart />
                        <CategoryPieChart />
                    </div>
                    <TopProductsTable />
                </div>

                <div className="Dashboard_sidebar">
                    {statsData.map((stat) => (
                        <StatCard
                            key={stat.id}
                            title={stat.title}
                            value={stat.value}
                            change={stat.change}
                            isPositive={stat.isPositive}
                            description={stat.description}
                        />
                    ))}
                </div>
            </div>

            {/* ПЛАНШЕТ/МОБИЛКА ВЕРСИЯ - НЕ ТРОГАЕМ */}
            <div className="Dashboard_tablet">
                <div className="Dashboard_tablet_revenue">
                    <RevenueChart />
                </div>

                <div className="Dashboard_tablet_middle">
                    <div className="Dashboard_tablet_left">
                        <div className="Dashboard_tablet_category">
                            <CategoryPieChart />
                        </div>
                        <div className="Dashboard_tablet_orders">
                            <StatCard
                                title={statsData[2].title}
                                value={statsData[2].value}
                                change={statsData[2].change}
                                isPositive={statsData[2].isPositive}
                                description={statsData[2].description}
                            />
                        </div>
                    </div>

                    <div className="Dashboard_tablet_right">
                        <StatCard
                            title={statsData[0].title}
                            value={statsData[0].value}
                            change={statsData[0].change}
                            isPositive={statsData[0].isPositive}
                            description={statsData[0].description}
                        />
                        <StatCard
                            title={statsData[1].title}
                            value={statsData[1].value}
                            change={statsData[1].change}
                            isPositive={statsData[1].isPositive}
                            description={statsData[1].description}
                        />
                        <StatCard
                            title={statsData[3].title}
                            value={statsData[3].value}
                            change={statsData[3].change}
                            isPositive={statsData[3].isPositive}
                            description={statsData[3].description}
                        />
                    </div>
                </div>

                <div className="Dashboard_tablet_table">
                    <TopProductsTable />
                </div>
            </div>
        </>
    );
};

export default DashboardPage;
