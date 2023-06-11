const formulario = document.getElementById("formulario")

const inputNombre = document.getElementById("Nombre")
const inputApellido = document.getElementById("Apellido")
const inputDNI = document.getElementById("DNI")
const inputSueldo = document.getElementById("Sueldo")
const inputSucursal = document.getElementById("Sucursal")

const mensajeConfirmacion = document.getElementById("confirmacion-empleado-cargado")

const listaDeEmpleados = document.getElementById("lista-de-empleados")

let empleadosCargados = []

let empleado = {
    nombre: "",
    apellido:  "",
    DNI: "",
    sueldo: "",
    sucursal: ""
}

function guardarEmpleadosEnAlmacenamientoLocal() { 

    localStorage.setItem("empleadosCargados", JSON.stringify(empleadosCargados)) //guarda la lista actualizada en el almacenamiento local
}   

function mostrarEmpleadosEnVisualizacion() {
    /*Enviar un mensaje a la página de visualización con la lista actualizada de empleados.
     Esto permitirá que la página de visualización sepa cuándo se han realizado cambios en la lista.*/
    window.parent.postMessage({ empleadosCargados }, "*");
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

        listaDeEmpleados.appendChild(ul)
    })
}

formulario.addEventListener("submit", (e) =>{

    e.preventDefault()

    const datos = {

        nombre: inputNombre.value,
        apellido: inputApellido.value,
        DNI:inputDNI.value,
        sueldo: inputSueldo.value,
        sucursal: inputSucursal.value
    }
    
    if (!datos.nombre || !datos.apellido || !datos.DNI || !datos.sueldo || !datos.sucursal) {
        alert("Faltan datos por completar!")
        return
    }

    empleado = {

        ...empleado,

        nombre: `Nombre: ${inputNombre.value}`,
        apellido: `Apellido: ${inputApellido.value}`,
        DNI: ` DNI: ${inputDNI.value}`,
        sueldo: `Sueldo: ${inputSueldo.value}`,
        sucursal: `Sucursal ${inputSucursal.value}`
    }

    if (!empleado.nombre ||!empleado.apellido ||!empleado.DNI ||!empleado.sueldo ||!empleado.sucursal) {
        alert("Faltan datos por completar!")
        return
    }

    empleadosCargados.push(empleado)

    guardarEmpleadosEnAlmacenamientoLocal()

    mostrarEmpleadosEnVisualizacion() // enviar la lista actualizada de empleados a la página de visualización.

    mensajeConfirmacion.innerHTML = `El empleado ${datos.nombre} ${datos.apellido} fue cargado exitosamente!`

    setTimeout(() =>{
        mensajeConfirmacion.innerHTML = ``
    }, 2000)

    inputNombre.value = ""
    inputApellido.value = ""
    inputDNI.value = ""
    inputSueldo.value = ""
    inputSucursal.value =  ""

})

window.addEventListener("load", () => {
    const empleadosGuardados = localStorage.getItem("empleadosCargados");
  
    if (empleadosGuardados) {
      empleadosCargados = JSON.parse(empleadosGuardados);
      mostrarEmpleadosEnVisualizacion();
    }
  })





  