import { error, redirect  } from '@sveltejs/kit';
import { validateData } from '$lib/utils';
import { updatePasswordSchema } from '$lib/schemas'; 

export const actions = {
	updatePassword: async ({ request, locals }) => {
		const {formData, errors } = await validateData(await request.formData(), updatePasswordSchema);

if (errors) {
	return {
		data: formData,
		errors: errors.fieldErrors
	}
}

		try {
			await locals.pb.collection('users').update(locals.user.id, formData);
			locals.pb.authStore.clear();
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/login');
	}
};