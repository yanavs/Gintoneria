  const formulario = document.getElementById("formulario")

  const inputNombre = document.getElementById("Nombre")
  const inputStock = document.getElementById("Stock")
  const inputSKU = document.getElementById("SKU")
  const inputMinorista = document.getElementById("Precio-Minorista")
  const inputMayorista = document.getElementById("Precio-Mayorista")

  const listaDeGins = document.getElementById("lista-de-gins")

  let ginsCargados = []

  let gin = {
    nombre: "",
    stock:"",
    SKU: "",
    minorista: "",
    mayorista: ""
  }

  function guardarGinsEnAlmacenamientoLocal() { //Esta función guarda la lista ginsCargados en el almacenamiento local

    localStorage.setItem("ginsCargados", JSON.stringify(ginsCargados))// Convierto el objeto ginsCargados a formato JSON para poder guardarlo.
    //Guardo la lista actualizada de gins en el almacenamiento local después de cargar los productos.
  }

  function eliminarGin(SKU) {
    ginsCargados = ginsCargados.filter((gin) => gin.SKU != SKU)

    cargarGins()
    guardarGinsEnAlmacenamientoLocal()
  }

  function editarStock(SKU) {
    // Buscar el gin específico por SKU
    const ginSeleccionado = ginsCargados.find((gin) => gin.SKU === SKU);
  
    if (ginSeleccionado) {
      // Obtener el índice del gin seleccionado en el arreglo ginsCargados
      const indiceGinSeleccionado = ginsCargados.indexOf(ginSeleccionado);
  
      // Solicitar al usuario el nuevo valor del stock
      const nuevoStock = prompt("Ingrese el nuevo stock:");
  
      // Actualizar el valor del stock en el gin seleccionado
      ginSeleccionado.stock = nuevoStock;
  
      // Actualizar el valor del stock en el elemento <li> correspondiente
      const elementoLiStock = listaDeGins.children[indiceGinSeleccionado].querySelector('li:nth-child(2)');
      elementoLiStock.innerText = `Stock: ${nuevoStock}`;
  
      // Guardar los cambios en el almacenamiento local
      guardarGinsEnAlmacenamientoLocal();
    }
  }

  function cargarGins() {
    listaDeGins.innerHTML = ``

    ginsCargados.forEach((gin) => {
      const ul = document.createElement("ul")

      for (const dato of Object.values(gin)) {
        const li = document.createElement("li")
        li.innerText = `${dato}`
        ul.appendChild(li)

      //   if (dato === gin.stock.elementoLi) {
      //     gin.stock.elementoLi = li
      //   }

      //   gin.stock.elementoLi.innerHTML += ` 
      //  <button id="boton-editar-Stock" class="btn btn-light" onclick="editarStock('${gin.SKU}')">Editar Stock</button>`
      } 

      // if (index === 1) {
      //   const botonEditarStock = document.createElement("button")
      //   botonEditarStock.innerText = "Editar"
      //   botonEditarStock.classList.add("btn-light");

      //   botonEditarStock.addEventListener("click", () => {})
      //   gin.stock.elementoLi.appendChild(botonEditarStock);
      // }

      ul.innerHTML += `
      
      <button id="boton-eliminar" class="btn btn-dark" onclick="eliminarGin('${gin.SKU}')">Eliminar</button>
      <button id="boton-editar-Stock" class="btn btn-light" onclick="editarStock('${gin.SKU}')">Editar Stock</button>
      `
      

      listaDeGins.appendChild(ul)
    })
  }

  window.addEventListener("load", () => { 

    const ginsGuardados = localStorage.getItem("ginsCargados") 
    // Cuando la página se cargue, verifico si hay datos guardados en el almacenamiento local 
    

    if (ginsGuardados) {
      ginsCargados = JSON.parse(ginsGuardados) // Si existen datos, se parsean del formato JSON a un objeto JavaScript y se asignan a la variable ginsCargados.
      cargarGins() //Llamo a la función cargarGins() para mostrar los productos en la página
    }
    //si hay datos guardados en el almacenamiento local, los cargo en el arreglo ginsCargados

  })

  formulario.addEventListener("submit", (e) => {
    e.preventDefault()

    const datos = {
      nombre: inputNombre.value,
      stock: inputStock.value,
      SKU: inputSKU.value,
      minorista: inputMinorista.value,
      mayorista: inputMayorista.value
    }

    /*Creo el objeto datos que contiene los valores originales de los inputs para realizar la validacion
    ya que luego actualizo las propiedades de gin con texto adicional para aclarar cada propiedad del gin,
    por lo tanto la validacion ya no funcionaria correctamente, 
    porque las propiedades contienen texto adicional en lugar de los valores originales del input.*/
  
    if (!datos.nombre || !datos.stock || !datos.SKU || !datos.minorista || !datos.mayorista) {
      alert("Faltan datos por completar!")
      return
    }

    gin = {
      ...gin,

      nombre: `Nombre: ${inputNombre.value}`,
      stock: `Stock: ${inputStock.value}`,
      SKU: `SKU: ${inputSKU.value}`,
      minorista: `P.Minorista: ${inputMinorista.value}`,
      mayorista: `P.Mayorista: ${inputMayorista.value}`
    }

    ginsCargados.push(gin)

   guardarGinsEnAlmacenamientoLocal()

    inputNombre.value = ""
    inputStock.value = ""
    inputSKU.value = ""
    inputMinorista.value = ""
    inputMayorista.value = ""
    
    cargarGins() 
  })







  // li.classList.add(dato.replace(/[^a-zA-Z0-9]/g, "-")); Agregar clase al <li> con el nombre de su contenido
        /* replace()  reemplaza partes de una cadena con otra parte especificada. 
        En este caso, para reemplazar los caracteres no alfanuméricos en la variable dato por guiones ("-").

        Eso lo represento con: (/[^a-zA-Z0-9]/g, "-" ). 

        Donde: /[^a-zA-Z0-9]/g es una expresión regular que se utiliza como patrón de búsqueda.
                                En este caso significa "cualquier carácter que no sea una letra (mayúscula o minúscula) o un número del 0 al 9". El ^ dentro de corchetes ([^...]) indica la negación del patrón.
            y:   "-"   es lo que se utilizará para reemplazar cada coincidencia encontrada por la expresión regular.     */
         
       /* Entonces, cuando se ejecuta, se reemplazan todos los caracteres no alfanuméricos en dato por guiones ("-").
        Esto es para garantizar que el resultado sea una cadena válida para usar como nombre de clase en HTML y CSS, ya que los nombres de clase no pueden contener caracteres especiales o espacios en blanco. */

