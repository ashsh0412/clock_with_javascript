const toDOform = document.querySelector(".js-toDoForm"),
  toDoinput = toDOform.querySelector("input"),
  toDolist = document.querySelector(".js-toDolist");
const TODOS_LS = "toDos";

function filterFn(toDos) {
  return toDos.id === 1;
}

let toDos = [];

function deleted(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDolist.removeChild(li);
  const cleantodos = toDos.filter(function (toDos) {
    return toDos.id !== parseInt(li.id);
  });
  toDos = cleantodos;
  savetoDos();
}

function savetoDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintTODO(text) {
  const li = document.createElement("li");
  const Delbut = document.createElement("button");
  const span = document.createElement("span");
  const new_id = toDos.length + 1;
  Delbut.addEventListener("click", deleted);
  span.innerText = text;
  li.appendChild(Delbut);
  li.appendChild(span);
  li.id = new_id;
  Delbut.innerText = "❌";
  toDolist.appendChild(li);
  const toDoObj = {
    text: text,
    id: new_id,
  };
  toDos.push(toDoObj);
  savetoDos();
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoinput.value;
  paintTODO(currentValue);
  toDoinput.value = "";
}
function loadToDos() {
  const loadedTodos = localStorage.getItem(TODOS_LS);
  if (loadedTodos !== null) {
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach(function (todo) {
      paintTODO(todo.text);
    });
  }
}

function init() {
  loadToDos();
  toDOform.addEventListener("submit", handleSubmit);
}

init();
