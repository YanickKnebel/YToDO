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
