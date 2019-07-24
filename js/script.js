'use strict';

// Elements for  creating calendar
let year = 2019;
let m = 0;

// Date block
let date = new Date();
let toDay = date.getDate();
let tdayOfWeek = date.getDay();
let weekday = ['Mon','Tue','Wen','Thu','Fri','Sat', 'Sun'];
let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


for(let i=0;i<month.length; i++)
    document.body.append(createMonth(i,year));

markToday(toDay, month[date.getMonth()]);



////////////////////////////////////////////////////////////////////////////////////////////////
function createMonth(setMonth,setYear){

    // Calendar block - Table
    let celId = 1;
    let day = 1;
    let allDays = allDaysInMonth(setMonth,setYear); // Get max quantity of days in month
    let table = document.createElement('table');
    table.id = month[setMonth];

    let tr = []; //Tables rows
    let td = []; //Tables cells

    // Month - header
    let mTr = document.createElement('caption');
    table.appendChild(mTr);
    mTr.innerHTML = '<h3>' + month[setMonth] + ' ' + year + '</h3>';

    // Week Days
    let weekTr = document.createElement('tr');
    let weekTd = []; 
    table.appendChild(weekTr);
    for(let i = 0; i<7; i++){
        weekTd[i] = document.createElement('th');
        weekTr.appendChild(weekTd[i]);
        weekTd[i].innerHTML = weekday[i];
    }
        // Main table - Days of month
    for(let row=1; row<8; row++){
        tr[row] = document.createElement('tr')
        table.appendChild(tr[row])
        tr[row].id = row;
        for(let cell=1; cell<8; cell++){
            td[cell] = document.createElement('td');
            tr[row].appendChild(td[cell]);
            td[cell].id = celId++;

            if(td[cell].id<DayInWeekDay(setMonth, setYear))
                td[cell].style.border = 0; // Убрать обрамление ячеек до 1-го числа месяца
            else if(td[cell].id>=DayInWeekDay(setMonth, setYear) && day<= maxDays(setMonth, setYear))
                td[cell].innerHTML = day++;  // Прописываем дни месяца
            else td[cell].style.border = 0; // Не обрамлять ячейки после конца месяца
        }
    }
            
    document.body.appendChild(table); // Draw the table
    return table;
}

// Mark TODAY
function markToday(currentDay, currentMonth){
    //try {
        let setMonth = document.getElementById(currentMonth);
        let today = setMonth.querySelector('td[id=\"'+currentDay+ '\"]');
        today.classList.add('currentDay');
}

// Calculate how much days in the Month
function maxDays(month, year){
    let date = new Date();
    let setDate = new Date(year,month,1);
    let setDatePlusOneMonth = new Date(year,month+1,1);
    let d = (setDatePlusOneMonth - setDate)/1000/3600/24;
    return d;
}

// Get all days in any month. Function return an array
function allDaysInMonth(month,year){
    let d = maxDays(month,year);
    let arr = [];

    for(let i=1; i<=d; i++)
        arr[i-1] = i;
    
    return arr;
}


function DayInWeekDay(month,year){
    let date = new Date();
    let setdate = new Date(year, month, 1);
    let weekday = setdate.getDay();

    // Check if Sunday! (getDAy() set Synday with '0')
    if (weekday==0) weekday = 7;

    return weekday;
}

////////////////////////////////////////////////////////////////////
