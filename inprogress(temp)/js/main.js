// const hero = require('./heroes.js');
// const dataBase = require('./dataBase');
// const util = require('./util.js');
///////////////////////////////////////////////////////////////////////////////////////////////
const pageStatus = {}
let mMenu = document.querySelector('.menu');        //Обработка нажатий на основное меню
let container = document.querySelector('.container');
const forma = document.createElement('div');
const page = document.createElement('div');
page.classList.add('page');     
forma.classList.add('forma');
container.appendChild(page);
container.appendChild(forma);

document.addEventListener('click', hMenu);
function hMenu(e){
    if(!e.target.dataset.menu) return;
    let menu = e.target.dataset.menu;
    switch (menu){
        case 'funnyHeroes':
            // clearContainer();
            loadHTML('pages/funnyHeroes.html',page);
            break;
        case 'forma':
            // clearContainer();
            loadHTML('pages/forma.html', forma);
            break;
    }
}

function loadHTML(url, p){
    if(!pageStatus[p.className]){
        pageStatus[p.className] = p;
        swapPages(pageStatus, p);
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.addEventListener('readystatechange',(e)=>{
            if(e.target.readyState!=4 || e.target.status !=200) return;
                p.innerHTML = e.target.responseText;
                e.target = null;
    });
    console.log('this is p = ', p);
    }
    else swapPages(pageStatus,p);
}

function clearContainer(){
    page.innerHTML = ' ';
    forma.innerHTML = ' ';
}

function swapPages(obj, page){
    for (const key in obj){
        if(obj[key]!=page){
            obj[key].hidden = true;
        }
        else obj[key].hidden = false;
    }

}

