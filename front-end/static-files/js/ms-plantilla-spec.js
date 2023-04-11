/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}

let personaPrueba = {
    id : "idprueba",
    nombre : "nombrePrueba"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})


describe("Pie table ", function () {
    it("debería devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(Plantilla.pieTabla()).toBe("</tbody></table>");
        });
});

describe("Cabecera table ", function () {
    it("debería devolver las etiquetas HTML para la cabecera de tabla",
        function () {
            expect(Plantilla.cabeceraTablaNombres()).toBe(`<table class="listado-proyectos"><thead><th>ID</th><th>Nombre</th></thead><tbody>`);
        });
});

describe('Plantilla.cuerpoListarPersonas', () => {
    it('Debería de volver datos de una persona creada por defecto', () => {
      // Arrange
      const p = {
        data: {
          nombre: 'Juan',
        },
        ref: {
          '@ref': {
            ID: 'person-1',
            id: '123',
          },
        },
      };
      const expectedOutput = '<tr title="person-1"><td>123</td><td>Juan</td></tr>';
      const actualOutput = Plantilla.cuerpoListarPersonas(p);
      expect(actualOutput).toEqual(expectedOutput);
    });
  });

  describe("Plantilla.imprime", function(){
    it("Deberia trabajar correctamente con vectores vacios", function(){
        const vector = [];
        const mensajeEsperado = Plantilla.cabeceraTablaNombres() + Plantilla.pieTabla();
        const mensaje = Plantilla.imprime(vector);
        expect(mensaje).toBe(mensajeEsperado); 
    });
});

  describe("Plantilla.imprime", function() {
    let vector;
    beforeEach(function() {
      vector = [
        {
          ref: {
            "@ref": {
              id: "123"
            }
          },
          data: {
            nombre: "Juan"
          }
        },
        {
          ref: {
            "@ref": {
              id: "456"
            }
          },
          data: {
            nombre: "Ana"
          }
        },
        {
          ref: {
            "@ref": {
              id: "789"
            }
          },
          data: {
            nombre: "Carlos"
          }
        }
      ];
    });
  
    it("debe devolver una cadena que contenga marcado de tabla HTML", function() {
      const result = Plantilla.imprime(vector);
      expect(typeof result).toBe("string");
      expect(result).toContain("<table");
      expect(result).toContain("<thead");
      expect(result).toContain("<tbody");
      expect(result).toContain("</table>");
    });
  });

  describe('ordenarPorNombre', () => {
    it('Debe ordenar un vector vacío', () => {
      const vector = [];
      Plantilla.ordenarPorNombre(vector);
      expect(vector).toEqual([]);
    });
  
    it('Debe ordenar un vector con un solo elemento', () => {
      const vector = [{ data: { nombre: 'Juan' } }];
      Plantilla.ordenarPorNombre(vector);
      expect(vector).toEqual([{ data: { nombre: 'Juan' } }]);
    });
  
    it('Debe ordenar un vector con varios elementos', () => {
      const vector = [
        { data: { nombre: 'Luis' } },
        { data: { nombre: 'Ana' } },
        { data: { nombre: 'Juan' } },
      ];
      Plantilla.ordenarPorNombre(vector);
      expect(vector).toEqual([
        { data: { nombre: 'Ana' } },
        { data: { nombre: 'Juan' } },
        { data: { nombre: 'Luis' } },
      ]);
    });
  
    it('Debe ordenar correctamente nombres con mayúsculas y minúsculas', () => {
      const vector = [
        { data: { nombre: 'ana' } },
        { data: { nombre: 'Juan' } },
        { data: { nombre: 'Luis' } },
        { data: { nombre: 'carlos' } },
      ];
      Plantilla.ordenarPorNombre(vector);
      expect(vector).toEqual([
        { data: { nombre: 'ana' } },
        { data: { nombre: 'carlos' } },
        { data: { nombre: 'Juan' } },
        { data: { nombre: 'Luis' } },
      ]);
    });
  });

  describe("Plantilla.imprimexNombre", function() {
    let vector;
  
    beforeEach(function() {
      vector = [      {        ref: {          "@ref": {            id: "123"          }        },        data: {          nombre: "Juan"        }      },      {        ref: {          "@ref": {            id: "456"          }        },        data: {          nombre: "Ana"        }      },      {        ref: {          "@ref": {            id: "789"          }        },        data: {          nombre: "Carlos"        }      }    ];
    });
  
    it("debería ordenar el vector por nombre", function() {
      Plantilla.imprimexNombre(vector);
  
      let nombresOrdenados = vector.map(e => e.data.nombre);
      let nombresEsperados = ["Ana", "Carlos", "Juan"];
      expect(nombresOrdenados).toEqual(nombresEsperados);
    });
  });

  describe("Cabecera table personas ", function () {
    it("debería devolver las etiquetas HTML para la cabecera de tabla",
        function () {
            expect(Plantilla.cabeceraTablaTodos()).toBe(`<table class="listado-proyectos"><thead><th>ID</th><th>Nombre</th><th>Apellidos</th><th>Día</th><th>Mes</th><th>Año</th><th>Ciudad</th><th>País</th><th>VECTORCOMPETICIONES</th><th>Talla</th><th>NUMMEDALLASOLIMPICAS</th><th>Posicion</th></thead><tbody>`);
        });
});

