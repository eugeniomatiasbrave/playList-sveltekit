import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	} else {
		throw redirect(303, '/my/settings/profile');
	}
};


// Aqui lo que hace es que todo aquel autorizado que va a settings va a ser redirigido al profile.