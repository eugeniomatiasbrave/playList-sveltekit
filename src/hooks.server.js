import PocketBase from 'pocketbase';
import { serializeNonPOJOs } from '$lib/utils';
export const handle = async ({ event, resolve }) => {

	event.locals.pb = new PocketBase('http://localhost:8090')
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
		}
	} catch (_) { // el guion bajo (_) indica que no se necesita una variable de error.
		event.locals.pb.authStore.clear();
		event.locals.user = undefined;
	}

	const response = await resolve(event);

	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

	return response;

};



// .authStore : se utiliza generalmente en el contexto de la autenticación de usuarios. Es un objeto que almacena información sobre el estado de autenticación del usuario.
// .isValid : verifica si la autenticación es válida.
// authStore.model.id : obtiene el ID del modelo autenticado.
// .exportToCookie() : si tienes un objeto de estado de la aplicación que quieres persistir entre las visitas del usuario al sitio, podrías usarlo 


// import PocketBase from 'pocketbase'; - Esto importa una clase o función llamada PocketBase desde un módulo llamado 'pocketbase'.
// import { serializeNonPOJOs } from '$/lib/utils'; - Esto importa una función llamada serializeNonPOJOs desde un módulo en la ruta $/lib/utils.
// event.locals.pb = new PocketBase('http://localhost:8090'); - Esto crea una nueva instancia de PocketBase, posiblemente una base de datos o un cliente de API, y la almacena en event.locals.pb.
// event.locals.authStore.loadFromCookie(event.request.headers.get('cookie') || ''); - Esto intenta cargar información de autenticación desde una cookie en la cabecera de la solicitud HTTP.
// if (event.locals.pb.authStore.isValid){ event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model); } else { event.locals.user = undefined; } - Esto verifica si la información de autenticación es válida. Si es así, serializa el modelo de autenticación y lo almacena en event.locals.user. Si no es válido, establece event.locals.user en undefined.
// const response = await resolve(event); - Esto llama a la función resolve con el evento como argumento, espera su resultado y lo almacena en response.
// response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({secure: false})); - Esto establece una cookie en la cabecera de la respuesta HTTP con la información de autenticación exportada.
// return response; - Finalmente, devuelve la respuesta HTTP.