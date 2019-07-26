let mMenu = document.querySelector('.menu');
let blurb = document.querySelector('.blurb');
let blurbParent = blurb.parentNode;

mMenu.addEventListener('click', hMainMenu);

function hMainMenu(e){
    let menu = e.target.dataset.menu;
    if(!menu) return;
    switch(menu){
        case 'home':
            load('pages/blank.html','js/table.js');
            break;
        case 'funnyHeroes':
            load('pages/funnyHeroes.html','js/heroes.js');
            break;
    }


}

function load(htmlUrl, scrUrl){
    blurbParent.innerHTML = '';
    blurbParent.appendChild(blurb);
    let xhr = new XMLHttpRequest();
    xhr.open('GET',htmlUrl);
    xhr.send();
    xhr.addEventListener('readystatechange', hLoad);
    function hLoad(e){
        if(e.target.readyState !=4 || e.target.status !=200) return;
        blurb.innerHTML = e.target.responseText;
        e.target.removeEventListener('readystatechange', hLoad);
        xhr = null;
        loadScript(scrUrl,()=>{go();});
    }
}

function loadScript(src, callBack){
    let script = document.createElement('script');
    script.src = src;
    blurb.appendChild(script);
    script.addEventListener('load',hExec);
    function hExec(){
        callBack();
        script.removeEventListener('load',hExec);
    }
}
