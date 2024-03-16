import { useEffect, useState, useRef } from 'react';
import fs from 'fs';
import path from 'path'
import './css/App.css';
import logo from './image/Логотип.png'
import mainimage from './image/главная картинка.png'
import questimage from './image/картинка для вопросов.png'
import imgbird from './image/птичка.png'
import arrowimg from './image/Arrow 1.png'
function App() {

    const [Tbl, setForecasts] = useState();
    const [categ, setForecasts2] = useState();
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false); 
    const [selectedFile, setSelectedFile] = useState(null);
    const [SelectCat, setSelectCat] = useState(null);
    const imageInputRef = useRef(null);
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
    //const MainPageContent = (
    //    <button id="MainP_Button" onClick={() => {
    //        setShowMainPage(false);
    //        setShowCategPage(true);
    //    }}>
    //        <div className="product">
    //            <h4 className="product__title">Просмотреть категории</h4>
    //        </div>
    //    </button>);


    const Head = (
        <header className='kolibrihead'>
            <div className='kolibriheadVnut'>
                <div className='headerbar' />
                <button onClick={() => {
                    setShowMainPage(true);
                    setShowCategPage(false);
                    setShowProductPage(false);
                }}>
                    <img className='logo' src={logo} />
                </button>
                <div className='navbar'>
                    <button className='navbutton'>О нас</button>
                    <button className='navbutton' onClick={() => {
                        setShowMainPage(false);
                        setShowCategPage(true);
                    }}>Каталог</button>
                    <button className='navbutton'>Услуги</button>
                    <button className='navbutton'>Вызов на замер</button>
                    <button className='navbutton'>Отзывы</button>
                    <button className='navbutton'>Контакты</button>
                </div>
            </div>
        </header>
    );
    const QuestForm = (
        <div className='questionform'>
            <img className='questionformimage' src={questimage} />
            <div className='questiontable'>
                <div className='dohavequest'>У вас остались вопросы?</div>
                <div className='getquest'>Задайте вопрос и оставьте свои контактные данные,<br />менеджер свяжется с вами в ближайшее <br />время и проконсультирует</div>
                <div className='askquest'>
                    <div className='askquestinside' />
                    <input type="text" id="question" className='askquesttextbox' placeholder="Задайте вопрос" />
                </div>
                <div className='questnumber'>
                    <div className='questnumberinside'></div>
                    <input type="text" id="phonenumber" className='questnumbertextbox' placeholder="+7 (___)-___--" />
                </div>
                <button className='questionformbutton' onClick={sendQuestion}>
                    <div className='questionformbuttonshadow' />
                    <div className='questionformbuttoncolor' />
                    <div className='questionformbuttontext'>Отправить вопрос</div>
                </button>
                <div className='questionformname'>
                    <div className='questionformnameinside' />
                    <input type="text" id="questioner" className='questioner' placeholder="Введите Имя" />
                </div>
            </div>
        </div>
    );
    const OrderForm = (
        <div className='orderbox'>
            <img className='orderboximage' src={imgbird} />
            <div className='ordertextbox'>
                <div className='ordertextshadow' />
                <button className='orderbutton' onClick={sendOrder}>
                    <div className='orderbuttonshadow'></div>
                    <div className='orderbuttoncolor'></div>
                    <div className='orderbuttontext'>Вызвать на замер</div>
                </button>
                <div className='ordertext'><span className='pzdc0'>Готовы </span><span className='pzdc1'>превратить</span><span className='pzdc2'> свои</span><span className='pzdc3'> <br /></span><span className='pzdc4'>мечты</span><span className='pzdc5'> </span><span className='pzdc6'>в</span><span className='pzdc7'> </span><span className='pzdc8'>реальность</span><span className='pzdc9'>?</span><span className='pzdc10'> </span></div>
                <div className='orderliteltext'>Начните с вызова мастера на замер для вашего дома<br />Оператор свяжется с вами в ...</div>
                <div className='customerbox'>
                    <div className='customername' />
                    <div className='customerphone' />
                    <input type="text" id="customerphone" className='customerphoneinput' placeholder="+7 (___)-___--" />
                    <input type="text" id="customername" className='customernameinput' placeholder="Введите Имя" />
                </div>
            </div>
        </div>
    )
    const MainPageContent = (
        <div className='maintitle'>
            <img className='maintitleimage' src={mainimage} />
            <div className='transparent' />
            <div className='mainpagesignature'>
                <div className='slogan'>Создаем атмосферу уюта <br />и комфорта в вашем доме <br />с любовью и вниманием <br />к деталям</div>
                <div className='mainpagename'>Мебельная компания “Колибри”</div>
            </div>
            <button className='buttontocatalog' onClick={() => {
                setShowMainPage(false);
                setShowCategPage(true);
            }}>
                <div className='buttoncatalogshadow' />
                <div className='buttoncatalogstyle' />
                <div className='buttoncatalogtext'>Перейти в каталог</div>
            </button>
        </div>
    );
    const Feedback = (
        <div className='feedbackbox'>
            <div className='feedbacktitle'>Отзывы наших клиентов</div>
            <div className='arrowright'>
                <div className='arrowrightinside1' />
                <div className='arrowrightinside2' />
            </div>
            <div className='leftfeedback'>
                <div className='leftfeedbackshadow' />
                <div className='feedbacktext'>Мы абсолютно в восторге от нашей кухни, сделанной на заказ! Результат превзошел все наши ожидания. Каждая деталь сделана с высочайшим качеством, а функциональность на высоте. Очень рекомендуем услуги по изготовлению кухонь на заказ!</div>
                <div className='stars' />
                <div className='feedbackname'>Сергей</div>
                <div className='feedbackfull'>Читать полностью</div>
            </div>
            <div className='rightfeedback'>
                <div className='rightfeedbackshadow'></div>
                <div className='feedbacktext'>Мы абсолютно в восторге от нашей кухни, сделанной на заказ! Результат превзошел все наши ожидания. Каждая деталь сделана с высочайшим качеством, а функциональность на высоте. Очень рекомендуем услуги по изготовлению кухонь на заказ!</div>
                <div className='stars' />
                <div className='feedbackname'>Сергей</div>
                <div className='feedbackfull'>Читать полностью</div>
            </div>
            <div className='arrowleft'>
                <div className='arrowleftinside1' />
                <img className='arrowleftinside2' src={arrowimg} />
            </div>
        </div>
    )

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
                                    <img key={Tbl.id} src={'data:image/png;base64,' + Tbl.img} alt={`Изображения нет`} />
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
        <div className='mainpage'>

            {Head}
            {showMainPage && MainPageContent}
            {showMainPage && QuestForm}
            {showMainPage && OrderForm}
            {showMainPage && Feedback}

            <div className='services'>Услуги</div>
            <div className='about'>О нас</div>
            <div className='catalog'>Каталог/Наши последние проекты
                {showCategPage && (Categcont)}
                {showProductPage && (contents)}
            </div>
            <div className='advantage'>Преимущества</div>
            <div className='footer'>Подвал</div>

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
        } catch(error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    }

    async function Category() {
        const hz = await fetch('category');
        const data = await hz.json();
        setForecasts2(data);
    }



    async function sendQuestion() {
        const name = document.getElementById('questioner').value;
        const phonumber = document.getElementById('phonenumber').value;
        const question = document.getElementById('question').value

        await fetch(`addquestion?question=${name, phonumber, question }`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, phonumber, question })
        });
    }
    async function sendOrder() {
        const name = document.getElementById('customername').value;
        const phonumber = document.getElementById('customerphone').value;
        await fetch(`addcustomer?customer=${name, phonumber}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, phonumber })
        });
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
//<div className="container">
//    <div className="category">
//        <div className="category-background"></div>
//        <div className="category-title">Категория 1</div>
//        <div className="category-shadow"></div>
//    </div>
//    <div className="category">
//        <div className="category-background"></div>
//        <div className="category-title">Категория 2</div>
//        <div className="category-shadow"></div>
//    </div>
//    <div className="category">
//        <div className="category-background"></div>
//        <div className="category-title">Категория 3</div>
//        <div className="category-shadow"></div>
//    </div>
//    <div className="catalog-title">Каталог</div>
//</div>
//<div className="container">
//    <div className="title">Наши последние проекты</div>
//    <div className="project-large"></div>
//    <div className="project-small"></div>
//    <div className="project-small"></div>
//    <div className="project-small"></div>
//    <div className="project-small"></div>
//</div>
export default App;