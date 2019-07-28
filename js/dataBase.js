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