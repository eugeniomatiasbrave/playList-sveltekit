import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

// Redirige a la página de inicio si el usuario no es válido.
// uso el objeto (locals) locals.pb.authStore.isValid para verificar si el usuario es válido o no.
// O sea cualquier cosa dentro de configuracion (settings) debe estar autorizado con el usuario por +layout.server.js nuevamente. Ya que se carga 
// solo una vez la del inicio, luego para settings debo hacerlo nuevamente.