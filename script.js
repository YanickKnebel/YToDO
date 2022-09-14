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

window.onclick = function (Event) {
  if (!Event.target.matches(".dropbtn")) {
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
  let day = new Date(date);
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
console.log("currentDay", currentDay);
const hello = getKW(currentDay);
console.log("currentDay", currentDay);
console.log("die aktuelle Kalender Woche " + getKW(currentDay));

function getMonday(d) {
  //d=date
  d = new Date(d);
  let day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  const monday = new Date(d.setDate(diff));
  return monday;
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

//Datenbank
const data = [
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
];
const rightNow = currentDay.getDay();

let whichDay = data[rightNow - 1].content;
// const testWeek = data[0]; // testWeek have not real content
const buttonWeekdayTarget = document.querySelector("div.list");
data.forEach((day) => {
  const buttonWeekdayTemplate =
    document.getElementsByClassName("buttonWeekday")[0];
  const cloneContent = buttonWeekdayTemplate.content
    .cloneNode(true)
    .querySelector("section");
  cloneContent.textContent = day.date.toLocaleString([], {
    weekday: "short",
  });
  cloneContent.addEventListener("click", () => {
    whichDay = day.content;
    onBoardChange(day.date);
  });
  buttonWeekdayTarget.appendChild(cloneContent);
  // add storge for Day
  check(day.content);
});

const headline = document.querySelector("span.dayShift");
const dateExit = document.querySelector("span.dayShiftDate");
const text = document.querySelector("section.text");
const parentContainer = document.querySelector("div.todo-container");

const onBoardChange = (toDay) => {
  const namenTag = toDay.toLocaleString([], { weekday: "long" });
  headline.textContent = namenTag;
  dateExit.textContent = toDay.toLocaleString([], {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  //aktuelle ul hollen
  const baitList = document.querySelector("ul.todo-Ul-List");
  console.log("bait list: ", baitList);
  //holen ul template
  const contentTodoListTemplate = parentContainer.querySelector(
    "template.ulTemplate"
  );
  const cloneContentTodoListTemplate = contentTodoListTemplate.content
    .cloneNode(true)
    .querySelector("ul.todo-Ul-List");
  console.log("clone template list: ", cloneContentTodoListTemplate);

  // get => template
  const newList = getTodos(cloneContentTodoListTemplate);
  console.log("new list: ", newList);
  // erstezen alt ul template
  parentContainer.replaceChild(newList, baitList);
};
onBoardChange(currentDay);

function check(weekday) {
  let dayweek = weekday;
  let dayweekTodo;
  if (localStorage.getItem(dayweek) === null) {
    dayweekTodo = [];
    localStorage.setItem(dayweek, JSON.stringify(dayweekTodo));
  }
}
//selector
const todoInput = document.querySelector(".todo-input");
const filterOption = document.querySelector(".filter-todo");

//Eventlisener
// document.addEventListener("DOMContentLoaded", getTodos());

filterOption.addEventListener("change", filterTodo);

//funktion
function addToDo(event) {
  // prevent form from submiting
  event.preventDefault();
  const contentTodoListTemplate = document.querySelector(
    "ul.todo-Ul-List template"
  );
  const cloneContentTodoListTemplate = contentTodoListTemplate.content
    .cloneNode(true)
    .querySelector("li.todo");
  cloneContentTodoListTemplate.querySelector(".label").textContent =
    todoInput.value;
  //add TODO TO LOCALSTORAGE
  saveLocalTodos(todoInput.value);
  //Append to List
  document
    .querySelector("ul.todo-Ul-List")
    .appendChild(cloneContentTodoListTemplate);
  //clear toDo input  Value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
function filterTodo(e) {
  const todoUlList = document.querySelector(".todo-Ul-List");
  console.log(todoUlList);
  const todos = Array.from(todoUlList.children);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
// } else {
//   dayweek = JSON.parse(localStorage.getItem("todos"));
// }
// }
function saveLocalTodos(todo) {
  //CHECK have i items in there?

  let toDosFromStorage = JSON.parse(localStorage.getItem(whichDay));
  toDosFromStorage.push(todo);
  // save the in storage
  localStorage.setItem(whichDay, JSON.stringify(toDosFromStorage));
}

function getTodos(emptyList) {
  const fillList = emptyList;
  console.log("get todos:", fillList);
  //CHECK have i items in there?
  let toDosFromStorage = JSON.parse(localStorage.getItem(whichDay));
  toDosFromStorage.forEach(function (todo) {
    const contentTodoListTemplate = fillList.querySelector("template");
    const cloneContentTodoListTemplate = contentTodoListTemplate.content
      .cloneNode(true)
      .querySelector("li.todo");
    cloneContentTodoListTemplate.querySelector(".label").textContent = todo;
    //Append to List
    fillList.appendChild(cloneContentTodoListTemplate);
  });
  return fillList;
}
function removeLocalTodos(todo) {
  let toDosFromStorage = JSON.parse(localStorage.getItem(whichDay));
  const todoIndex = todo.children[0].innerText;
  toDosFromStorage.splice(toDosFromStorage.indexOf(todoIndex), 1);
  localStorage.setItem(whichDay, JSON.stringify(toDosFromStorage));
}
