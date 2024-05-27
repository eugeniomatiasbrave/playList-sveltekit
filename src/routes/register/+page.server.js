import { error,  redirect } from '@sveltejs/kit';
import { generateUsername , validateData } from '$lib/utils';
import { registerUserSchema } from '$lib/schemas';

export const actions = {
	register: async ({ locals, request }) => {

		const {formData, errors} = await validateData(await request.formData(), registerUserSchema);

		if (errors) {
			return  {
				data: formData,
				errors: errors.fieldErrors
			};
		}

		const username = generateUsername(formData.name.split(' ').join('')).toLowerCase();

		try {
			await locals.pb.collection('users').create({ username, ...formData })
			await locals.pb.collection('users').requestVerification(formData.email)

		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Algo salió mal en el Registro');
		}	
		
		throw redirect(303, '/login')
	}
};