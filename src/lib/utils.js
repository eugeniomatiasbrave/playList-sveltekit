const { randomBytes } = await import('node:crypto');
//import { randomBytes } from 'node:crypto'; // 3
//const crypto = require('crypto');
//import crypto from 'crypto'; // modulo nativo de node.js

export const serializeNonPOJOs = (obj) => { // 1
	return structuredClone(obj); // 2
};

// 1. La función serializeNonPOJOs toma un objeto como entrada y 
// 2. devuelve una copia profunda de ese objeto. 
// La función devuelve el resultado de la función structuredClone(obj). structuredClone es una función que realiza una copia profunda de un objeto, 
// lo que significa que crea una copia de un objeto y de todos los objetos a los que se hace referencia. Esto es útil cuando quieres trabajar con 
// una copia de los datos sin modificar los datos originales.

// 3. randomBytes es para generar bytes aleatorios, que es una funcionalidad proporcionada por el módulo crypto de Node.js.

// structuredClone() es un metodo que hace lo mismo que  json.parse() y json.stringify()
// serializeNonPOJOs(): podría ser un método personalizado en una biblioteca
// o marco específico que se utiliza para serializar objetos que no son POJOs.
// serialización: es el proceso de convertir el estado de un objeto en una secuencia de bytes para almacenar
// el objeto en la memoria, un archivo o una base de datos, o transmitirlo a través de una red. Deserializar un objeto 
// significa convertir la secuencia de bytes almacenada de vuelta en un objeto.


export const generateUsername = (name) => { // 4
	const id = randomBytes(2).toString('hex');  // 5 
	return `${name.slice(0, 5)}${id}`; // 6
};

// genero un nombre aleatorio para que el usario luego pueda cambiarlo mas tarde porque pocket genera uno pero muy largo..

// 4. se define una función llamada generateUsername, que toma un argumento "name".
// 5. se genera un identificador único "id" utilizando la función randomBytes(2), que genera una secuencia de bytes aleatorios de longitud 2. Luego, esta secuencia de bytes se convierte en una cadena de texto hexadecimal con .toString('hex').
// 6. Finalmente, la función devuelve un nombre de usuario generado que consiste en los primeros 5 caracteres del argumento name y el identificador único id generado anteriormente. La sintaxis ${} se utiliza para insertar variables dentro de cadenas de texto en JavaScript.


export const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
	return `http://localhost:8090/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};
// 


export const validateData = async (formData, schema) => {
	const body = Object.fromEntries(formData);

	try {
		const data = schema.parse(body);
		return {
			formData: data,
			errors: null
		}

	} catch (err) {
		console.log('Error: ', err);
		const errors = err.flatten(); 
		return {
			formData: body,
			errors
		};
	}
};

// El método .flatten() en la biblioteca Zod se utiliza para manejar errores de validación. 
//Transformación de errores: .flatten() transforma los errores de validación en un formato más manejable1. Esto puede ser particularmente 
//útil al integrar Zod con la validación de formularios, ya que te permite devolver cualquier contexto específico de ZodIssue que puedas necesitar