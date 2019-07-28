const hero = require('./heroes.js');
const dataBase = require('./dataBase');
const util = require('./util.js');

const pageStatus = {};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let mMenu = document.querySelector('.menu');        //Обработка нажатий на основное меню
let container = document.querySelector('.container');

const forma = document.createElement('div');        //Подготавливаем странички
const fun = document.createElement('div');
const calendar = document.createElement('div');

fun.classList.add('fun');                           // Устанавливаем классы, для стилей, они же будут идентификаторы
forma.classList.add('forma');
calendar.classList.add('calendar'); 

container.appendChild(fun);                         // Добавляем элементы на стартовую страничку
container.appendChild(forma);
container.appendChild(calendar);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
hero.page = fun;                                    // Для странички с футбольным полем
fun.addEventListener('mousemove', hero.hMove);
fun.addEventListener('mousedown', hero.hGetHero);
fun.addEventListener('mouseup', hero.hPutHero);
window.oncontextmenu = (function(e){return false;});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('input', hInput);          //Для формы ввода данных
document.addEventListener('change', util.check);
function hInput(e){
    dataBase.write(e);
    util.check();
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
loadScript('js/table.js', calendar, ()=>{go();});       // Календарь формируется полностью динамически он же - стартовая страница



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
mMenu.addEventListener('click', hMainMenu);             // Обработка нажатий на главное меню
function hMainMenu(e){
    let menu = e.target.dataset.menu;
    if(!menu) return;
    switch(menu){
        case 'home':
            load('pages/blank.html', calendar);
            loadScript('js/table.js', calendar, ()=>{go();});
            break;
        case 'funnyHeroes':
            load('pages/funnyHeroes.html', fun);
            break;
        case 'forma':
            
            load('pages/forma.html', forma);
            break;
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function load(htmlUrl, p=page){
    if(!pageStatus[p.className]){
        pageStatus[p.className] = p;
        swapPages(pageStatus, p);

    let xhr = new XMLHttpRequest();
    xhr.open('GET',htmlUrl);
    xhr.send();
    xhr.addEventListener('readystatechange', hLoad);
    function hLoad(e){
        if(e.target.readyState !=4 || e.target.status !=200) return;
        p.innerHTML = e.target.responseText;
        e.target.removeEventListener('readystatechange', hLoad);
        xhr = null;
        }
    }
    else swapPages(pageStatus, p);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function loadScript(src, p, callBack){
    let script = document.createElement('script');
    script.src = src;
    p.innerHTML = ' ';
    p.appendChild(script);

    script.addEventListener('load',hExec);
    function hExec(){
        callBack();
        script.removeEventListener('load',hExec);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function swapPages(obj, page){
    for(const key in obj){
        if(obj[key]!=page) obj[key].hidden = true;
        else obj[key].hidden = false;
    }
}
