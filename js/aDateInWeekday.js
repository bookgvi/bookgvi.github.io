function DayInWeekDay(month){
    let date = new Date();
    let setdate = new Date(date.getFullYear(), month, 01);
    let weekday = setdate.getDay();

    return weekday;
}

console.log(DayInWeekDay(5));