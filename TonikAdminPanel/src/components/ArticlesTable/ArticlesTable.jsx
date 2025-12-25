// src/components/ArticlesTable/ArticlesTable.jsx
import React, { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import WhiteGalochka from '../../assets/icons/WhiteGalochka.png';
import PointerIcon from '../../assets/icons/pointer.svg';
import './ArticlesTable.css';

const ArticlesTable = ({ articles, searchValue }) => {
    const [selectedArticles, setSelectedArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedArticles(articles.map(a => a.id));
        } else {
            setSelectedArticles([]);
        }
    };

    const handleSelectArticle = (id) => {
        if (selectedArticles.includes(id)) {
            setSelectedArticles(selectedArticles.filter(aid => aid !== id));
        } else {
            setSelectedArticles([...selectedArticles, id]);
        }
    };

    const totalPages = 10;

    return (
        <div className="ArticlesTable">
            <div className="ArticlesTable_wrapper">
                <table className="ArticlesTable_table">
                    <thead>
                    <tr>
                        <th className="ArticlesTable_th ArticlesTable_th--checkbox">
                            <input
                                type="checkbox"
                                checked={selectedArticles.length === articles.length}
                                onChange={handleSelectAll}
                                className="ArticlesTable_checkbox"
                            />
                        </th>
                        <th className="ArticlesTable_th ArticlesTable_th--title">
                            <div className="ArticlesTable_th_content">
                                Название статьи
                                <button className="ArticlesTable_sort">
                                    <img src={WhiteGalochka} alt="" />
                                </button>
                            </div>
                        </th>
                        <th className="ArticlesTable_th ArticlesTable_th--category">
                            <div className="ArticlesTable_th_content">
                                Категория
                                <button className="ArticlesTable_sort">
                                    <img src={WhiteGalochka} alt="" />
                                </button>
                            </div>
                        </th>
                        <th className="ArticlesTable_th ArticlesTable_th--date">
                            <div className="ArticlesTable_th_content">
                                Дата публикации
                                <button className="ArticlesTable_sort">
                                    <img src={WhiteGalochka} alt="" />
                                </button>
                            </div>
                        </th>
                        <th className="ArticlesTable_th ArticlesTable_th--status">
                            <div className="ArticlesTable_th_content">
                                Состояние
                                <button className="ArticlesTable_sort">
                                    <img src={WhiteGalochka} alt="" />
                                </button>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {articles.map((article) => (
                        <tr key={article.id} className="ArticlesTable_row">
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedArticles.includes(article.id)}
                                    onChange={() => handleSelectArticle(article.id)}
                                    className="ArticlesTable_checkbox"
                                />
                            </td>
                            <td>
                                <div className="ArticlesTable_title_cell">
                                    <span>{article.title}</span>
                                    <button className="ArticlesTable_pointer">
                                        <img src={PointerIcon} alt="" />
                                    </button>
                                </div>
                            </td>
                            <td>{article.category}</td>
                            <td>{article.date}</td>
                            <td>
                                <label className="ArticlesTable_toggle">
                                    <input type="checkbox" defaultChecked={article.published} />
                                    <span className="ArticlesTable_toggle_slider"></span>
                                    <span className="ArticlesTable_toggle_text">
                                            {article.published ? 'Опубликовано' : 'Не опубликовано'}
                                        </span>
                                </label>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default ArticlesTable;
