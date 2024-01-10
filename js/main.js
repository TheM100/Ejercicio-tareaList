//Identificar Variables Input

let tareaField = document.getElementById("tareaInput");
let tiempoField = document.getElementById("tiempoInput");

//Identificar botón que hará la acción
let agregarBtn = document.getElementById("btnAgregarTarea");
//Asignar las variables a un objeto para poder usarlas
agregarBtn.addEventListener("click", () => {
  let tarea = tareaField.value;
  let tiempo = tiempoField.value;
  if (tarea && tiempo) {
    let saveTarea = { tarea, tiempo };
    saveTareaDB(saveTarea);
  } else alert("Para agregar una tarea hay que llenar ambos campos");
  printAllTasks();
});

//Subir tarea a la base de datos
const saveTareaDB = async (tarea) => {
  let response = await fetch(
    "https://tareas-bbf13-default-rtdb.firebaseio.com/.json",

    {
      method: "POST",
      body: JSON.stringify(tarea),
    }
  );
  let data = await response.json();
  return data;
};

//Tomar la lista de tareas de la base de datos
const getAllTareas = async () => {
  let response = await fetch(
    "https://tareas-bbf13-default-rtdb.firebaseio.com/.json"
  );
  let data = await response.json();
  console.log(data);
  return data;
};

//funcion para borrar
const deleteTask = async (taskKey) => {
  let response = await fetch(
    "https://tareas-bbf13-default-rtdb.firebaseio.com/.json",
    {
      method: "DELETE",
    }
  );
  let data = await response.json();
  return data;
};

const turnObjIntoArray = async () => {
  let tareasObj = await getAllTareas();
  let tareasArray = Object.keys(tareasObj).map((key) => ({
    ...tareasObj[key],
    key,
  }));
  console.log(tareasArray);
  return tareasArray;
};

//Imprimir las tareas de la base de datos en la lista
const createTareaItem = (singleTask) => {
  let { tarea, tiempo, key } = singleTask;

  let newLi = document.createElement("li");
  newLi.classList.add("list-group-item");

  let newLiText = document.createTextNode(tarea);

  let timeSpan = document.createElement("span");
  let timeSpanText = document.createTextNode(" minutos");
  timeSpan.classList.add("fw-bold");
  timeSpan.append(` ${tiempo}`, timeSpanText);

  let buttonWrapper = document.createElement("div");

  let addTaskBtn = document.createElement("button");
  let btnText = document.createTextNode("+");
  addTaskBtn.classList.add("btn", "btn-success");
  addTaskBtn.append(btnText);

  let deleteTaskBtn = document.createElement("button");
  let deleteTaskBtnText = document.createTextNode("Delete");
  deleteTaskBtn.classList.add("btn", "btn-danger");
  deleteTaskBtn.append(deleteTaskBtnText);
  deleteTaskBtn.addEventListener("click", async () => {
    let data = await deleteTask(key);
    printAllTasks();
  });

  buttonWrapper.append(addTaskBtn, deleteTaskBtn);
  newLi.append(newLiText, timeSpan, buttonWrapper);

  return newLi;
};

const printAllTasks = async () => {
  let tareasUl = document.getElementById("tareasPendientesUl");
  tareasUl.innerHTML = "";

  let taskArray = await turnObjIntoArray();
  console.log(taskArray);
  taskArray.forEach((element) => {
    let taskItem = createTareaItem(element);
    tareasUl.append(taskItem);
  });
};

printAllTasks();
