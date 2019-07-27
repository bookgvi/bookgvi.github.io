(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
const hero = require('./heroes.js');
let mMenu = document.querySelector('.menu');
let page = document.querySelector('.page');
let pageParent = page.parentNode;

hero.page = document.querySelector('.page');
document.addEventListener('mousemove', hero.hMove);
document.addEventListener('mousedown', hero.hGetHero);
document.addEventListener('mouseup', hero.hPutHero);
window.oncontextmenu = (function(e){return false;});


mMenu.addEventListener('click', hMainMenu);
loadScript('js/table.js',()=>{go();});
function hMainMenu(e){
    let menu = e.target.dataset.menu;
    if(!menu) return;
    switch(menu){
        case 'home':
                load('pages/blank.html');
                loadScript('js/table.js',()=>{go();});
            break;
        case 'funnyHeroes':
            load('pages/funnyHeroes.html');
            break;
    }
}



function load(htmlUrl){
    pageParent.innerHTML = '';
    pageParent.appendChild(page);
    let xhr = new XMLHttpRequest();
    xhr.open('GET',htmlUrl);
    xhr.send();
    xhr.addEventListener('readystatechange', hLoad);
    function hLoad(e){
        if(e.target.readyState !=4 || e.target.status !=200) return;
        page.innerHTML = e.target.responseText;
        e.target.removeEventListener('readystatechange', hLoad);
        xhr = null;
        // loadScript(scrUrl,()=>{go();});
    }
}

function loadScript(src, callBack){
    let script = document.createElement('script');
    script.src = src;
    page.appendChild(script);
    script.addEventListener('load',hExec);
    function hExec(){
        callBack();
        script.removeEventListener('load',hExec);
    }
}

},{"./heroes.js":1}]},{},[2]);
