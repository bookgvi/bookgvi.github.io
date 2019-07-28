const hero = require('./heroes.js');
const dataBase = require('./dataBase');
const util = require('./util.js');
///////////////////////////////////////////////////////////////////////////////////////////////
let mMenu = document.querySelector('.menu');        //Обработка нажатий на основное меню
let container = document.querySelector('.container');
const forma = document.createElement('div');
const page = document.createElement('div');
page.classList.add('page');     
forma.classList.add('forma');
container.appendChild(page);
container.appendChild(forma);

///////////////////////////////////////////////////////////////////////////////////////////////
hero.page = page;                                    // Для странички с футбольным полем
page.addEventListener('mousemove', hero.hMove);
page.addEventListener('mousedown', hero.hGetHero);
page.addEventListener('mouseup', hero.hPutHero);
window.oncontextmenu = (function(e){return false;});
///////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('input', hInput);          //Для формы ввода данных
document.addEventListener('change', util.check);
function hInput(e){
    dataBase.write(e);
    util.check();
}



mMenu.addEventListener('click', hMainMenu);
loadScript('js/table.js', page, ()=>{go();});
function hMainMenu(e){
    let menu = e.target.dataset.menu;
    if(!menu) return;
    switch(menu){
        case 'home':
            clearContainer();
            loadScript('js/table.js', page, ()=>{go();});
            break;
        case 'funnyHeroes':
            load('pages/funnyHeroes.html', page);
            break;
        case 'forma':
            
            load('pages/forma.html', forma);
            break;
    }
}



function load(htmlUrl, p=page){
    clearContainer();
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

function loadScript(src, p, callBack){
    clearContainer();
    let script = document.createElement('script');
    script.src = src;
    p.appendChild(script);

    script.addEventListener('load',hExec);
    function hExec(){
        callBack();
        script.removeEventListener('load',hExec);
    }
}

function clearContainer(){
    page.innerHTML = ' ';
    forma.innerHTML = ' ';
}
