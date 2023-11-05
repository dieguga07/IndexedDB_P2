document.addEventListener("DOMContentLoaded", function() {
  const formObj = {
    nombre: "h",
    email: "i",
    telefono: "j",
    empresa: "k"
  };
  
  let listadoClientes = document.querySelector("#listado-clientes");
  
  const formularioNombre = document.querySelector("#nombre");
  
  const formularioEmail = document.querySelector("#email");
  
  const formularioTelefono = document.querySelector("#telefono");
  
  const formularioEmpresa = document.querySelector("#empresa");
  
  const agregarClienteBoton = document.querySelector("#formulario input[type='submit']");
  
  let clientesArray = []
  
  // Listeners
  
  formularioNombre.addEventListener("blur", validar);
  formularioEmail.addEventListener("blur", validar);
  formularioTelefono.addEventListener("blur", validar);
  formularioEmpresa.addEventListener("blur", validar);
  agregarClienteBoton.addEventListener("click", (e) => {
    e.preventDefault();
    const nuevoCliente = {
      nombre: formularioNombre.value.trim(),
      email: formularioEmail.value.trim(),
      telefono: formularioTelefono.value.trim(),
      empresa: formularioEmpresa.value.trim(),
    };
  
    agregarBD(nuevoCliente);
    mostrarCliente(nuevoCliente);
    formularioNombre.value = "";
    formularioEmail.value = "";
    formularioTelefono.value = "";
    formularioEmpresa.value = "";
    desactivarBoton();
  });
  
  listadoClientes.addEventListener("click",eliminarCliente)
  listadoClientes.addEventListener("click", editarCliente);
  
  // Funciones
  
  desactivarBoton()
  
  function validar(e) {
  
      comprobarFormulario()
  
      if (e.target.value.trim() === "") {
          mostraAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement)
          formObj[e.target.name] = "";
          comprobarFormulario()
          //console.log(formObj);
          return;
      }
  
      if (e.target.id === "nombre"  && !validarNombres(e.target.value)) {
          mostraAlerta(`La nombre no es válido`, e.target.parentElement)
          formObj[e.target.name] = "";
          comprobarFormulario()
          //console.log(formObj);
          return;
      }
  
      if (e.target.id === "empresa"  && !validarNombres(e.target.value)) {
          mostraAlerta(`La nombre de la empresa no es válido`, e.target.parentElement)
          formObj[e.target.name] = "";
          comprobarFormulario()
          //console.log(formObj);
          return;
      }
  
  
      if (e.target.id === "email" && !validarEmail(e.target.value)) {
          mostraAlerta("El email no es válido", e.target.parentElement)
          formObj[e.target.name] = "";
          comprobarFormulario()
          //console.log(formObj);
          return;
      }
  
  
      if (e.target.id === "telefono" && !validarTelefono( (e.target.value) ) ) {
          mostraAlerta("El Teléfono no es válido", e.target.parentElement)
          formObj[e.target.name] = "";
          comprobarFormulario()
          //console.log(formObj);
          return;
      }
  
      
      limpiarAlerta(e.target.parentElement)
      formObj[e.target.name] = e.target.value.trim().toLowerCase()
      //console.log(formObj);
      comprobarFormulario()
  }
  
  function validarEmail(email) {
      const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
      //Controla  que se escriban los correos correctamente
      const resultado = regex.test(email);
      return resultado;
  }
  
  function comprobarFormulario() {
    const values = Object.values(formObj);
    const camposBien = values.every((value) => value !== "");
  
    if (!camposBien) {
      desactivarBoton();
    } else {
      if (validarEmail(formObj.email) && validarTelefono(formObj.telefono)) {
        activarBoton();
      } else {
        desactivarBoton();
      }
    }
  }
  
  function desactivarBoton() {
    agregarClienteBoton.disabled = true
    agregarClienteBoton.classList.add("opacity-50")
    agregarClienteBoton.classList.remove("hover:bg-teal-900");
  
  }
  
  function activarBoton() {
    agregarClienteBoton.disabled = false
    agregarClienteBoton.classList.remove("opacity-50")
    agregarClienteBoton.classList.add("hover:bg-teal-900");
   
  }
  
    function mostraAlerta(mensaje, referencia) {
     
      limpiarAlerta(referencia)
      const error = document.createElement("P")
      error.textContent = mensaje
      error.classList.add("bg-white", "text-center", "text-red-600", "p-2");
      referencia.appendChild(error)
  
  }
  
    function validarTelefono(telefono) {
      const regex = /^[9|6|7][0-9]{8}$/
      // Esta expresión nos permite obtener una series de 9 digitos comprendidos entre el 0-9 , teniendo que ser el primero 9 , 6 o 7
  
      const resultado = regex.test(telefono);
      return resultado;
  }
  
  function validarNombres(nombre) {
      const regex = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
      // Esta expresión nos permite añadir una o dos palabras aceptando acentos, mayúsclas y la ñ 
      //.Tambien permite la separación por ' o - en caso de que sean necesarios
      const resultado = regex.test(nombre);
      return resultado;
  }
  
  function limpiarAlerta(referencia) {
      const alerta = referencia.querySelector(".bg-white")
      if (alerta) {
        alerta.remove()
      } 
  }
  
  function eliminarCliente(email) {
    if (email) {
      eliminarBD(email, () => {
        clientesArray = clientesArray.filter((cliente) => cliente.email !== email);
        const cliente = document.querySelector(`[data-email="${email}"]`);
        if (cliente) {
          cliente.remove();
        }
      });
    }
  }
    
    function añadirCliente(e) {
  
      e.preventDefault();
      limpiarHTML()
      const nuevoCliente = {
        nombre: formularioNombre.value.trim(),
        email: formularioEmail.value.trim(),
        telefono: formularioTelefono.value.trim(),
        empresa: formularioEmpresa.value.trim(),
      };
    
      clientesArray.push(nuevoCliente);
      mostrarCliente();
  }
  
  function mostrarCliente(cliente) {
    const row = document.createElement("tr");
    row.dataset.email = cliente.email;
  
    row.innerHTML = `
      <td class="eliminar">${cliente.nombre}</td>
      <td>${cliente.telefono}</td>
      <td>${cliente.empresa}</td>
      <td>
          <button class="borrar-cliente">X</button>
          <button class="editar-cliente">Editar</button>
      </td>
    `;
  
    listadoClientes.appendChild(row);
  
    // Agregar oyente para eliminar cliente
    row.querySelector(".borrar-cliente").addEventListener("click", () => {
      eliminarCliente(cliente.email);
    });
  }
  
  function limpiarHTML() {
      
      while (listadoClientes.firstChild) {
          listadoClientes.firstChild.remove();
      }
  }
  
  function editarCliente(e) {
    if (e.target.classList.contains("editar-cliente")) {
      const td = e.target.parentElement.parentElement;
      const nombreClienteEditar = td.querySelector('.eliminar').textContent;
  
      const clienteAEditar = clientesArray.find((cliente) => cliente.nombre === nombreClienteEditar);
  
      if (clienteAEditar) {
        // Llenar el formulario con los datos del cliente a editar
        formularioNombre.value = clienteAEditar.nombre;
        formularioEmail.value = clienteAEditar.email;
        formularioTelefono.value = clienteAEditar.telefono;
        formularioEmpresa.value = clienteAEditar.empresa;
  
        // Realizar la edición en la base de datos utilizando put
        const transaccion = db.transaction(["clientes"], "readwrite");
        const almacen = transaccion.objectStore("clientes");
        almacen.put(clienteAEditar);
  
        // Volver a mostrar la lista actualizada después de editar
        mostrarCliente(clienteAEditar);
      }
    }
  }
  
  let db;
  
  const conexion = indexedDB.open("BaseDatosClientes", 2);
  
  conexion.onsuccess = () => {
    db = conexion.result;
    console.log("Base de datos abierta", db);
    consultarBD();
  };
  
  conexion.onupgradeneeded = (e) => {
    db = e.target.result;
    console.log("Base de datos creada", db);
    if (!db.objectStoreNames.contains("clientes")) {
      const almacen = db.createObjectStore("clientes", { keyPath: "email" });
      almacen.createIndex("nombre", "nombre", { unique: false });
    }
  };
  
 
  const agregarBD = (cliente) => {
    const transaccion = db.transaction(["clientes"], "readwrite");
    const almacen = transaccion.objectStore("clientes");
    almacen.add(cliente);
  };
  
  function eliminarBD(email, callback) {
    const transaccion = db.transaction(["clientes"], "readwrite");
    const almacen = transaccion.objectStore("clientes");
  

      const solicitud = almacen.delete(email);
  
      solicitud.onsuccess = () => {
        console.log(`Cliente con email ${email} eliminado exitosamente.`);
        if (callback) {
          callback();
        }
      };
  
      solicitud.onerror = (event) => {
        console.error(`Error al eliminar el cliente con email ${email}: ${event.target.error.message}`);
      };
    
    
  }
  
  function consultarBD() {
    if (db) {
      const transaccion = db.transaction(["clientes"], "readonly");
      const almacen = transaccion.objectStore("clientes");
      const conexion = almacen.openCursor();
  
      conexion.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          mostrarCliente(cursor.value);
          cursor.continue();
        }
      };
    }
  }
  
  consultarBD();
});
