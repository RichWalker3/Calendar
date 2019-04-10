// number of days in each month
const dayNumber = (function() {
  return {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  }
})()

// full month names
const fullName = (function() {
  return {
    "1": "January",
    "2": "February",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    "10": "October",
    "11": "November",
    "12": "December"
  }
})()

// returns date in [m, d, y] form
const today = () => {
  const date = new Date();
  return date.toLocaleDateString().split('/')
}

// returns day of week in # form from [m, d, y] format
const firstDayOfMonth = (monthDate) => new Date(monthDate[2], monthDate[0] - 1, 1)

// puts numbers in calendar
const fillCal = (firstDay, days, month) => {
  const cal = document.getElementById("cal")
  cal.innerHTML = '';
  //adding blank days up to 1st of the month
  for (let i = 0; i < firstDay.getDay(); i += 1) {
    var node = document.createElement("P");
    var textnode = document.createTextNode('');
    node.appendChild(textnode);
    cal.appendChild(node);
  }

  let currentDay = firstDay.getDay()
  //adding day numbers and weekend class
  for (let i = 1; i <= days; i += 1) {
    var node = document.createElement("P");
    var textnode = document.createTextNode(i);
    if (currentDay === 0 || currentDay === 6) {
      node.className = "weekend";
    }
    node.appendChild(textnode);
    cal.appendChild(node);
    
    // resets currentDay to 0 when > 6
    currentDay = currentDay + 1;
    if (currentDay > 6) {
      currentDay = currentDay - 7
    }
  }
  addTitle(month)

}

//next and prev button function
const changeMonths = () => {
  let currentDate = today()
  const change = (monthChange, direction) => {
    if (direction === 'next' && currentDate[0] === '12') {          // next December
      currentDate[0] = '1';
      currentDate[2] = String(Number(currentDate[2]) + monthChange)
    } else if (direction === 'prev' && currentDate[0] === '1') {    //prev January
      currentDate[0] = '12';
      currentDate[2] = String(Number(currentDate[2]) + monthChange)
    } else {
      currentDate[0] = String(Number(currentDate[0]) + monthChange)
    }
    currentDate[1] = '1'   //sets date to 1

    fillCal(firstDayOfMonth(currentDate), dayNumber[currentDate[0]], currentDate)
  }
  return change
}

// adds month name to top of calendar
const addTitle = (currentMonth = today()) => {
  const title = document.getElementById("title")
  title.innerHTML = '';
  var header = document.createElement("H3");
  var text = document.createTextNode(fullName[currentMonth[0]] + " " + currentMonth[2]);
  header.appendChild(text);
  title.appendChild(header);
}

const changeCal = changeMonths()
fillCal(firstDayOfMonth(today()), dayNumber[today()[0]])




