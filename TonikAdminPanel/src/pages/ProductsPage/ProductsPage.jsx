// src/pages/Products/ProductsPage.jsx
import React, { useState } from 'react';
import './ProductsPage.css';

import CategoryTabs from '../../components/CategoryTabs/CategoryTabs';
import ProductsTable from '../../components/ProductsTable/ProductsTable';

import DownloadIcon from '../../assets/icons/download.png';
import PointerIcon from '../../assets/icons/pointer.png';
import DeleteIcon from '../../assets/icons/delete.png';
import GalochkaIcon from '../../assets/icons/BlackGalochka.png';
import Export from '../../assets/icons/export.png';
const ProductsPage = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [images, setImages] = useState([]); // [{ id, url, file }]
    const [tonicTypes, setTonicTypes] = useState([{ id: 1 }]);
    const [benefitTypes, setBenefitTypes] = useState([{ id: 1 }]);

    const addTonicType = () => {
        setTonicTypes(prev => [...prev, { id: crypto.randomUUID() }]);
    };

    const addBenefitType = () => {
        setBenefitTypes(prev => [...prev, { id: crypto.randomUUID() }]);
    };

    // динамические списки
    const [features, setFeatures] = useState([
        { id: 1, section: 'Раздел №1' },
    ]);

    const [certs, setCerts] = useState([{ id: 1 }]);

    const [extraProducts, setExtraProducts] = useState([{ id: 1 }]);

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);

    const handleImagesUpload = (event) => {
        const files = Array.from(event.target.files || []);
        if (!files.length) return;

        const newImages = files.map((file) => ({
            id: crypto.randomUUID(),
            url: URL.createObjectURL(file),
            file,
        }));

        setImages((prev) => [...prev, ...newImages].slice(0, 4)); // максимум 4
    };

    const handleRemoveImage = (id) => {
        setImages((prev) => prev.filter((img) => img.id !== id));
    };

    const addFeature = () => {
        setFeatures((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                section: `Раздел №${prev.length + 1}`,
            },
        ]);
    };

    const addCert = () => {
        setCerts((prev) => [...prev, { id: crypto.randomUUID() }]);
    };

    const addExtraProduct = () => {
        setExtraProducts((prev) => [...prev, { id: crypto.randomUUID() }]);
    };

    return (
        <div className="ProductsPage">
            {/* <Header /> */}
            {/* <Sidebar /> */}

            <div className="ProductsPage_container">
                <main className="ProductsPage_main">
                    <div className="ProductsPage_content">
                        <div className="ProductsPage_header">
                            <h1 className="ProductsPage_title">Товары</h1>

                            <div className="ProductsPage_actions">
                                <button className="ProductsPage_export">
                                    <div className="ProductsPage_export_button">
                                    <img src={Export} alt="" className="ProductsTable_sort-icon" />
                                    Экспортировать
                                    </div>
                                    <img src={GalochkaIcon} alt="" className="ProductsTable_sort-icon" />
                                </button>
                                <button
                                    className="ProductsPage_add"
                                    onClick={openAddModal}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path
                                            d="M10 4V16M4 10H16"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Табы сразу под заголовком */}
                        <CategoryTabs />

                        {/* Под табами поиск и фильтры */}
                        <div className="ProductsPage_controls">
                            <div className="ProductsPage_search">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <circle
                                        cx="9"
                                        cy="9"
                                        r="6"
                                        stroke="white"
                                        strokeOpacity="0.4"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        d="M14 14L17 17"
                                        stroke="white"
                                        strokeOpacity="0.4"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Поиск товара"
                                    className="ProductsPage_search_input"
                                />
                            </div>

                            <button className="ProductsPage_filters">
                                Фильтры
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path
                                        d="M4 6H16M6 10H14M8 14H12"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Таблица под контролами */}
                        <ProductsTable />
                    </div>
                </main>
            </div>

            {/* Модалка «Добавить товар» */}
            {isAddModalOpen && (
                <>
                    <div className="AddProductOverlay" onClick={closeAddModal} />

                    <aside
                        className="AddProductPanel"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="AddProductPanel_header">
                            <h2>Добавить товар</h2>
                            <button
                                className="AddProductPanel_close"
                                onClick={closeAddModal}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="AddProductPanel_body">
                            {/* Две основные колонки */}
                            <div className="AddProductPanel_grid">
                                {/* ЛЕВАЯ КОЛОНКА */}
                                <div className="AddProductPanel_col">
                                    {/* Название товара */}
                                    <div className="AddProductPanel_group">
                                        <label>Название товара</label>
                                        <input
                                            type="text"
                                            placeholder="Название товара"
                                            className="field-input"
                                        />
                                    </div>

                                    {/* Описание */}
                                    <div className="AddProductPanel_group">
                                        <label>Описание</label>
                                        <textarea
                                            placeholder="Описание товара"
                                            className="field-textarea field-textarea--description"
                                        />
                                    </div>

                                    {/* Характеристики */}
                                    <div className="AddProductPanel_block">
                                        <p className="AddProductPanel_block_title">
                                            Характеристики
                                        </p>

                                        {features.map((feat, index) => (
                                            <React.Fragment key={feat.id}>
                                                <p className="AddProductPanel_subtitle">
                                                    Раздел №{index + 1}
                                                </p>

                                                <div className="AddProductPanel_group">
                                                    <input
                                                        type="text"
                                                        placeholder="Заголовок"
                                                        className="field-input"
                                                    />
                                                </div>

                                                <div className="AddProductPanel_group">
                                                    <input
                                                        type="text"
                                                        placeholder="Описание"
                                                        className="field-input"
                                                    />
                                                </div>
                                            </React.Fragment>
                                        ))}

                                        <button
                                            type="button"
                                            className="AddProductPanel_link"
                                            onClick={addFeature}
                                        >
                                            Добавить характеристику
                                        </button>
                                    </div>
                                </div>

                                {/* ПРАВАЯ КОЛОНКА */}
                                <div className="AddProductPanel_col">
                                    {/* Фото товара */}
                                    <div className="AddProductPanel_block">
                                        <p className="AddProductPanel_block_title">
                                            Фото товара
                                        </p>

                                        <div className="AddProductPanel_group">
                                            <label className="AddProductPanel_upload AddProductPanel_upload--main">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleImagesUpload}
                                                    className="AddProductPanel_upload_input"
                                                />
                                                <div className="AddProductPanel_upload_content">
                                                    <img src={DownloadIcon} alt="" />
                                                    <span>
                                                        Перетащите фото или{' '}
                                                        <button type="button">
                                                            загрузите
                                                        </button>
                                                    </span>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="AddProductPanel_photos_row">
                                            {images.map((img) => (
                                                <div
                                                    key={img.id}
                                                    className="AddProductPanel_photo_small"
                                                >
                                                    <img
                                                        src={img.url}
                                                        alt=""
                                                        className="AddProductPanel_photo_img"
                                                    />

                                                    <div className="AddProductPanel_photo_actions">
                                                        <button
                                                            type="button"
                                                            className="AddProductPanel_icon-btn"
                                                            onClick={() =>
                                                                handleRemoveImage(img.id)
                                                            }
                                                        >
                                                            <img
                                                                src={DeleteIcon}
                                                                alt="Удалить"
                                                            />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="AddProductPanel_icon-btn"
                                                        >
                                                            <img
                                                                src={PointerIcon}
                                                                alt="Еще"
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Количество */}
                                    <div className="AddProductPanel_inline">
                                        <div className="AddProductPanel_group">
                                            <label>Количество</label>
                                            <input
                                                type="text"
                                                placeholder="1 шт."
                                                className="field-input"
                                            />
                                        </div>
                                    </div>

                                    {/* Себестоимость и цена */}
                                    <div className="AddProductPanel_inline AddProductPanel_inline--2">
                                        <div className="AddProductPanel_group">
                                            <label>Себестоимость</label>
                                            <input
                                                type="text"
                                                placeholder="10 000 ₽"
                                                className="field-input"
                                            />
                                        </div>
                                        <div className="AddProductPanel_group">
                                            <label>Цена</label>
                                            <input
                                                type="text"
                                                placeholder="20 000 ₽"
                                                className="field-input"
                                            />
                                        </div>
                                    </div>

                                    {/* Раздел каталога */}
                                    <div className="AddProductPanel_group">
                                        <label>Раздел каталога</label>
                                        <select className="field-input">
                                            <option>Раздел каталога</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Сертификаты слева, Доп.товары справа */}
                            <div className="AddProductPanel_row">
                                <div className="AddProductPanel_block">
                                    <p className="AddProductPanel_block_title AddProductPanel_block_title--accent">
                                        Сертификаты
                                    </p>

                                    {certs.map((cert) => (
                                        <div
                                            className="AddProductPanel_group"
                                            key={cert.id}
                                        >
                                            <label>Заголовок</label>
                                            <input
                                                type="text"
                                                placeholder="Заголовок"
                                                className="field-input"
                                            />

                                            <label>Файл документа</label>
                                            <label className="AddProductPanel_upload AddProductPanel_upload--main">
                                                <input
                                                    type="file"
                                                    accept=".pdf,.jpg,.png,.doc,.docx"
                                                    className="AddProductPanel_upload_input"
                                                />
                                                <div className="AddProductPanel_upload_content">
                                                    <img src={DownloadIcon} alt="" />
                                                    <span>
                                                        Перетащите файл или{' '}
                                                        <button type="button">
                                                            загрузите
                                                        </button>
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        className="AddProductPanel_link"
                                        onClick={addCert}
                                    >
                                        Добавить еще
                                    </button>
                                </div>

                                <div className="AddProductPanel_block">
                                    <p className="AddProductPanel_block_title AddProductPanel_block_title--accent">
                                        Дополнительные товары
                                    </p>

                                    {extraProducts.map((ep) => (
                                        <div
                                            className="AddProductPanel_group"
                                            key={ep.id}
                                        >
                                            <label>Выбрать товар</label>
                                            <button
                                                type="button"
                                                className="AddProductPanel_select-btn"
                                            >
                                                Выбрать из каталога
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        className="AddProductPanel_link"
                                        onClick={addExtraProduct}
                                    >
                                        Добавить еще
                                    </button>
                                </div>
                            </div>

                            {/* Тип тоника / Вид пользы */}
                            <div className="AddProductPanel_bottom-row">
                                <div className="AddProductPanel_group">
                                    <p className="AddProductPanel_block_title AddProductPanel_block_title--accent">
                                        Тип тоника
                                    </p>
                                    <label>Тип тоника</label>

                                    {tonicTypes.map(item => (
                                        <select
                                            key={item.id}
                                            className="field-input"
                                        >
                                            <option>Тип тоника</option>
                                        </select>
                                    ))}

                                    <button
                                        type="button"
                                        className="AddProductPanel_link"
                                        onClick={addTonicType}
                                    >
                                        Добавить еще
                                    </button>
                                </div>

                                <div className="AddProductPanel_group">
                                    <p className="AddProductPanel_block_title AddProductPanel_block_title--accent">
                                        Вид пользы
                                    </p>
                                    <label>Вид пользы</label>

                                    {benefitTypes.map(item => (
                                        <select
                                            key={item.id}
                                            className="field-input"
                                        >
                                            <option>Вид пользы</option>
                                        </select>
                                    ))}

                                    <button
                                        type="button"
                                        className="AddProductPanel_link"
                                        onClick={addBenefitType}
                                    >
                                        Добавить еще
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="AddProductPanel_footer">
                            <button className="AddProductPanel_save">
                                Сохранить
                            </button>
                            <button
                                className="AddProductPanel_cancel"
                                onClick={closeAddModal}
                            >
                                Отменить
                            </button>
                        </div>
                    </aside>
                </>
            )}
        </div>
    );
};

export default ProductsPage;
