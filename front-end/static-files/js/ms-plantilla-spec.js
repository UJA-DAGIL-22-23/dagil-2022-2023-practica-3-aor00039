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
      
      it("should call Frontend.Article.actualizar with correct arguments", function() {
        const vector = [{ ref: { "@ref": { ID: "1", id: "123" } }, data: { nombre: "John", apellidos: "Doe", nacimiento: { dia: 1, mes: 1, Año: 2000 }, direccion: { ciudad: "Madrid", pais: "España" }, vectorCompeticiones: ["comp1", "comp2"], talla: "M", numMedallasOlimpicas: 2, posicion: 1 } }];
        const expectedMensaje = '<table class="listado-proyectos"><thead><th>ID</th><th>Nombre</th><th>Apellidos</th><th>Día</th><th>Mes</th><th>Año</th><th>Ciudad</th><th>País</th><th>VECTORCOMPETICIONES</th><th>Talla</th><th>NUMMEDALLASOLIMPICAS</th><th>Posicion</th></thead><tbody><tr title="1"><td>123</td><td>John</td><td>Doe</td><td>1</td><td>1</td><td>2000</td><td>Madrid</td><td>España</td><td>comp1,comp2</td><td>M</td><td>2</td><td>1</td></tr></tbody></table>';
        
        Plantilla.imprimeTodos(vector);
        
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Listado de personas", expectedMensaje);
      });
      
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
