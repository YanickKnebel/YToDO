//magic number
const oneDayInMilliseconds = 886400000;

// greeting
let time = new Date();
const hour = time.getHours();
const lunch = 12;
const lunchtime = lunch + 2;
const afternoon = 17;
let greeting = "Guten Morgen";

if (hour >= lunch && hour <= lunchtime) {
  greeting = "Mahlzeit";
}
if (hour > lunchtime && hour <= afternoon) {
  greeting = "moin";
}
if (hour > afternoon) {
  greeting = "Guten Abend";
}
console.log(greeting);

const salutation_element = document.getElementById("salutation");
console.log(salutation_element);
salutation_element.textContent = greeting;

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

let Ziel = document.querySelector("span.dayShift");
console.log(Ziel);

let Start = document.querySelectorAll(".list section");
console.log(typeof Start);

const currentDay = new Date();

function getKW(date) {
  let day = date;
  day.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  day.setDate(day.getDate() + 3 - ((day.getDay() + 6) % 7));
  console.log(day.setDate(day.getDate() + 3 - ((day.getDay() + 6) % 7)));
  // January 4 is always in week 1.
  let week1 = new Date(day.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from day to week1.
  console.log((day.getTime() - week1.getTime()) / oneDayInMilliseconds);

  return (
    1 +
    Math.round(
      ((day.getTime() - week1.getTime()) / oneDayInMilliseconds -
        3 +
        ((week1.getDay() + 6) % 7)) / //rechnung zum donnerstag
        7
    )
  );
}

console.log("die aktuelle Kalender Woche " + getKW(currentDay));

function getMonday(d) {
  //d=date
  d = new Date(d);
  let day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  const newDate = new Date(d.setDate(diff));

  return newDate;
}

function getKWdates(date) {
  const monday = getMonday(date);

  const tuesday = new Date(monday);
  tuesday.setDate(tuesday.getDate() + 1);

  const wensday = new Date(monday);
  wensday.setDate(wensday.getDate() + 2);

  const thursday = new Date(monday);
  thursday.setDate(thursday.getDate() + 3);

  const friday = new Date(monday);
  friday.setDate(friday.getDate() + 4);

  return [monday, tuesday, wensday, thursday, friday];
}
console.log(getKWdates(currentDay));
const week = getKWdates(currentDay);

const data = [
  [
    {
      date: week[0],
      content: "montag",
    },
    {
      date: week[1],
      content: "dienstag",
    },
    {
      date: week[2],
      content: "mitwoch",
    },
    {
      date: week[3],
      content: "donerstag",
    },
    {
      date: week[4],
      content: "freitag",
    },
  ],
];
console.log(week[0]);
const testWeek = data[0]; // testWeek have not real content
for (let i = 0; i < testWeek.length; i++) {
  const element = testWeek[i];
  const buttonWeekdayTemplate =
    document.getElementsByClassName("buttonWeekday")[0];
  const cloneContent = buttonWeekdayTemplate.content
    .cloneNode(true)
    .querySelector("section");
  cloneContent.textContent = element.date.toLocaleString([], {
    weekday: "short",
  });
  cloneContent.addEventListener("click", () => {
    onBoardChange(element);
  });
  document.querySelector("div.list").appendChild(cloneContent);
}

const headline = document.querySelector("span.dayShift");
const dateExit = document.querySelector("span.dayShiftDate");
const text = document.querySelector("section.text");

const onBoardChange = (toDay) => {
  headline.textContent = toDay.date.toLocaleString([], { weekday: "long" });
  dateExit.textContent = toDay.date.toLocaleString([], {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  text.textContent = toDay.content;
};

console.log(data[0][0].content);

const todoInput = document.querySelector(".todo-input");
const todoInput = document.querySelector(".todo-input");
const todoInput = document.querySelector(".todo-input");
