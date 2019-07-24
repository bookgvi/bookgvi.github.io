let shiftX;
let shiftY;
let hero;
let picWidth;
let picHeight;
let coordX;
let coordY;


document.addEventListener('mousemove', hMove);
function hMove(e){
    e.preventDefault();
    if(!hero) return;
        coordX = e.clientX - shiftX + window.pageXOffset;
        coordY = e.clientY - shiftY + window.pageYOffset;

        coordX = Math.max(coordX,0); //нельзя выходить за границы слева
        coordY = Math.max(coordY,0); //сверху
        coordX = Math.min(coordX, (document.documentElement.scrollWidth - hero.offsetWidth));
        coordY = Math.min(coordY, (document.documentElement.scrollHeight - hero.offsetHeight));
        hero.style.left = coordX + 'px';
        hero.style.top = coordY + 'px';

        if((hero.getBoundingClientRect().left + hero.offsetWidth)>=document.documentElement.clientWidth){ //Скролим вправо
            let x = (hero.getBoundingClientRect().left + hero.offsetWidth) - document.documentElement.clientWidth;
            window.scrollBy(x, 0);
        }
        if ((hero.getBoundingClientRect().left)<=0){ //Скролим влево
            let x = (hero.getBoundingClientRect().left);
            window.scrollBy(x, 0);
        }

        if((hero.getBoundingClientRect().top+hero.offsetHeight)>=document.documentElement.clientHeight){ // Скролим вниз
            let y = (hero.getBoundingClientRect().top+hero.offsetHeight)- document.documentElement.clientHeight;
            window.scrollBy(0,y);
        }

        if(hero.getBoundingClientRect().top<=0){ //Скролим вверх
            let y = hero.getBoundingClientRect().top;
            window.scrollBy(0,y);
        }

}

document.addEventListener('mousedown', hGetHero);
function hGetHero(e){
    e.preventDefault();
    if (e.target.classList.value === 'hero draggable' || e.target.classList.value === 'draggable'){
        picWidth = e.target.offsetWidth;
        picHeight = e.target.offsetHeight;
        shiftX = e.clientX - e.target.getBoundingClientRect().left; //поправка по X
        shiftY = e.clientY - e.target.getBoundingClientRect().top; //поправка по Y

        hero = e.target;
        
        if(e.target.classList.value === 'draggable' && e.button === 0){
            let imgClone = e.target.cloneNode(true);
            document.body.appendChild(imgClone);
            hero = imgClone;
        }
        else if(e.target.classList.value === 'draggable' && e.button === 2){
            document.body.removeChild(e.target);
        }

    }
}

document.addEventListener('mouseup', hPutHero);
function hPutHero(e){
    e.preventDefault();
    hero = null;
}

window.oncontextmenu = (function(e){
    //действия
    return false;
});