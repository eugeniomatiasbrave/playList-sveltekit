import { error } from "@sveltejs/kit";
import { serializeNonPOJOs } from "$lib/utils";

export const load = async ({ locals }) => {

	const getProjects = async () => {
		try {
			const projects = serializeNonPOJOs(await locals.pb.collection('projects').getFullList(undefined));
			return projects;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	const projects = await getProjects();

	return {
			projects
	};
};