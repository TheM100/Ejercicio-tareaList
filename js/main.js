let tareaField = document.getElementById("tareaInput");
let tiempoField = document.getElementById("tiempoInput");
let agregarBtn = document.getElementById("btnAgregarTarea");



agregarBtn.addEventListener("click", () => {
  
  let objTarea = {
    tarea : "",
    time : "",
  }
    let textTarea = tareaField.value
    let textTime = tiempoField.value

    if (textTarea && textTime) {
      objTarea.tarea = textTarea
      objTarea.time = textTime
      }else{
        alert("Llena bien los campos Compa")
      }

      console.log(objTarea)
      saveTareaDB(objTarea)

});

//Funcion para Insertar en BD
const saveTareaDB = async (ObjetoTareas) => {
  let response = await fetch(
    "https://tareasbd-d66b3-default-rtdb.firebaseio.com/.json",

    {
      method: "POST",
      body: JSON.stringify(ObjetoTareas),
    }
  );
 
};
