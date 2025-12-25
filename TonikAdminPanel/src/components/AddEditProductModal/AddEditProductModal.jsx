// src/components/AddEditProductModal/AddEditProductModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import DownloadIcon from '../../assets/icons/download.png';
import PointerIcon from '../../assets/icons/pointer.svg';
import DeleteIcon from '../../assets/icons/delete.png';
import './AddEditProductModal.css';

const AddEditProductModal = ({ isOpen, onClose, product = null, onSave }) => {
    const isEditMode = !!product;

    // Основные данные
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        quantity: '',
        costPrice: '',
        price: '',
        category: ''
    });

    const [images, setImages] = useState([]);
    const [tonicTypes, setTonicTypes] = useState([{ id: 1, value: '' }]);
    const [benefitTypes, setBenefitTypes] = useState([{ id: 1, value: '' }]);
    const [features, setFeatures] = useState([{ id: 1, title: '', description: '' }]);
    const [certs, setCerts] = useState([{ id: 1, title: '', file: null }]);
    const [extraProducts, setExtraProducts] = useState([{ id: 1, productId: null }]);

    // Загрузка данных товара при редактировании
    useEffect(() => {
        if (isEditMode && product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                quantity: product.quantity || '',
                costPrice: product.costPrice || '',
                price: product.price || '',
                category: product.category || ''
            });

            // Загрузка изображений если они есть
            if (product.images) {
                setImages(product.images);
            }

            console.log('Editing product:', product);
        } else {
            // Сброс всех полей при создании нового товара
            setFormData({
                name: '',
                description: '',
                quantity: '',
                costPrice: '',
                price: '',
                category: ''
            });
            setImages([]);
            setTonicTypes([{ id: 1, value: '' }]);
            setBenefitTypes([{ id: 1, value: '' }]);
            setFeatures([{ id: 1, title: '', description: '' }]);
            setCerts([{ id: 1, title: '', file: null }]);
            setExtraProducts([{ id: 1, productId: null }]);
        }
    }, [isEditMode, product]);

    // Обработчики изменения основных полей
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Обработчики для features
    const handleFeatureChange = (id, field, value) => {
        setFeatures(prev => prev.map(feat =>
            feat.id === id ? { ...feat, [field]: value } : feat
        ));
    };

    const addFeature = () => {
        setFeatures((prev) => [...prev, { id: crypto.randomUUID(), title: '', description: '' }]);
    };

    // Обработчики для tonicTypes
    const handleTonicTypeChange = (id, value) => {
        setTonicTypes(prev => prev.map(item =>
            item.id === id ? { ...item, value } : item
        ));
    };

    const addTonicType = () => {
        setTonicTypes((prev) => [...prev, { id: crypto.randomUUID(), value: '' }]);
    };

    // Обработчики для benefitTypes
    const handleBenefitTypeChange = (id, value) => {
        setBenefitTypes(prev => prev.map(item =>
            item.id === id ? { ...item, value } : item
        ));
    };

    const addBenefitType = () => {
        setBenefitTypes((prev) => [...prev, { id: crypto.randomUUID(), value: '' }]);
    };

    // Обработчики для сертификатов
    const handleCertChange = (id, field, value) => {
        setCerts(prev => prev.map(cert =>
            cert.id === id ? { ...cert, [field]: value } : cert
        ));
    };

    const addCert = () => {
        setCerts((prev) => [...prev, { id: crypto.randomUUID(), title: '', file: null }]);
    };

    // Обработчики для дополнительных товаров
    const addExtraProduct = () => {
        setExtraProducts((prev) => [...prev, { id: crypto.randomUUID(), productId: null }]);
    };

    // Обработчики изображений
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

    // Валидация формы
    const validateForm = () => {
        if (!formData.name.trim()) {
            alert('Введите название товара');
            return false;
        }
        if (!formData.price) {
            alert('Введите цену товара');
            return false;
        }
        return true;
    };

    // Сохранение товара
    const handleSave = () => {
        if (!validateForm()) return;

        const productData = {
            id: isEditMode ? product.id : crypto.randomUUID(),
            ...formData,
            images: images,
            features: features.filter(f => f.title || f.description),
            tonicTypes: tonicTypes.filter(t => t.value),
            benefitTypes: benefitTypes.filter(b => b.value),
            certs: certs.filter(c => c.title || c.file),
            extraProducts: extraProducts.filter(e => e.productId),
            active: isEditMode ? product.active : false,
            date: isEditMode ? product.date : new Date().toISOString().split('T')[0],
            views: isEditMode ? product.views : 0,
            status: 'instock'
        };

        console.log(isEditMode ? 'Updating product:' : 'Creating product:', productData);

        if (onSave) {
            onSave(productData, isEditMode);
        }

        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="AddProductOverlay" onClick={onClose}></div>
            <aside className="AddProductPanel" onClick={(e) => e.stopPropagation()}>
                <div className="AddProductPanel_header">
                    <h2>{isEditMode ? 'Редактирование товара' : 'Создание товара'}</h2>
                    <button className="AddProductPanel_close" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="AddProductPanel_body">
                    <div className="AddProductPanel_grid">
                        {/* ЛЕВАЯ КОЛОНКА */}
                        <div className="AddProductPanel_col">
                            <div className="AddProductPanel_group">
                                <label>Название товара</label>
                                <input
                                    type="text"
                                    placeholder="Название товара"
                                    className="field-input"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                />
                            </div>

                            <div className="AddProductPanel_group">
                                <label>Описание</label>
                                <textarea
                                    placeholder="Описание"
                                    className="field-textarea field-textarea--description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                ></textarea>
                            </div>

                            <div className="AddProductPanel_block">
                                <p className="AddProductPanel_block_title">Характеристики товара</p>
                                {features.map((feat, index) => (
                                    <React.Fragment key={feat.id}>
                                        <p className="AddProductPanel_subtitle">Раздел №{index + 1}</p>
                                        <div className="AddProductPanel_group">
                                            <input
                                                type="text"
                                                placeholder="Заголовок"
                                                className="field-input"
                                                value={feat.title}
                                                onChange={(e) => handleFeatureChange(feat.id, 'title', e.target.value)}
                                            />
                                        </div>
                                        <div className="AddProductPanel_group">
                                            <input
                                                type="text"
                                                placeholder="Описание"
                                                className="field-input"
                                                value={feat.description}
                                                onChange={(e) => handleFeatureChange(feat.id, 'description', e.target.value)}
                                            />
                                        </div>
                                    </React.Fragment>
                                ))}
                                <button type="button" className="AddProductPanel_link" onClick={addFeature}>
                                    Добавить характеристику
                                </button>
                            </div>
                        </div>

                        {/* ПРАВАЯ КОЛОНКА */}
                        <div className="AddProductPanel_col">
                            <div className="AddProductPanel_block">
                                <p className="AddProductPanel_block_title">Фото товара</p>
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
                                                Перетащите фото или <button type="button">Загрузить</button>
                                            </span>
                                        </div>
                                    </label>
                                </div>

                                <div className="AddProductPanel_photos_row">
                                    {images.map((img) => (
                                        <div key={img.id} className="AddProductPanel_photo_small">
                                            <img src={img.url} alt="" className="AddProductPanel_photo_img" />
                                            <div className="AddProductPanel_photo_actions">
                                                <button
                                                    type="button"
                                                    className="AddProductPanel_icon-btn"
                                                    onClick={() => handleRemoveImage(img.id)}
                                                >
                                                    <img src={DeleteIcon} alt="" />
                                                </button>
                                                <button type="button" className="AddProductPanel_icon-btn">
                                                    <img src={PointerIcon} alt="" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="AddProductPanel_inline">
                                <div className="AddProductPanel_group">
                                    <label>Количество</label>
                                    <input
                                        type="text"
                                        placeholder="1 шт."
                                        className="field-input"
                                        value={formData.quantity}
                                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="AddProductPanel_inline AddProductPanel_inline--2">
                                <div className="AddProductPanel_group">
                                    <label>Себестоимость</label>
                                    <input
                                        type="text"
                                        placeholder="10 000"
                                        className="field-input"
                                        value={formData.costPrice}
                                        onChange={(e) => handleInputChange('costPrice', e.target.value)}
                                    />
                                </div>
                                <div className="AddProductPanel_group">
                                    <label>Цена</label>
                                    <input
                                        type="text"
                                        placeholder="20 000"
                                        className="field-input"
                                        value={formData.price}
                                        onChange={(e) => handleInputChange('price', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="AddProductPanel_group">
                                <label>Раздел каталога</label>
                                <select
                                    className="field-input"
                                    value={formData.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                >
                                    <option value="">Раздел каталога</option>
                                    <option value="tonics">Тоники</option>
                                    <option value="creams">Кремы</option>
                                    <option value="serums">Сыворотки</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* ДОПОЛНИТЕЛЬНЫЕ БЛОКИ */}
                    <div className="AddProductPanel_row">
                        <div className="AddProductPanel_block">
                            <p className="AddProductPanel_block_title AddProductPanel_block_title--accent">
                                Сертификаты
                            </p>
                            {certs.map((cert) => (
                                <div className="AddProductPanel_group" key={cert.id}>
                                    <label>Заголовок</label>
                                    <input
                                        type="text"
                                        placeholder="Заголовок"
                                        className="field-input"
                                        value={cert.title}
                                        onChange={(e) => handleCertChange(cert.id, 'title', e.target.value)}
                                    />
                                    <label>Файл документа</label>
                                    <label className="AddProductPanel_upload AddProductPanel_upload--main">
                                        <input
                                            type="file"
                                            accept=".pdf,.jpg,.png,.doc,.docx"
                                            className="AddProductPanel_upload_input"
                                            onChange={(e) => handleCertChange(cert.id, 'file', e.target.files[0])}
                                        />
                                        <div className="AddProductPanel_upload_content">
                                            <img src={DownloadIcon} alt="" />
                                            <span>
                                                {cert.file ? cert.file.name : <button type="button">Загрузить</button>}
                                            </span>
                                        </div>
                                    </label>
                                </div>
                            ))}
                            <button type="button" className="AddProductPanel_link" onClick={addCert}>
                                Добавить еще
                            </button>
                        </div>

                        <div className="AddProductPanel_block">
                            <p className="AddProductPanel_block_title AddProductPanel_block_title--accent">
                                Дополнительные товары
                            </p>
                            {extraProducts.map((ep) => (
                                <div className="AddProductPanel_group" key={ep.id}>
                                    <label>Выбрать Товар</label>
                                    <button type="button" className="AddProductPanel_select-btn">
                                        Выбрать из каталога
                                    </button>
                                </div>
                            ))}
                            <button type="button" className="AddProductPanel_link" onClick={addExtraProduct}>
                                Добавить товар
                            </button>
                        </div>
                    </div>

                    {/* НИЖНИЙ РЯД */}
                    <div className="AddProductPanel_bottom-row">
                        <div className="AddProductPanel_group">
                            <p className="AddProductPanel_block_title AddProductPanel_block_title--accent">
                                Тип тоника
                            </p>
                            <label>Тип</label>
                            {tonicTypes.map((item) => (
                                <select
                                    key={item.id}
                                    className="field-input"
                                    value={item.value}
                                    onChange={(e) => handleTonicTypeChange(item.id, e.target.value)}
                                >
                                    <option value="">Тип тоника</option>
                                    <option value="type1">Тип 1</option>
                                    <option value="type2">Тип 2</option>
                                </select>
                            ))}
                            <button type="button" className="AddProductPanel_link" onClick={addTonicType}>
                                Добавить еще
                            </button>
                        </div>

                        <div className="AddProductPanel_group">
                            <p className="AddProductPanel_block_title AddProductPanel_block_title--accent">
                                Вид пользы
                            </p>
                            <label>Вид пользы</label>
                            {benefitTypes.map((item) => (
                                <select
                                    key={item.id}
                                    className="field-input"
                                    value={item.value}
                                    onChange={(e) => handleBenefitTypeChange(item.id, e.target.value)}
                                >
                                    <option value="">Вид пользы</option>
                                    <option value="benefit1">Польза 1</option>
                                    <option value="benefit2">Польза 2</option>
                                </select>
                            ))}
                            <button type="button" className="AddProductPanel_link" onClick={addBenefitType}>
                                Добавить еще
                            </button>
                        </div>
                    </div>
                </div>

                <div className="AddProductPanel_footer">
                    <button className="AddProductPanel_save" onClick={handleSave}>
                        {isEditMode ? 'Сохранить' : 'Создать'}
                    </button>
                    <button className="AddProductPanel_cancel" onClick={onClose}>
                        Отменить
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AddEditProductModal;
