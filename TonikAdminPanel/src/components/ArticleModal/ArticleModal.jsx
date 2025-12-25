// src/components/ArticleModal/ArticleModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import DownloadIcon from '../../assets/icons/download.png';
import PointerIcon from '../../assets/icons/pointer.svg';
import DeleteIcon from '../../assets/icons/delete.png';
import GalochkaIcon from '../../assets/icons/BlackGalochka.png';
import CalendarIcon from '../../assets/icons/blackdate.png';
import './ArticleModal.css';

const ArticleModal = ({ isOpen, onClose }) => {
    const [images, setImages] = useState([]);
    const [socials, setSocials] = useState([
        { id: 1, type: 'Telegram', url: '' },
        { id: 2, type: 'WhatsApp', url: '' }
    ]);
    const [sections, setSections] = useState([{ id: 1 }]);
    const [publicationDate, setPublicationDate] = useState('2025-09-25');
    const [description, setDescription] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [description]);

    const handleImagesUpload = (event) => {
        const files = Array.from(event.target.files);
        if (!files.length) return;

        const newImages = files.map((file) => ({
            id: crypto.randomUUID(),
            url: URL.createObjectURL(file),
            file,
        }));

        setImages((prev) => [...prev, ...newImages].slice(0, 4));
    };

    const handleRemoveImage = (id) => {
        setImages((prev) => prev.filter((img) => img.id !== id));
    };

    const addSocial = () => {
        setSocials((prev) => [...prev, { id: crypto.randomUUID(), type: 'VK', url: '' }]);
    };

    const addSection = () => {
        setSections((prev) => [...prev, { id: crypto.randomUUID() }]);
    };

    const formatDisplayDate = (iso) => {
        if (!iso) return '';
        const [year, month, day] = iso.split('-');

        const months = [
            'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
            'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
        ];

        return `${parseInt(day)} ${months[parseInt(month) - 1]}, ${year}`;
    };


    if (!isOpen) return null;

    return (
        <>
            <div className="ArticleModal_overlay" onClick={onClose}></div>
            <aside className="ArticleModal_panel" onClick={(e) => e.stopPropagation()}>
                <div className="ArticleModal_header">
                    <h2>Создание статьи</h2>
                    <button className="ArticleModal_close" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="ArticleModal_body">
                    <div className="ArticleModal_grid">
                        {/* ЛЕВАЯ КОЛОНКА */}
                        <div className="ArticleModal_col">
                            {/* Основная информация */}
                            <p className="ArticleModal_section_title">Основная информация</p>

                            <div className="ArticleModal_group">
                                <label>Заголовок</label>
                                <input type="text" placeholder="Заголовок" className="field-input" />
                            </div>

                            <div className="ArticleModal_group">
                                <label>Краткое описание</label>
                                <textarea
                                    ref={textareaRef}
                                    placeholder="Описание"
                                    className="field-textarea field-textarea--auto"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>

                            {/* Титульное фото */}
                            <div className="ArticleModal_group">
                                <p className="ArticleModal_block_title">Титульное фото</p>
                                <div className="ArticleModal_group">
                                    <label className="ArticleModal_upload ArticleModal_upload--main">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImagesUpload}
                                            className="ArticleModal_upload_input"
                                        />
                                        <div className="ArticleModal_upload_content">
                                            <img src={DownloadIcon} alt="" />
                                            <span>
                                                Перетащите фото или <button type="button">Загрузить</button>
                                            </span>
                                        </div>
                                    </label>
                                </div>

                                <div className="ArticleModal_photos_row">
                                    {images.map((img) => (
                                        <div key={img.id} className="ArticleModal_photo_small">
                                            <img src={img.url} alt="" className="ArticleModal_photo_img" />
                                            <div className="ArticleModal_photo_actions">
                                                <button
                                                    type="button"
                                                    className="ArticleModal_icon-btn"
                                                    onClick={() => handleRemoveImage(img.id)}
                                                >
                                                    <img src={DeleteIcon} alt="" />
                                                </button>
                                                <button type="button" className="ArticleModal_icon-btn">
                                                    <img src={PointerIcon} alt="" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Дата публикации */}
                            <div className="ArticleModal_group">
                                <label>Дата </label>
                                <div
                                    className="ArticleModal_date"
                                    onClick={(e) =>
                                        e.currentTarget.querySelector('input[type="date"]').showPicker()
                                    }
                                >
                                    <img src={CalendarIcon} alt="" />
                                    <span>{formatDisplayDate(publicationDate)}</span>
                                    <input
                                        type="date"
                                        value={publicationDate}
                                        onChange={(e) => setPublicationDate(e.target.value)}
                                        className="ArticleModal_date_input"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            </div>

                            {/* Категория */}
                            <div className="ArticleModal_group">
                                <label>Категория</label>
                                <p className="ArticleModal_subtitle">Категория будет отображаться в рубрикаторе</p>
                                <div className="ArticleModal_select-wrapper">
                                    <div className="ArticleModal_select">
                                        <span className="ArticleModal_selected-text">Новости науки</span>
                                        <img src={GalochkaIcon} alt="" />
                                    </div>
                                    <select className="ArticleModal_native">
                                        <option>Новости науки</option>
                                    </select>
                                </div>

                            </div>

                            {/* Имя автора */}
                            <div className="ArticleModal_group">
                                <label>Имя автора</label>
                                <input type="text" placeholder="Имя автора" className="field-input" />
                            </div>
                        </div>

                        {/* ПРАВАЯ КОЛОНКА */}
                        <div className="ArticleModal_col">
                            {/* Разделы страницы */}
                            <p className="ArticleModal_section_title">Разделы страницы</p>

                            {sections.map((section, index) => (
                                <div className="ArticleModal_block" key={section.id}>

                                    <div className="ArticleModal_group">
                                        <label>Формат блока №{index + 1}</label>
                                        <div className="ArticleModal_select-wrapper">
                                            <div className="ArticleModal_select">
                                                <span className="ArticleModal_selected-text">Тест и фото (фото слева)</span>
                                                <img src={GalochkaIcon} alt="" />
                                            </div>
                                            <select className="ArticleModal_native">
                                                <option>Тест и фото (фото слева)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Контент-генерация */}
                                    <div className="ArticleModal_group">
                                        <label>Текст</label>
                                        <textarea placeholder="Описание" className="field-textarea"></textarea>
                                    </div>

                                    {/* Фото */}
                                    <div className="ArticleModal_group">
                                        <p className="ArticleModal_block_title">Фото</p>
                                        <label className="ArticleModal_upload ArticleModal_upload--main">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="ArticleModal_upload_input"
                                            />
                                            <div className="ArticleModal_upload_content">
                                                <img src={DownloadIcon} alt="" />
                                                <span>
                                                    Перетащите фото или <button type="button">Загрузить</button>
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            ))}

                            <button type="button" className="ArticleModal_link_add" onClick={addSection}>
                                Добавить раздел
                            </button>
                        </div>
                    </div>

                    {/* ДОПОЛНИТЕЛЬНО */}
                    <div className="ArticleModal_additional">


                        <div className="ArticleModal_additional_row">
                            {/* Рекомендуемые статьи */}
                            <div className="ArticleModal_additional_block">
                                <div className="ArticleModal_group">
                                    <h3 className="ArticleModal_section_title">Дополнительно</h3>
                                    <label>Выбор рекомендуемой статьи №1</label>
                                    <div className="ArticleModal_select-wrapper">
                                        <div className="ArticleModal_select">
                                            <span className="ArticleModal_selected-text">Статья</span>
                                            <img src={GalochkaIcon} alt="" />
                                        </div>
                                        <select className="ArticleModal_native">
                                            <option>Статья</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="ArticleModal_group">
                                    <label>Выбор рекомендуемой статьи №2</label>
                                    <div className="ArticleModal_select-wrapper">
                                        <div className="ArticleModal_select">
                                            <span className="ArticleModal_selected-text">Статья</span>
                                            <img src={GalochkaIcon} alt="" />
                                        </div>
                                        <select className="ArticleModal_native">
                                            <option>Статья</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="ArticleModal_group">
                                    <label>Выбор рекомендуемой статьи №3</label>
                                    <div className="ArticleModal_select-wrapper">
                                        <div className="ArticleModal_select">
                                            <span className="ArticleModal_selected-text">Статья</span>
                                            <img src={GalochkaIcon} alt="" />
                                        </div>
                                        <select className="ArticleModal_native">
                                            <option>Статья</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Соцсети */}
                            <div className="ArticleModal_additional_block">
                                <p className="ArticleModal_section_title">Соцсети</p>
                                {socials.map((social) => (
                                    <div className="ArticleModal_group" key={social.id}>
                                        <label>{social.type}</label>
                                        <input type="text" placeholder="Ссылка" className="field-input" />
                                    </div>
                                ))}
                                <button type="button" className="ArticleModal_link_add" onClick={addSocial}>
                                    Добавить соцсеть
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ArticleModal_footer">
                    <button className="ArticleModal_save">Сохранить</button>
                    <button className="ArticleModal_cancel" onClick={onClose}>
                        Отменить
                    </button>
                </div>
            </aside>
        </>
    );
};

export default ArticleModal;
