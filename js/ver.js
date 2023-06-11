
const listaDeEmpleados = document.querySelector(".listaDeEmpleados")
const botonVerEmpleados = document.getElementById("boton-ver-empleados")

let empleadosCargados = [];

function guardarEmpleadosEnAlmacenamientoLocal() { 

    localStorage.setItem("empleadosCargados", JSON.stringify(empleadosCargados))
}

function eliminarEmpleado(DNI){

    empleadosCargados = empleadosCargados.filter((empleado) => empleado.DNI != DNI)
    //   ul.innerHTML =`El empleado ${empleado.nombre} ${empleado.apellido} fue eliminado del sistema!`

    
    guardarEmpleadosEnAlmacenamientoLocal()
    window.parent.postMessage({ empleadosCargados }, "*") /*cada vez que se elimine un empleado, se enviará la lista actualizada 
                                                          a la página de visualización para mantener ambas páginas sincronizadas.*/
    mostrarEmpleados()
}


function mostrarEmpleados(){

    listaDeEmpleados.innerHTML= ``

    empleadosCargados.forEach((empleado) =>{

        const ul = document.createElement("ul")

        for (const dato of Object.values(empleado)){

            const li =  document.createElement("li")

            li.innerText = `${dato}`

            ul.appendChild(li)
        }

        ul.innerHTML += `
        <button class="btn btn-secondary" id= "boton-eliminar" onclick="eliminarEmpleado('${empleado.DNI}')">Eliminar Empleado</button>
        `

        listaDeEmpleados.appendChild(ul)
    })
}

window.addEventListener("load", () => {   

    const empleadosGuardados = localStorage.getItem("empleadosCargados") 

    if (empleadosCargados) {
        empleadosCargados = JSON.parse(empleadosGuardados) 
        mostrarEmpleados() 
    }

})

window.addEventListener("message", (event) => {// Recuperar los empleados guardados del almacenamiento local cuando los cargue
    //utilizo el evento "message" para escuchar el mensaje enviado desde la página de carga de empleados y actualizar la lista de empleados.

    if (event.data && event.data.empleadosCargados) { // El evento verifica si se recibe un mensaje con la propiedad empleadosCargados.
      empleadosCargados = event.data.empleadosCargados; // Si es así, se actualiza la variable empleadosCargados con los datos recibidos 
      mostrarEmpleados(); //se llama a la función mostrarEmpleados() para reflejar los cambios en la lista.
    }

})

/*cuando elimines un empleado en la página de visualización, la lista de empleados se actualizará en el almacenamiento local 
y se enviará un mensaje a la página de carga de empleados. Luego, la página de carga de empleados recibirá el mensaje, 
actualizará su lista de empleados y mostrará la lista actualizada sin el empleado eliminado. */

botonVerEmpleados.addEventListener("click", () => {

    if (listaDeEmpleados.classList.contains("mostrar")) {
       listaDeEmpleados.classList.remove("mostrar");
       botonVerEmpleados.innerHTML = "Ver empleados";
    } 
    
    else {
       listaDeEmpleados.classList.add("mostrar");
       botonVerEmpleados.innerHTML = "Ocultar empleados";
    }
    
    mostrarEmpleados();
});


