// src/components/CategoryPieChart/CategoryPieChart.jsx
import React from 'react';
import './CategoryPieChart.css';

const CategoryPieChart = () => {
    const mainPercentage = 95;
    const additionalPercentage = 5;

    const circumference = 2 * Math.PI * 100;
    const mainStrokeDasharray = `${(mainPercentage / 100) * circumference} ${circumference}`;
    const additionalStrokeDasharray = `${(additionalPercentage / 100) * circumference} ${circumference}`;
    const additionalStrokeDashoffset = -((mainPercentage / 100) * circumference);

    return (
        <div className="CategoryPieChart">
            <div className="CategoryPieChart_header">
                <h3 className="CategoryPieChart_title">Продажи в категории</h3>
            </div>

            <div className="CategoryPieChart_content">
                <div className="CategoryPieChart_chart">
                    <svg viewBox="0 0 240 240" className="CategoryPieChart_svg">
                        <circle
                            cx="120"
                            cy="120"
                            r="100"
                            fill="none"
                            stroke="#82cbff"
                            strokeWidth="40"
                            strokeDasharray={additionalStrokeDasharray}
                            strokeDashoffset={additionalStrokeDashoffset}
                            transform="rotate(-90 120 120)"
                        />

                        <circle
                            cx="120"
                            cy="120"
                            r="100"
                            fill="none"
                            stroke="#2600ff"
                            strokeWidth="40"
                            strokeDasharray={mainStrokeDasharray}
                            transform="rotate(-90 120 120)"
                        />

                        <text
                            x="120"
                            y="110"
                            textAnchor="middle"
                            fill="rgba(255, 255, 255, 0.6)"
                            fontSize="14"
                            fontWeight="400"
                        >
                            Количество
                        </text>

                        <text
                            x="120"
                            y="135"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="18"
                            fontWeight="600"
                        >
                            25К рублей
                        </text>
                    </svg>
                </div>

                <div className="CategoryPieChart_legend">
                    <div className="CategoryPieChart_legend_item">
                        <span className="CategoryPieChart_legend_dot main"></span>
                        <span className="CategoryPieChart_legend_label">
                            Основная продукция ({mainPercentage}%)
                        </span>
                    </div>
                    <div className="CategoryPieChart_legend_item">
                        <span className="CategoryPieChart_legend_dot additional"></span>
                        <span className="CategoryPieChart_legend_label">
                            Доп. продукция ({additionalPercentage}%)
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPieChart;
