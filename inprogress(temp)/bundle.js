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
const dataBase = require('./dataBase');
const util = require('./util.js');

document.addEventListener('input',hInput);
document.addEventListener('change', util.check);

function hInput(e){
    dataBase.write(e);
    util.check();
}

},{"./dataBase":1,"./util.js":3}],3:[function(require,module,exports){
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
    



// check(e){
//     if(e){
//         if(!e.target.checked) return;
//             let block = document.querySelector('.'+ e.target.id);
//             dataBase.read(block);
//     }
//     else{
//         let checkBoxes = document.querySelectorAll('input:checked');
//         if (!checkBoxes) return;
//         for(let i=0; i<checkBoxes.length; i++){
//             let block = document.querySelector('.'+ checkBoxes[i].id);
//             dataBase.read(block);
//         }
//     }

//         // if(!e.target.checked) return;
//         // else{

//     // }

// }

},{"./dataBase.js":1}]},{},[2]);
