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