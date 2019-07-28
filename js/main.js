const hero = require('./heroes.js');
const dataBase = require('./dataBase');
const util = require('./util.js');
///////////////////////////////////////////////////////////////////////////////////////////////
let mMenu = document.querySelector('.menu');  //Обработка нажатий на основное меню
let container = document.querySelector('.container');
///////////////////////////////////////////////////////////////////////////////////////////////
const page = document.createElement('div');   // Для странички с футбольным полем
page.classList.add('page');
hero.page = page;  
page.addEventListener('mousemove', hero.hMove);
page.addEventListener('mousedown', hero.hGetHero);
page.addEventListener('mouseup', hero.hPutHero);
window.oncontextmenu = (function(e){return false;});
///////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('input',hInput);          //Для формы ввода данных
document.addEventListener('change', util.check);
const forma = document.createElement('div');
function hInput(e){
    dataBase.write(e);
    util.check();
}



mMenu.addEventListener('click', hMainMenu);
container.appendChild(page);
loadScript('js/table.js', page, ()=>{go();});
function hMainMenu(e){
    let menu = e.target.dataset.menu;
    if(!menu) return;
    switch(menu){
        case 'home':
            container.appendChild(page);
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
    container.innerHTML = '';
    container.appendChild(p);
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
    // container.innerHTML = '';
    // container.appendChild(p);

    let script = document.createElement('script');
    script.src = src;
    p.appendChild(script);

    script.addEventListener('load',hExec);
    function hExec(){
        callBack();
        script.removeEventListener('load',hExec);
    }
}
