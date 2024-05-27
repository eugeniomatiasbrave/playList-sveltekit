<script>
	import { Icon , Play } from 'svelte-hero-icons';
	import { enhance } from '$app/forms';
	import { Modal } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	import toast from 'svelte-french-toast'
	export let project;

	let modalOpen;
	
	let loading= false
	
	const submitDeleteProject = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Video eliminado correctamente');
					await update();
					break;
					case 'error':
						toast.error('No se pudo eliminar el video');
						break;
						default:
							await update();
						}
						loading = false;
					};	
				};
				
$: modalOpen = false;

</script>

<div class="w-full h-28 flex items-center justify-between">
	<div class="avatar">
		<div class="w-20 rounded">
			<img
				src={project?.thumbnail
					? getImageURL(project.collectionId, project.id, project.thumbnail, '80x80')
					: `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${project.name}`}
				alt="project thumbnail"
			/>
		</div>
	</div>
	<div class="flex flex-col w-full ml-4 h-full justify-center">
		<a href="/projects/{project.id}" class="font-semibold text-lg">{project.name}</a>
		<p>{project.tagline}</p>
		<label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
			<a href={project.url} >
			<label for="avatar" class="absolute -bottom-0.5 -right-0.5 hover:cursor-pointer">
				<span class="btn btn-circle btn-sm btn-accent">
					<Icon src={Play} class="w-4 h-4" />
				</span>
			</label>
			Ver video</a>
		</div>
	<div class="flex items-center justify-end w-full">
		<a href="/projects/{project.id}/edit" class="btn btn-outline">Editar video</a>
		<Modal label={project.id} checked={modalOpen}>
			<span slot="trigger" class="btn btn-secondary ml-2">Eliminar</span>
			<div slot="heading">
				<h3 class="text-2xl">Eliminar {project.name}</h3>
				<p class="text-base font-normal mt-2">
					¿Estás seguro de que deseas eliminar este video? Una vez eliminado, el video no se puede
                     restaurado.			
				</p>
			</div>
			<div slot="actions" class="flex w-full items-center justify-center space-x-2">
				<label for={project.id} class="btn btn-outline">Cancelar</label>
				<form action="?/deleteProject" method="POST" use:enhance={submitDeleteProject}>
					<input type="hidden" name="id" value={project.id} />
					<button type="submit" class="btn btn-secondary" disabled={loading}>Eliminar</button>
				</form>
			</div>
		</Modal>
	</div>
</div>