import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
    const [Tbl, setForecasts] = useState();
    const [categ, setForecasts2] = useState();
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const modalOverlayRef = useRef(null);
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

    const contents = Tbl === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Категория</th>
                    <th>Название</th>
                    <th>Цена</th>
                </tr>
            </thead>
            <tbody>
                {Tbl.map(Tbl =>
                    <tr key={Tbl.id}>
                        <td>{Tbl.id}</td>
                        <td>{Tbl.category}</td>
                        <td>{Tbl.name}</td>
                        <td>{Tbl.price}</td>
                    </tr>
                )}
            </tbody>
        </table>;
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
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            {cat}
            <input type="text" id="name" placeholder="Название"/>
            <input type="text" id="price" placeholder="Цена"/>
            <button onClick={sendData}>Обновить</button>
            <p>Удалить продукт (впишите ID)</p>
            <input type="text" id="delID" placeholder="ID продукта"/>
            <button onClick={delData}>Удалить</button>

            {showAddCategoryModal && (
                <div className="modal-overlay" ref={modalOverlayRef} onClick={closeModalOverlay}>
                    <div className="modal">
                        {catf}
                        <input type="text" id="newcategory" placeholder="Введите новую категорию"/>
                        <button onClick={sendCateg}>Добавить</button>
                        <input type="text" id="delcategory" placeholder="Введите id категории для удаления" />
                        <button onClick={delCateg}>Удалить</button>
                    </div>
                </div>
            )}
        </div>
    );
    
    async function Table() {
        try {
            const response = await fetch('table');
            const data = await response.json();
            setForecasts(data);
        } catch(error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    }
    async function Category() {
        const hz = await fetch('category');
        const data = await hz.json();
        setForecasts2(data);
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

export default App;