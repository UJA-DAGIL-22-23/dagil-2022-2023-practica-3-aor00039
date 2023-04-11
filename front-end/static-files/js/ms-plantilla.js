/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

var vDatos;


// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

Plantilla.plantillaTags = {
    "ID": " ID ",
    "nombre ": " nombre ",
    "apellidos ": " apellidos ",
    "dia": " dia ",
    "mes": " mes ",
    "Año": " Año ",
    "ciudad": " ciudad ",
    "pais": " pais ",
    "vectorCompeticiones": " vectorCompeticiones ",
    "talla": " talla ",
    "numMedallasOlimpicas": " numMedallasOlimpicas ",
    "posicion": " posicion "
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}

/**
 * Función principal para responder al evento de elegir la opción "Listar nombres personas"
 */
Plantilla.procesarListarNombres = async function () {
    this.recupera(this.imprime);
}


Plantilla.imprime = function (vector) {
    
    let mensaje = "";
    mensaje += Plantilla.cabeceraTablaNombres();
    vector.forEach(e => mensaje+= Plantilla.cuerpoListarPersonas(e))
    mensaje += Plantilla.pieTabla();

    Frontend.Article.actualizar("Listado de personas", mensaje);
    return mensaje;
}

Plantilla.cabeceraTablaNombres = function () {
    return `<table class="listado-proyectos"><thead><th>ID</th><th>Nombre</th></thead><tbody>`;
}

Plantilla.cuerpoListarPersonas = function (p) {
    const d = p.data
    return `<tr title="${p.ref['@ref'].ID}"><td>${p.ref['@ref'].id}</td><td>${d.nombre}</td></tr>`;
}

Plantilla.pieTabla = function () {
    return "</tbody></table>";
}


Plantilla.recupera = async function (callBackFn) {

    let respuesta = null
    try{
        const url = Frontend.API_GATEWAY + "/plantilla/listarnPersonas"
        respuesta = await fetch(url)
    }catch (error){
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }

    let vectorPersonas = null
    if(respuesta){
        vectorPersonas = await respuesta.json()
        callBackFn(vectorPersonas.data)
    }
}

// Tercera historia de usuario

Plantilla.procesarListarNombresOrdenados = async function () {
    this.recupera(this.imprimexNombre);
}



Plantilla.ordenarPorNombre = function (vector) {
    vector.sort(function(a, b){
        var nombreA = a.data.nombre.toUpperCase(); // convierte los nombres a mayúsculas para ordenar correctamente
        var nombreB = b.data.nombre.toUpperCase();
        if (nombreA < nombreB) {
            return -1;
        }
        if (nombreA > nombreB) {
            return 1;
        }
        return 0;
    });
}

Plantilla.imprimexNombre = function (vector) {
    Plantilla.ordenarPorNombre(vector); // ordena el vector por nombre
    let mensaje = "";
    mensaje += Plantilla.cabeceraTablaNombres();
    vector.forEach(e => mensaje+= Plantilla.cuerpoListarPersonas(e))
    mensaje += Plantilla.pieTabla();

    Frontend.Article.actualizar("Listado de personas ordenado por nombre", mensaje);
}

// Cuarta historia de usuario
Plantilla.procesarListarTodos = async function () {
    this.recupera(this.imprimeTodos);
}

Plantilla.imprimeTodos = function (vector) {
    let mensaje = "";
    mensaje += Plantilla.cabeceraTablaTodos();
    vector.forEach(e => mensaje += Plantilla.cuerpoListarTodos(e))
    mensaje += Plantilla.pieTabla();

    Frontend.Article.actualizar("Listado de personas", mensaje);
}

Plantilla.cabeceraTablaTodos = function () {
    return `<table class="listado-proyectos"><thead><th>ID</th><th>Nombre</th><th>Apellidos</th><th>Día</th><th>Mes</th><th>Año</th><th>Ciudad</th><th>País</th><th>VECTORCOMPETICIONES</th><th>Talla</th><th>NUMMEDALLASOLIMPICAS</th><th>Posicion</th></thead><tbody>`;
  }

  Plantilla.cuerpoListarTodos = function (p) {
    const d = p.data
    return `<tr title="${p.ref['@ref'].ID}"><td>${p.ref['@ref'].id}</td><td>${d.nombre}</td><td>${d.apellidos}</td><td>${d.nacimiento.dia}</td><td>${d.nacimiento.mes}</td><td>${d.nacimiento.Año}</td><td>${d.direccion.ciudad}</td><td>${d.direccion.pais}</td><td>${d.vectorCompeticiones}</td><td>${d.talla}</td><td>${d.numMedallasOlimpicas}</td><td>${d.posicion}</td></tr>`;
}


