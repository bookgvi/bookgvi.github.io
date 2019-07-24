'use strict'
let date = new Date();
    let setDate = new Date(date.getFullYear(),month,1);
    let setDatePlusOneMonth = new Date(date.getFullYear(),month+1,1);
    let d = (setDatePlusOneMonth - setDate)/1000/3600/24;