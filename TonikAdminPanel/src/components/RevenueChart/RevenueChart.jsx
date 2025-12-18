// src/components/RevenueChart/RevenueChart.jsx
import React, { useState, useEffect } from 'react';
import './RevenueChart.css';

const RevenueChart = () => {
    const [deviceType, setDeviceType] = useState('desktop');

    // Данные для разных устройств
    const chartData = {
        desktop: {
            income: [
                { month: 'Мар.', value: 20 },
                { month: 'Апр.', value: 18 },
                { month: 'Май', value: 25 },
                { month: 'Июн.', value: 5 },
                { month: 'Июл.', value: 17 }
            ],
            views: [
                { month: 'Мар.', value: 10 },
                { month: 'Апр.', value: 10 },
                { month: 'Май', value: 15 },
                { month: 'Июн.', value: 12 },
                { month: 'Июл.', value: 28 }
            ]
        },
        tablet: {
            income: [
                { month: 'Фев.', value: 15 },
                { month: 'Мар.', value: 20 },
                { month: 'Апр.', value: 18 },
                { month: 'Май', value: 25 },
                { month: 'Июн.', value: 5 },
                { month: 'Июл.', value: 17 },
                { month: 'Авг.', value: 22 }
            ],
            views: [
                { month: 'Фев.', value: 8 },
                { month: 'Мар.', value: 10 },
                { month: 'Апр.', value: 10 },
                { month: 'Май', value: 15 },
                { month: 'Июн.', value: 12 },
                { month: 'Июл.', value: 28 },
                { month: 'Авг.', value: 30 }
            ]
        },
        mobile: {
            income: [
                { month: 'Июн.', value: 5 },
                { month: 'Июл.', value: 17 },
                { month: 'Авг.', value: 22 }
            ],
            views: [
                { month: 'Июн.', value: 12 },
                { month: 'Июл.', value: 28 },
                { month: 'Авг.', value: 30 }
            ]
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 767) {
                setDeviceType('mobile');
            } else if (width <= 1024) {
                setDeviceType('tablet');
            } else {
                setDeviceType('desktop');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const incomeData = chartData[deviceType].income;
    const viewsData = chartData[deviceType].views;
    const maxValue = 40;

    return (
        <div className="RevenueChart">
            <div className="RevenueChart_header">
                <h3 className="RevenueChart_title">Доход/просмотры</h3>

                <div className="RevenueChart_tabs">
                    <div className="RevenueChart_tab">
                        <span className="RevenueChart_tab_indicator income"></span>
                        Доход
                    </div>
                    <div className="RevenueChart_tab">
                        <span className="RevenueChart_tab_indicator views"></span>
                        Просмотры
                    </div>
                </div>
            </div>

            <div className="RevenueChart_graph">
                <div className="RevenueChart_y_axis">
                    {[40, 30, 20, 10, 0].map((value) => (
                        <span key={value} className="RevenueChart_y_label">
                            {value}
                        </span>
                    ))}
                </div>

                <div className="RevenueChart_plot">
                    <svg
                        className="RevenueChart_svg"
                        viewBox="0 0 500 200"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id="incomeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgba(205, 255, 255, 0.1)" />
                                <stop offset="100%" stopColor="rgba(205, 255, 255, 0)" />
                            </linearGradient>
                            <linearGradient id="viewsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgba(38, 0, 255, 0.1)" />
                                <stop offset="100%" stopColor="rgba(38, 0, 255, 0)" />
                            </linearGradient>
                        </defs>

                        {/* Горизонтальные линии сетки */}
                        {[0, 1, 2, 3, 4].map((i) => (
                            <line
                                key={`h-${i}`}
                                x1="0"
                                y1={i * 50}
                                x2="500"
                                y2={i * 50}
                                stroke="rgba(255, 255, 255, 1)"
                                strokeWidth="1"
                            />
                        ))}

                        {/* Вертикальные линии сетки */}
                        {incomeData.map((_, index) => {
                            const x = (index / (incomeData.length - 1)) * 500;
                            return (
                                <line
                                    key={`v-${index}`}
                                    x1={x}
                                    y1="0"
                                    x2={x}
                                    y2="200"
                                    stroke="rgba(255, 255, 255, 1)"
                                    strokeWidth="1"
                                />
                            );
                        })}

                        {/* График Доходов (бирюзовая линия) */}
                        <polyline
                            points={incomeData
                                .map((point, index) => {
                                    const x = (index / (incomeData.length - 1)) * 500;
                                    const y = 200 - (point.value / maxValue) * 200;
                                    return `${x},${y}`;
                                })
                                .join(' ')}
                            fill="none"
                            stroke="rgba(205, 255, 255, 1)"
                            strokeWidth="2"
                        />

                        {/* Точки для Доходов */}
                        {incomeData.map((point, index) => {
                            const x = (index / (incomeData.length - 1)) * 500;
                            const y = 200 - (point.value / maxValue) * 200;
                            return (
                                <circle
                                    key={`income-${index}`}
                                    cx={x}
                                    cy={y}
                                    r="4"
                                    fill="rgba(205, 255, 255, 1)"
                                    stroke="none"
                                />
                            );
                        })}

                        {/* График Просмотров (синяя линия) */}
                        <polyline
                            points={viewsData
                                .map((point, index) => {
                                    const x = (index / (viewsData.length - 1)) * 500;
                                    const y = 200 - (point.value / maxValue) * 200;
                                    return `${x},${y}`;
                                })
                                .join(' ')}
                            fill="none"
                            stroke="#2600ff"
                            strokeWidth="2"
                        />

                        {/* Точки для Просмотров */}
                        {viewsData.map((point, index) => {
                            const x = (index / (viewsData.length - 1)) * 500;
                            const y = 200 - (point.value / maxValue) * 200;
                            return (
                                <circle
                                    key={`views-${index}`}
                                    cx={x}
                                    cy={y}
                                    r="4"
                                    fill="#2600ff"
                                    stroke="none"
                                />
                            );
                        })}
                    </svg>

                    <div className="RevenueChart_x_axis">
                        {incomeData.map((point, index) => (
                            <span key={index} className="RevenueChart_x_label">
                                {point.month}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueChart;
