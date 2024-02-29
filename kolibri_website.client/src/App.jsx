import { useEffect, useState, useRef } from 'react';
import fs from 'fs';
import path from 'path'
import './css/App.css';
function App() {

    const [Tbl, setForecasts] = useState();
    const [categ, setForecasts2] = useState();
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false); 
    const [images, setImages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [SelectCat, setSelectCat] = useState(null);
    const modalOverlayRef = useRef(null);
    const [showMainPage, setShowMainPage] = useState(true); 
    const [showCategPage, setShowCategPage] = useState(false);
    const [showProductPage, setShowProductPage] = useState(false);
    useEffect(() => {
        Table();
    }, []);
    useEffect(() => {
        Category();
    }, []);

    const closeModalOverlay = (e) => {
        if (modalOverlayRef.current === e.target) {
            setShowAddCategoryModal(false);
        }
    };
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleCategoryClick = (category) => {
        setSelectCat(category);
        setShowCategPage(false);
        setShowProductPage(true);
    };

    const MainPageContent = (
        <button id="MainP_Button" onClick={() => {
            setShowMainPage(false);
            setShowCategPage(true);
        }}>
            <div className="product">
                <h4 className="product__title">Просмотреть категории</h4>
            </div>
        </button>);
    const Categcont = categ === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <section className="section-new" id="W1">
            <div className="container">
                <div className="products-wrapper">
                    {categ.map(categ =>
                        <button id="MainP_Button" className="product-link" key={categ.id} onClick={() => handleCategoryClick(categ.category)}>
                            <div className="product">
                                <option value={categ.id}>{categ.category}</option>
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </section>

    const contents = Tbl === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <section className="section-new" id="W1">
            <div className="container">
                <div className="products-wrapper">
                    {Tbl.filter(item => item.category === SelectCat).map(Tbl =>
                        <a href="#" className="product-link" key={Tbl.id}>
                            <div className="product">
                                <div>
                                    <img key={Tbl.id} src={images[Tbl.id-1]} alt={`Image ${Tbl.id}`} />
                                </div>
                                <h4 className="product__title">{Tbl.name}</h4>
                                <div className="product__price">
                                    <span className="product__price_pr">{Tbl.price}</span>
                                </div>
                            </div>     
                        </a>
                    )}
                </div>
            </div>
        </section>


    //let len = Tbl.length;
    //useEffect(() => {
    //    fetchImages();
    //}, []);
    //const imag = images === undefined
    //    ? <p></p>
    //    : <div>      {images.map((image, index) => (
    //        <img key={index} src={image} alt={`Image ${index + 1}`} />
    //    ))}</div>
    
    //: <table className="table table-striped" aria-labelledby="tabelLabel">
        //    <thead>
        //        <tr>
        //            <th>ID</th>
        //            <th>Категория</th>
        //            <th>Название</th>
        //            <th>Цена</th>
        //        </tr>
        //    </thead>
        //    <tbody>
        //        {Tbl.map(Tbl =>
        //            <tr key={Tbl.id}>
        //                <td>{Tbl.id}</td>
        //                <td>{Tbl.category}</td>
        //                <td>{Tbl.name}</td>
        //                <td>{Tbl.price}</td>
        //            </tr>
        //        )}
        //    </tbody>
    //</table>;

    const cat = categ === undefined
        ? <p></p>
        : <select id="category" onChange={(e) => {
            if (e.target.value === "addNewCategory") {
                setShowAddCategoryModal(true);
            }
        }}>
            {categ.map(categ =>
                <option key={categ.id}>{categ.category}</option>
            )}
            <option value = "addNewCategory">Добавить или удалить новую категорию</option>
        </select>
    const catf = categ === undefined
        ? <p></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Категория</th>
                </tr>
            </thead>
            <tbody>
                {categ.map(categ =>
                    <tr key={categ.id}>
                        <td>{categ.id}</td>
                        <td>{categ.category}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            {showMainPage && MainPageContent}
            {showCategPage && (Categcont)}
            {showProductPage && (contents)}
        </div>);
            
    //        {contents}
    //        {cat}
    //        {images.length}
    //        <input type="text" id="name" placeholder="Название"/>
    //        <input type="text" id="price" placeholder="Цена"/>
    //        <button onClick={sendData}>Обновить</button>
    //        <p>Удалить продукт (впишите ID)</p>
    //        <input type="text" id="delID" placeholder="ID продукта"/>
    //        <button onClick={delData}>Удалить</button>

    //        {showAddCategoryModal && (
    //            <div className="modal-overlay" ref={modalOverlayRef} onClick={closeModalOverlay}>
    //                <div className="modal">
    //                    {catf}
    //                    <input type="text" id="newcategory" placeholder="Введите новую категорию"/>
    //                    <button onClick={sendCateg}>Добавить</button>
    //                    <input type="text" id="delcategory" placeholder="Введите id категории для удаления" />
    //                    <button onClick={delCateg}>Удалить</button>
    //                </div>
    //            </div>
    //        )}
    //        <input type="file" onChange={handleFileChange}/>
    //        <button onClick={handleUpload}>Upload</button>
    //    </div>
    //);
    
    async function Table() {
        try {
            const response = await fetch('table');
            const data = await response.json();
            setForecasts(data);
            let len;
            if (Array.isArray(data)) {
                len = data.length;
            } else {
                len = 0;
            }
            fetchImages(len)
        } catch(error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    }

    async function fetchImages (l){
        const loadImages = [];
        for (let i = 1; i <= l; i++) {
            const imageModule = await import(`./image/img${i}.png`);
            loadImages.push(imageModule.default);
        }
        setImages(loadImages);
    }

    async function Category() {
        const hz = await fetch('category');
        const data = await hz.json();
        setForecasts2(data);
    }
    async function handleUpload() {
        const imageFolder = path.join(__dirname, 'images');

        selectedFile.download
        localStorage.setItem("image", selectedFile.src);
        //fileDownload(selectedFile, 'img.jpg')
        //saveFile(selectedFile, fileput);
    }
    async function sendData() {
        const category = document.getElementById('category').value;
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        await fetch(`newcortege?cort=${category, name, price}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category, name, price })
        });
        
        Table();
    }
    async function delData() {
        const ids = document.getElementById('delID').value;
        await fetch(`delcortege?id=${ids}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids })
        });
        
        Table();
    }
    async function sendCateg() {
        const category = document.getElementById('newcategory').value;
        await fetch(`addcategory?categ=${category}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category })
        });
        Category()
    }
    async function delCateg() {
        const category = document.getElementById('delcategory').value;
        await fetch(`delcategory?id=${category}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category })
        });
        Category()
    }
}
function saveFile(fileData, fileName) {
    // Создаем объект Blob из файла
    const blob = new Blob([fileData], { type: 'application/octet-stream' });

    // Создаем URL для Blob-объекта
    const url = window.URL.createObjectURL(blob);

    // Создаем ссылку на файл
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    // Добавляем ссылку на страницу и инициируем скачивание
    document.body.appendChild(link);
    link.click();

    // Удаляем ссылку после скачивания
    document.body.removeChild(link);

    // Освобождаем URL-объект
    window.URL.revokeObjectURL(url);
}
export default App;