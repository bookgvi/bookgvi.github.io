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
