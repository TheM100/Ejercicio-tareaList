let tareaField = document.getElementById("tareaInput");
let tiempoField = document.getElementById("tiempoInput");

let agregarBtn = document.getElementById("btnAgregarTarea");

agregarBtn.addEventListener("click", () => {
  let tarea = tareaField.value;
  let tiempo = tiempoField.value;
  if (tarea && tiempo) {
    let saveTarea = { tarea, tiempo };
    saveTareaDB(saveTarea);
  } else alert("Llénelo compa");
});

const saveTareaDB = async (tarea) => {
  let response = await fetch(
    "https://tareas-bbf13-default-rtdb.firebaseio.com/.json",

    {
      method: "POST",
      body: JSON.stringify(tarea),
    }
  );
  //   console.log(saveTarea);
  //   let data = await response.json();
  //   return data;
};
