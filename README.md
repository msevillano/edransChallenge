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
