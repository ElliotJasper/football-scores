date_ob = new Date();

// Format Date For API URL
// Get current dates
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = weekday[date_ob.getDay()];

let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let monthName = date_ob.toLocaleString("default", { month: "long" });

// Format Date For JSON Path
// Wednesday-23rd-February
date = date.toString();
let dateFinalDigit = date.slice(-1);
let dateFinish = '';

month = month.toString();
if (month.length == 1) {
    month = '0' + month;
}
let dateTwo;
date = date.toString();
if (date.length == 1) {
    dateTwo = '0' + date;
} else dateTwo = date

// Format date to have 1st 2nd 3rd or th endings on day.
switch (dateFinalDigit) {
    case '1': dateFinish = 'st';
    break;

    case '2': dateFinish = 'nd';
    break;

    case '3': dateFinish = 'rd';
    break;

    default: dateFinish ='th'
}
let dayComplete = date + dateFinish;
console.log(dayComplete);
let x = module.exports.formatDatePath = day + '-' + dayComplete + '-' + monthName;
let y = module.exports.formatDateAPI = year + '-' + month + '-' + dateTwo;
console.log(x);
console.log(y);

