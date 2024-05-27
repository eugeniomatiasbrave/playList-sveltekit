
export const load = ({ locals }) => {

	if (locals.user) {
		return {
			user: locals.user
		}
	}

	return {
		user: undefined
	}

}


// export const load = ({ locals }) => { ... } - Esto define y exporta una función llamada load que toma un objeto con una propiedad locals.
// if (locals.user) { return { user: locals.user } } - Si locals.user existe (es decir, no es null, undefined, false, 0, NaN, o una cadena vacía), entonces la función devuelve un objeto con la propiedad user establecida en locals.user.
// return { user: undefined } - Si locals.user no existe, entonces la función devuelve un objeto con la propiedad user establecida en undefined.