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
    console.log(saveTareaDB(saveTarea));
  } else alert("Llénelo compa");
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
  return data;
};
//Imprimir las tareas de la base de datos en la lista
// const createTareaItem = (tareaObject) => {
//     let {tarea, tiempo} =

// }
