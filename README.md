# Edrans hiring Challenge

## Objetivo:
 Desarrollar una API REST que modele las acciones necesarias para mantener un registro de alumnos y materias de una
 facultad.

El modelo debe incluir:

    Alumnos (nombre, fecha de nacimiento, domicilio). 
    Materias (nombre, carga horaria).
    Carreras (nombre, título otorgado).

Las relaciones posibles son las habituales:
 
Una Materia puede pertenecer a una o más Carreras. 
Un Alumno se inscribe en una carrera y luego se anota en una o más Materias que correspondan a su carrera.
Al terminar de cursar cada materia se actualiza el estado de cursado y la nota obtenida.

Marco de trabajo:

El proyecto debe ejecutarse en docker.
El desarrollo tiene que estar hecho en NodeJS y usar MongoDB para persistir los datos.
La idea es que crees un proyecto en GitHub (apreciamos que vayas commiteando a medida que avanzas en la construcción del
proyecto). Que incluyas documentación de como ejecutar y consumir la API.
En la medida de lo posible incluir los Test
Y una colección de postman mejor.

## Consideraciones

Se comenzó el challenge basándome en un template pre-existente (de mi autoría) con un servidor de Node, basado en Koa y
con Babel para poder usar los syntax sugars que considere prácticos(import/export, spread operator, etc.)

Dado que el como se generan las carreras/materias esta fuera del scope del challenge los mismos se podrán generar a
partir de endpoint sin autenticación (nótese que eso bajo ningún punto de vista debería llegar a un entorno de 
producción). Los mismos deberían requerir un autorizationToken de un manager o algo similar para validar que quien esta 
creando las materias/carreras tiene permisos para hacerlo. 

En vista de las simplificaciones que se toman por los constraints de ser un code challenge, se optó por que un alumno
tuviera el listado de materias a las que cursa, en un modelo de datos mas complejo, la materia tendría cursos y el
alumno sería parte de estos.

Teniendo en cuenta que no estan relevadas las entidades fuera del alumno (managers, profesores, etc.) el alumno podrá
darse de alta e informar el estado de aprobación de las materias que curse.

## How to use
El caso de uso para este challenge es el siguiente, primero se deben generar un grupo de materias.
Luego con esta 1 o mas carreras.
Y por ultimo 1 o mas usuarios.

En este punto cada usuario puede anotarse en la carrera que desee, despues de haberse anotado en una de las carreras
puede anotarse en las asignaturas de la carrera que desee cursar.

y por ultimo cada usuario puede informar las notas obtenidas en cada materia.

##Datos a tener en cuenta para probar el funcionamiento
En el root del proyecto hay un archivo JSON que contiene la colección de postman utilizada para probar el servidor.

El Dockerfile genera 2 imagenes (una builder image, y el server en si) se debe utilizar esta última.

en `/config/local.yml` se debe cargar el connectionString para la base de datos que se quiera utilizar, (se puede
generar un archivo nuevo y correr el servidor con el process.Env = al nombre del archivo).
