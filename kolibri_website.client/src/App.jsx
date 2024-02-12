import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [Tbl, setForecasts] = useState();
    const [categ, setForecasts2] = useState();
    useEffect(() => {
        populateWeatherData();
    }, []);

    useEffect(() => {
        Category();
    }, []);

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
        : <select id="category">
            {categ.map(categ =>
                <option key={categ.id}>{categ.category}</option>
            )}
          </select>
    return (
        <div>
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            {cat}
            <input type="text" id="name" placeholder="Название"></input>
            <input type="text" id="price" placeholder="Цена"></input>
            <button onClick="sendData()">Обновить</button>
        </div>
    );
    
    async function populateWeatherData() {
        const response = await fetch('weather');
        const data = await response.json();
        setForecasts(data);
    }
    async function Category() {
        const hz = await fetch('category');
        const data = await hz.json();
        setForecasts2(data);
    }
}

export default App;