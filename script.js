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
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
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

const aktuelle = new Date();

function getKW(date) {
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  console.log(date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7)));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  console.log((date.getTime() - week1.getTime()) / 86400000);

  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) / //rechnung zum donnerstag
        7
    )
  );
}
console.log("test", getKW(new Date(2022, 0, 4)));
console.log("die aktuelle Kalender Woche " + getKW(aktuelle));

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

function getKWdates(date) {
  const monday = getMonday(date); //.toLocaleString("de-de", { weekday: "short" });

  const tuesday = new Date(monday); //.toLocaleString("de-de", {
  //weekday: "short",})
  tuesday.setDate(tuesday.getDate() + 1);

  const wensday = new Date(monday); //.toLocaleString("de-de", {
  //weekday: "short",})
  wensday.setDate(wensday.getDate() + 2);

  const thursday = new Date(monday);
  //.toLocaleString("de-de", {weekday: "short",})
  thursday.setDate(thursday.getDate() + 3);

  const friday = new Date(monday);
  //.toLocaleString("de-de", { weekday: "short" });
  friday.setDate(friday.getDate() + 4);
  console.log(friday);
  return [monday, tuesday, wensday, thursday, friday];
}
console.log(getKWdates(aktuelle));
const week = getKWdates(aktuelle);

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
const testWeek = data[0];
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
    boardChange(element);
  });
  document.querySelector("div.list").appendChild(cloneContent);
}

const headline = document.querySelector("span.dayShift");
const datum = document.querySelector("span.dayShiftDate");
const text = document.querySelector("section.text");

const boardChange = (toDay) => {
  headline.textContent = toDay.date.toLocaleString([], { weekday: "long" });
  datum.textContent = toDay.date.toLocaleString([], {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  text.textContent = toDay.content;
};

console.log(data[0][0].content);