//Quinta historia de usuario

Plantilla.cambiarOrden = async function (){
    this.recupera(this.ordenarBoton)
 }

Plantilla.ordenarCampo = function(tipo, vDatos){
    if(tipo==0){
        vDatos.sort(function(a, b){
            let id1 = a.ref['@ref'].id
            let id2 = b.ref['@ref'].id
            if (id1 < id2) {
                return -1;
            }
            if (id1 > id2) {
                return 1;
            }
            return 0;
        });
    }
    if(tipo==1){
        vDatos.sort(function(a, b){
            let nombre1 = a.data.nombre.toUpperCase();
            let nombre2 = b.data.nombre.toUpperCase();
            if (nombre1 < nombre2) {
                return -1;
            }
            if (nombre1 > nombre2) {
                return 1;
            }
            return 0;
        });
    }
    if(tipo==2){
        vDatos.sort(function(a, b){
            let apellido1 = a.data.apellidos.toUpperCase();
            let apellido2 = b.data.apellidos.toUpperCase();
            if (apellido1 < apellido2) {
                return -1;
            }
            if (apellido1 > apellido2) {
                return 1;
            }
            return 0;
        });
    }
    if(tipo==3){
        vDatos.sort(function(a, b){
            let altura1 = a.data.talla;
            let altura2 = b.data.talla;
            if (altura1 < altura2) {
                return -1;
            }
            if (altura1 > altura2) {
                return 1;
            }
            return 0;
        });
    }
    if(tipo==4){
        vDatos.sort(function(a, b){
            let pConseguidos1 = a.data.numMedallasOlimpicas;
            let pConseguidos2 = b.data.numMedallasOlimpicas;
            if (pConseguidos1 < pConseguidos2) {
                return -1;
            }
            if (pConseguidos1 > pConseguidos2) {
                return 1;
            }
            return 0;
        });
    }
    Plantilla.ordenarBoton(vDatos, tipo);
}
 
Plantilla.ordenarBoton = function(vector){
    let mensaje = "";
    vDatos = vector;
    mensaje += `<div class="contenedor"><button class="miBoton" onclick="Plantilla.ordenarCampo(0, vDatos)">Ordenar por ID</button></div><br></br>`;
    mensaje += `<div class="contenedor"><button class="miBoton" onclick="Plantilla.ordenarCampo(1, vDatos)">Ordenar por Nombre</button></div><br></br>`;
    mensaje += `<div class="contenedor"><button class="miBoton" onclick="Plantilla.ordenarCampo(2, vDatos)">Ordenar por Apellidos</button></div><br></br>`;
    mensaje += `<div class="contenedor"><button class="miBoton" onclick="Plantilla.ordenarCampo(3, vDatos)">Ordenar por Altura</button></div><br></br>`;
    mensaje += `<div class="contenedor"><button class="miBoton" onclick="Plantilla.ordenarCampo(4, vDatos)">Ordenar por Número de medallas olímpicas</button></div><br></br>`;
    mensaje += Plantilla.cabeceraTablaTodos();
    vector.forEach(e => mensaje+= Plantilla.cuerpoListarTodos(e));
    mensaje += Plantilla.pieTabla();
    Frontend.Article.actualizar("Listado de personas con diferente orden", mensaje);
    return mensaje;
}

// Sexta historia de usuario

Plantilla.muestroPersona = async function(id) {
    this.recupera(function(vector) {
      let persona = vector.find(e => e.ref['@ref'].id == id);
      if (persona) {
        Plantilla.mostrarPersona(persona, id);
      }
    });
  }

Plantilla.mostrarPersona = function (persona, idPos) {
    const d = persona.data;
    let mensaje = "";
    mensaje += Plantilla.cabeceraTablaTodos();
    mensaje += `<tr title="${persona.ref['@ref'].ID}"><td>${idPos}</td><td>${d.nombre}</td><td>${d.apellidos}</td><td>${d.nacimiento.dia}</td><td>${d.nacimiento.mes}</td><td>${d.nacimiento.Año}</td><td>${d.direccion.ciudad}</td><td>${d.direccion.pais}</td><td>${d.vectorCompeticiones}</td><td>${d.talla}</td><td>${d.numMedallasOlimpicas}</td><td>${d.posicion}</td></tr>`;
    mensaje += Plantilla.pieTabla();
    Frontend.Article.actualizar("Detalles de persona", mensaje);
    return mensaje;
  }