describe('Plantilla.cuerpoListarTodos', () => {
    it('Debería de devolver datos de una persona creada por defecto', () => {
      // Arrange
      const p = {
        data: {
          nombre: 'Juan',
          apellidos: 'Pérez',
          nacimiento: { dia: '2', mes: '3', Año: '1990' },
          direccion: { ciudad: 'Madrid', pais: 'España' },
          vectorCompeticiones: '2016,2022',
          talla: '180',
          numMedallasOlimpicas: '3',
          posicion: 'Rematador',
        },
        ref: {
          '@ref': {
            ID: 'person-1',
            id: '123',
          },
        },
      };
      const expectedOutput = '<tr title="person-1"><td>123</td><td>Juan</td><td>Pérez</td><td>2</td><td>3</td><td>1990</td><td>Madrid</td><td>España</td><td>2016,2022</td><td>180</td><td>3</td><td>Rematador</td></tr>';
      const actualOutput = Plantilla.cuerpoListarTodos(p);
      expect(actualOutput).toEqual(expectedOutput);
    });
  });

  describe("Plantilla", function() {
    describe("imprimeTodos", function() {
      
      beforeEach(function() {
        spyOn(Frontend.Article, "actualizar");
      });
      
      it("debería llamar a Frontend.Article.actualizar con los argumentos correctos", function() {
        const vector = [{ ref: { "@ref": { ID: "1", id: "123" } }, data: { nombre: "John", apellidos: "Doe", nacimiento: { dia: 1, mes: 1, Año: 2000 }, direccion: { ciudad: "Madrid", pais: "España" }, vectorCompeticiones: ["comp1", "comp2"], talla: "M", numMedallasOlimpicas: 2, posicion: 1 } }];
        const expectedMensaje = '<table class="listado-proyectos"><thead><th>ID</th><th>Nombre</th><th>Apellidos</th><th>Día</th><th>Mes</th><th>Año</th><th>Ciudad</th><th>País</th><th>VECTORCOMPETICIONES</th><th>Talla</th><th>NUMMEDALLASOLIMPICAS</th><th>Posicion</th></thead><tbody><tr title="1"><td>123</td><td>John</td><td>Doe</td><td>1</td><td>1</td><td>2000</td><td>Madrid</td><td>España</td><td>comp1,comp2</td><td>M</td><td>2</td><td>1</td></tr></tbody></table>';
        
        Plantilla.imprimeTodos(vector);
        
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Listado de personas", expectedMensaje);
      });
      
    });
  });

  describe("Plantilla.nuevoOrden", function() {
    const personas = [
      {
        ref: { "@ref": { ID: "1", id: "123" } },
        data: {
          nombre: "John",
          apellidos: "Doe",
          nacimiento: { dia: 1, mes: 1, Año: 2000 },
          direccion: { ciudad: "Madrid", pais: "España" },
          vectorCompeticiones: ["comp1", "comp2"],
          talla: 190,
          numMedallasOlimpicas: 2,
          posicion: 1
        }
      },
      {
        ref: { "@ref": { ID: "2", id: "456" } },
        data: {
          nombre: "Jane",
          apellidos: "Ordo",
          nacimiento: { dia: 2, mes: 2, Año: 2001 },
          direccion: { ciudad: "Barcelona", pais: "España" },
          vectorCompeticiones: ["comp3", "comp4"],
          talla: 180,
          numMedallasOlimpicas: 4,
          posicion: 2
        }
      }
    ];
  
    it("ordena por ID si tipo es 0", function() {
      const vDatos = personas.slice(); // Copia del vector original
      Plantilla.ordenarCampo(0, vDatos);
      expect(vDatos[0].ref["@ref"].id).toEqual("123");
    });
  
    it("ordena por nombre si tipo es 1", function() {
      const vDatos = personas.slice(); // Copia del vector original
      Plantilla.ordenarCampo(1, vDatos);
      expect(vDatos[0].data.nombre).toEqual("Jane");
    });
  
    it("ordena por apellidos si tipo es 2", function() {
      const vDatos = personas.slice(); // Copia del vector original
      Plantilla.ordenarCampo(2, vDatos);
      expect(vDatos[0].data.apellidos).toEqual("Doe");
    });
  
    it("ordena por talla si tipo es 3", function() {
      const vDatos = personas.slice(); // Copia del vector original
      Plantilla.ordenarCampo(3, vDatos);
      expect(vDatos[0].data.talla).toEqual(180);
    });
  
    it("ordena por número de medallas si tipo es 4", function() {
      const vDatos = personas.slice(); // Copia del vector original
      Plantilla.ordenarCampo(4, vDatos);
      expect(vDatos[0].data.numMedallasOlimpicas).toEqual(2);
    });
  });

