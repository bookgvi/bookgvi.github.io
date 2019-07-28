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
