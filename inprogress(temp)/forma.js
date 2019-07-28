const dataBase = require('./dataBase');
const util = require('./util.js');

document.addEventListener('input',hInput);
document.addEventListener('change', util.check);

function hInput(e){
    dataBase.write(e);
    util.check();
}
