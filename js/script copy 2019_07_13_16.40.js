'use strict'
function createMonth(setMonth){
    let body = document.body;

    // Date block
    let date = new Date();
    let toDay = date.getDate();
    let tdayOfWeek = date.getDay();
    let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let weekday = ['Mon','Tue','Wen','Thu','Fri','Sat', 'Sun'];

    // Calendar block - Table
    let celId = 1;
    let day = 1;
    let allDays = allDaysInMonth(setMonth);
    let table = document.createElement('table');
    table.id = month[setMonth]+ date.getFullYear();

    let tr = []; //Tables rows
    let td = []; //Tables cells

    // Month - header
    let mTr = document.createElement('caption');
    table.appendChild(mTr);
    mTr.innerHTML = '<h3>' + month[setMonth] + " " + date.getFullYear() + '</h3>';

    // Week Days
    let weekTr = document.createElement('tr');
    let weekTd = []; 
    table.appendChild(weekTr);
    for(let i = 0; i<7; i++){
        weekTd[i] = document.createElement('td');
        weekTr.appendChild(weekTd[i]);
        weekTd[i].innerHTML = weekday[i];
        if(i>=5)
            weekTd[i].classList.add('weekDayCell');
    }
        // Main table - Days of month
    for(let row=1; row<8; row++){
        tr[row] = document.createElement('tr')
        table.appendChild(tr[row])
        tr[row].id = row;
        // Fill ID's of the cells
            for(let cell=1; cell<8; cell++){
                td[cell] = document.createElement('td');
                tr[row].appendChild(td[cell]);
                td[cell].id = celId++;
 
                if(td[cell].id<DayInWeekDay(setMonth))
                    td[cell].style.border = 0;
                else if(td[cell].id>=DayInWeekDay(setMonth) && day<= maxDays(setMonth))
                    td[cell].innerHTML = day++;
                else td[cell].style.border = 0;

                // Make a style for WeekEnd
                if(cell>5)
                    td[cell].classList.add('weekDayCell');
            }
    }
            
    body.appendChild(table);
    markToday(toDay, month[date.getMonth()] + date.getFullYear());
}
// Mark TODAY
function markToday(currentDay, currentMonth){
    try {
        let setMonth = document.getElementById(currentMonth);
        let today = setMonth.querySelector('td[id=\"'+currentDay+ '\"]');
        today.style.backgroundColor = 'yellow';
    }
    catch (err) {
       // alert(err.message);
    };
}

// Calculate how much days in the Month
function maxDays(month){
    let date = new Date();
    let setDate = new Date(date.getFullYear(),month,1);
    let setDatePlusOneMonth = new Date(date.getFullYear(),month+1,1);
    let d = (setDatePlusOneMonth - setDate)/1000/3600/24;
    return d;
}

function allDaysInMonth(month){
    let d = maxDays(month);
    let arr = [];

    for(let i=1; i<=d; i++)
        arr[i-1] = i;
    
    return arr;
}

function DayInWeekDay(month){
    let date = new Date();
    let setdate = new Date(date.getFullYear(), month, 1);
    let weekday = setdate.getDay();

    // Check if Sunday! (getDAy() set Synday with '0')
    if (weekday==0) weekday = 7;

    return weekday;
}


let setYear = 2019;
for(let i=0; i<12; i ++) 
    createMonth(i);

