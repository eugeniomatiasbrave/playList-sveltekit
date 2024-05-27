import { error, redirect } from '@sveltejs/kit';
import { validateData } from '$lib/utils';
import { createProjectSchema } from '$lib/schemas';
import { serialize } from 'object-to-formdata';


export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions = {
	create: async ({ request, locals }) => {
		const body = await request.formData();

		const thumb = body.get('thumbnail');

		if (thumb.size === 0) {
			body.delete('thumbnail');
		}

		body.append('user', locals.user.id);

        const { formData , errors} = await validateData( body , createProjectSchema);
        const {thumbnail, ...rest} = formData;
        // instalacion de la libreria object-to-formdata (en -D) 
        if (errors) {
		return {
			data: rest,
			errors: errors.fieldErrors
		    }
	      }
		

		try {
			await locals.pb.collection('projects').create(serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/my/projects');
	}
};