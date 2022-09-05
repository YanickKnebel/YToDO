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

// Start.addEventListener("click", () => {
//   console.log("click");
//   Ziel.textContent = "Monday";
// });

for (i = 0; i < Start.length; i++) {
  // console.log(Start[i]);
  let zielText = "";
  switch (i) {
    case 0:
      zielText = "Montag";
      break;
    case 1:
      zielText = "Dienstag";
      break;
    case 2:
      zielText = "Mitwoch";
      break;
    case 3:
      zielText = "Donnerstag";
      break;
    case 4:
      zielText = "Freitag Yeahh";
      break;
    default:
      zielText = "String ERROR";
  }
  Start[i].addEventListener("click", () => {
    //Active class
    Ziel.textContent = zielText;
  });
}

// Start.addEventListener("click", () => {
//   console.log("click");
//   Ziel.textContent = "Monday";
// });

const aktuelle = new Date();

function getKW(date) {
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
}
console.log("die aktuelle Kalender Woche " + getKW(aktuelle));

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
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
console.log(getKWdates(aktuelle));