describe("Plantilla.imprimeConBoton", function() {
    let vector;

  beforeEach(function() {
    vector = [
      { ref: { "@ref": { ID: "1", id: "123" } }, data: { nombre: "John", apellidos: "Doe", nacimiento: { dia: 1, mes: 1, Año: 2000 }, direccion: { ciudad: "Madrid", pais: "España" }, vectorCompeticiones: ["comp1", "comp2"], talla: "M", numMedallasOlimpicas: 2, posicion: 1 } },
      { ref: { "@ref": { ID: "2", id: "456" } }, data: { nombre: "Jane", apellidos: "Doe", nacimiento: { dia: 2, mes: 2, Año: 2000 }, direccion: { ciudad: "Barcelona", pais: "España" }, vectorCompeticiones: ["comp1", "comp2"], talla: "M", numMedallasOlimpicas: 0, posicion: 2 } }
    ];
  });

  it("genera un botón para ordenar por ID", function() {
    let result = Plantilla.ordenarBoton(vector);
    expect(result).toContain('<div class="contenedor"><button class="miBoton" onclick="Plantilla.ordenarCampo(0, vDatos)">Ordenar por ID</button></div><br></br>');
  });

  it("genera un botón para ordenar por Nombre", function() {
    let result = Plantilla.ordenarBoton(vector);
    expect(result).toContain('<div class="contenedor"><button class="miBoton" onclick="Plantilla.ordenarCampo(1, vDatos)">Ordenar por Nombre</button></div><br></br>');
  });

  it("genera un botón para ordenar por Apellidos", function() {
    let result = Plantilla.ordenarBoton(vector);
    expect(result).toContain('<div class="contenedor"><button class="miBoton" onclick="Plantilla.ordenarCampo(2, vDatos)">Ordenar por Apellidos</button></div><br></br>');
  });

  it("genera un botón para ordenar por Altura", function() {
    let result = Plantilla.ordenarBoton(vector);
    expect(result).toContain('<div class="contenedor"><button class="miBoton" onclick="Plantilla.ordenarCampo(3, vDatos)">Ordenar por Altura</button></div><br></br>');
  });

  it("deberia devolver un string con código HTML", function() {
    const result = Plantilla.ordenarBoton(vector);
    expect(typeof result).toEqual("string");
  });
});

describe("Plantilla.mostrarPersona", function() {
  let persona = {
    data: {
      nombre: "John",
      apellidos: "Doe",
      nacimiento: {
        dia: 1,
        mes: 1,
        Año: 1990
      },
      direccion: {
        ciudad: "Barcelona",
        pais: "España"
      },
      vectorCompeticiones: "2016,2022",
      talla: "180",
      numMedallasOlimpicas: 2,
      posicion: "Armador"
    },
    ref: { "@ref": { id: "123456" } }
  };
  
  let idPos = 1;
  
  beforeEach(function() {
    spyOn(Plantilla, "cabeceraTablaTodos").and.returnValue("<thead></thead>");
    spyOn(Plantilla, "pieTabla").and.returnValue("</table>");
    spyOn(Frontend.Article, "actualizar");
  });
  
  it("debería llamar a Plantilla.cabeceraTablaTodos, Plantilla.pieTabla y Frontend.Article.actualizar", function() {
    Plantilla.mostrarPersona(persona, idPos);
    expect(Plantilla.cabeceraTablaTodos).toHaveBeenCalled();
    expect(Plantilla.pieTabla).toHaveBeenCalled();
    expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Detalles de persona", jasmine.any(String));
  });
  
  it("debería devolver una tabla con los detalles de la persona", function() {
    let resultado = Plantilla.mostrarPersona(persona, idPos);
    expect(resultado).toContain("<td>1</td>");
    expect(resultado).toContain("<td>John</td>");
    expect(resultado).toContain("<td>Doe</td>");
    expect(resultado).toContain("<td>1</td>");
    expect(resultado).toContain("<td>1</td>");
    expect(resultado).toContain("<td>1990</td>");
    expect(resultado).toContain("<td>Barcelona</td>");
    expect(resultado).toContain("<td>España</td>");
    expect(resultado).toContain("<td>2016,2022</td>");
    expect(resultado).toContain("<td>180</td>");
    expect(resultado).toContain("<td>2</td>");
    expect(resultado).toContain("<td>Armador</td>");
  });
  
  it("debería incluir el ID de la persona en el atributo 'ID' de la fila", function() {
    let resultado = Plantilla.mostrarPersona(persona, idPos);
    expect(resultado).toContain(`<td>1</td>`);
  });

});

  



  
/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
