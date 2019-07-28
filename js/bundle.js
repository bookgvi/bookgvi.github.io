(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {

write: (e)=>{
    if(!e.target.dataset.base) return;
    let name = e.target.dataset.base;
    if(!this[name]){
        this[name]=[];
        this[name][0] = e.target.value;
    }
    else {this[name][0] = e.target.value;}
    // util.check();
},

read: (block)=>{
        let fields = block.querySelectorAll('[data-base]');
        for(let i=0; i<fields.length; i++){
            fields[i].textContent =  this[fields[i].dataset.base];
        }
}
}
},{}],2:[function(require,module,exports){
module.exports = {
page: null,
shiftX: 0,
shiftY: 0,
hero: null,
coordX: 0,
coordY: 0,


hMove: (e)=>{
    // e.preventDefault();

    if(!this.hero) return;
        this.coordX = e.clientX - this.shiftX + window.pageXOffset;
        this.coordY = e.clientY - this.shiftY + window.pageYOffset;

        this.coordX = Math.max(this.coordX,0); //нельзя выходить за границы слева
        this.coordY = Math.max(this.coordY,0); //сверху
        this.coordX = Math.min(this.coordX, (document.documentElement.scrollWidth - this.hero.offsetWidth));
        this.coordY = Math.min(this.coordY, (document.documentElement.scrollHeight - this.hero.offsetHeight));
        this.hero.style.left = this.coordX + 'px';
        this.hero.style.top = this.coordY + 'px';

        if((this.hero.getBoundingClientRect().left + this.hero.offsetWidth)>=document.documentElement.clientWidth){ //Скролим вправо
            let x = (this.hero.getBoundingClientRect().left + this.hero.offsetWidth) - document.documentElement.clientWidth;
            window.scrollBy(x, 0);
        }
        if ((this.hero.getBoundingClientRect().left)<=0){ //Скролим влево
            let x = (this.hero.getBoundingClientRect().left);
            window.scrollBy(x, 0);
        }

        if((this.hero.getBoundingClientRect().top+this.hero.offsetHeight)>=document.documentElement.clientHeight){ // Скролим вниз
            let y = (this.hero.getBoundingClientRect().top+this.hero.offsetHeight)- document.documentElement.clientHeight;
            window.scrollBy(0,y);
        }

        if(this.hero.getBoundingClientRect().top<=0){ //Скролим вверх
            let y = this.hero.getBoundingClientRect().top;
            window.scrollBy(0,y);
        }

},


hGetHero: (e)=>{
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    if (e.target.classList.value === 'hero draggable' || e.target.classList.value === 'draggable'){
        this.shiftX = e.clientX - e.target.getBoundingClientRect().left; //поправка по X
        this.shiftY = e.clientY - e.target.getBoundingClientRect().top; //поправка по Y
        this.hero = e.target;
    }
        if(e.target.classList.value === 'draggable' && e.button === 0){
            this.hero = e.target.parentElement.appendChild(e.target.cloneNode(true));
        }
        else if(e.target.classList.value === 'draggable' && e.button === 2){
            e.target.parentElement.removeChild(e.target);
        }
},

hPutHero: (e)=>{
    this.hero = null;
}   
}
},{}],3:[function(require,module,exports){
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

// pageStatus[calendar.className] = calendar;              // Заносим информацию о стартовой странице 
loadScript('js/table.js', calendar, ()=>{go();});       // Календарь формируется полностью динамически он же - стартовая страница



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
mMenu.addEventListener('click', hMainMenu);             // Обработка нажатий на главное меню
function hMainMenu(e){
    let menu = e.target.dataset.menu;
    if(!menu) return;
    switch(menu){
        case 'home':
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
    if(!pageStatus[p.className]){
        pageStatus[p.className] = p;
        swapPages(pageStatus, p);
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
    else swapPages(pageStatus, p);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function swapPages(obj, page){
    for(const key in obj){
        if(obj[key]!=page) obj[key].hidden = true;
        else obj[key].hidden = false;
    }
}

},{"./dataBase":1,"./heroes.js":2,"./util.js":4}],4:[function(require,module,exports){
const dataBase = require('./dataBase.js');
module.exports = {

    check(e){
        if(!e){
            let checkBoxes = document.querySelectorAll('input:checked');
            if (!checkBoxes) return;
            for(let i=0; i<checkBoxes.length; i++){
                let block = document.querySelector('.'+ checkBoxes[i].id);
                dataBase.read(block);
            }
    
        }
        else{
            let block = document.querySelector('.'+ e.target.id);
            if(!e.target.checked) return;
                dataBase.read(block);
        }
    }

}

},{"./dataBase.js":1}]},{},[3]);
